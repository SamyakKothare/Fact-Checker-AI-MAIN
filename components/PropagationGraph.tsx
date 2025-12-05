import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { GraphNode, GraphLink } from '../types';

interface PropagationGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

const PropagationGraph: React.FC<PropagationGraphProps> = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || nodes.length === 0) return;

    const width = containerRef.current.clientWidth;
    const height = 500;
    const nodeWidth = 180;
    const nodeHeight = 60;
    const layerSpacing = 150;

    // Clear previous render
    d3.select(svgRef.current).selectAll("*").remove();

    // Setup Zoom
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("background", "#0a0b10");

    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // --- Layout Logic ---
    // Simple layering algorithm since we want explicit waves
    // 1. Identify Roots (in-degree 0)
    // 2. BFS to assign levels
    const adjacency: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    nodes.forEach(n => {
      adjacency[n.id] = [];
      inDegree[n.id] = 0;
    });

    links.forEach(l => {
        if(adjacency[l.source]) adjacency[l.source].push(l.target);
        if(inDegree[l.target] !== undefined) inDegree[l.target]++;
    });

    const levels: Record<string, number> = {};
    const queue: {id: string, depth: number}[] = [];
    
    // Initialize queue with roots or nodes with no incoming links
    nodes.forEach(n => {
        if (inDegree[n.id] === 0) {
            queue.push({ id: n.id, depth: 0 });
            levels[n.id] = 0;
        }
    });

    // If cycle or no roots, pick first node
    if (queue.length === 0 && nodes.length > 0) {
        queue.push({ id: nodes[0].id, depth: 0 });
        levels[nodes[0].id] = 0;
    }

    while(queue.length > 0) {
        const {id, depth} = queue.shift()!;
        if (adjacency[id]) {
            adjacency[id].forEach(target => {
                // If not visited or we found a longer path (standard for layering often uses longest path, 
                // but simple BFS is safest to avoid infinite loops in cycles if we track visited)
                if (levels[target] === undefined) {
                    levels[target] = depth + 1;
                    queue.push({ id: target, depth: depth + 1 });
                }
            });
        }
    }

    // Group by level
    const nodesByLevel: GraphNode[][] = [];
    nodes.forEach(n => {
        const lvl = levels[n.id] !== undefined ? levels[n.id] : 0;
        if (!nodesByLevel[lvl]) nodesByLevel[lvl] = [];
        nodesByLevel[lvl].push(n);
    });

    // Assign X, Y coordinates
    const nodePositions: Record<string, {x: number, y: number}> = {};
    const maxLevel = nodesByLevel.length;
    
    // Center alignment
    nodesByLevel.forEach((levelNodes, lvl) => {
        const levelWidth = levelNodes.length * (nodeWidth + 40);
        const startX = (width - levelWidth) / 2;
        
        levelNodes.forEach((node, i) => {
            nodePositions[node.id] = {
                x: startX + i * (nodeWidth + 40) + nodeWidth/2, // center of node
                y: 80 + lvl * layerSpacing
            };
        });
    });

    // --- Drawing ---

    // Define arrow markers
    const defs = svg.append("defs");
    
    const types = ['Origin', 'Amplifier', 'Debunker', 'Source'];
    const colors = {
        'Origin': '#ef4444',    // Red-500
        'Amplifier': '#f5c14b', // Yellow/Orange
        'Debunker': '#22c55e',  // Green-500
        'Source': '#3b82f6',    // Blue-500
    };

    types.forEach(type => {
        const color = colors[type as keyof typeof colors] || '#9ca3af';
        defs.append("marker")
            .attr("id", `arrow-${type}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", nodeWidth / 2 + 10) // offset to end at node edge
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", color)
            .style("opacity", 0.6);
    });

    // Draw Links
    const linkSelection = g.append("g")
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("d", d => {
            const start = nodePositions[d.source] || {x:0, y:0};
            const end = nodePositions[d.target] || {x:0, y:0};
            
            // Curved path
            const path = d3.path();
            path.moveTo(start.x, start.y + nodeHeight/2);
            path.bezierCurveTo(
                start.x, start.y + nodeHeight/2 + 50,
                end.x, end.y - nodeHeight/2 - 50,
                end.x, end.y - nodeHeight/2
            );
            return path.toString();
        })
        .attr("fill", "none")
        .attr("stroke", d => {
            const sourceNode = nodes.find(n => n.id === d.source);
            return colors[sourceNode?.type as keyof typeof colors] || '#6b7280';
        })
        .attr("stroke-width", 2)
        .attr("marker-end", d => {
            const sourceNode = nodes.find(n => n.id === d.source);
            return `url(#arrow-${sourceNode?.type})`;
        })
        .style("opacity", 0.4)
        .style("transition", "opacity 0.2s, stroke-width 0.2s");

    // Draw Nodes
    const nodeGroup = g.append("g")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("transform", d => {
            const pos = nodePositions[d.id] || {x:0, y:0};
            return `translate(${pos.x - nodeWidth/2}, ${pos.y - nodeHeight/2})`;
        })
        .style("cursor", "pointer")
        .on("mouseenter", (event, d) => {
            setHoveredNode(d);
            
            // Highlight connected links
            linkSelection.style("opacity", l => 
                l.source === d.id || l.target === d.id ? 1 : 0.1
            )
            .attr("stroke-width", l => 
                l.source === d.id || l.target === d.id ? 3 : 1
            );

            // Dim other nodes
            nodeGroup.style("opacity", n => 
                n.id === d.id || 
                links.some(l => (l.source === d.id && l.target === n.id) || (l.source === n.id && l.target === d.id))
                ? 1 : 0.2
            );
        })
        .on("mouseleave", () => {
            setHoveredNode(null);
            linkSelection.style("opacity", 0.4).attr("stroke-width", 2);
            nodeGroup.style("opacity", 1);
        })
        .on("click", (event, d) => {
             // Center zoom on node
             const pos = nodePositions[d.id];
             if(pos) {
                svg.transition().duration(750).call(
                    zoom.transform,
                    d3.zoomIdentity.translate(width/2, height/2).scale(1.2).translate(-pos.x, -pos.y)
                );
             }
        });

    // Node Rect
    nodeGroup.append("rect")
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 8)
        .attr("fill", "#050509")
        .attr("stroke", d => colors[d.type as keyof typeof colors] || '#6b7280')
        .attr("stroke-width", 2)
        .style("filter", d => `drop-shadow(0 0 8px ${colors[d.type as keyof typeof colors]}40)`);

    // Node Role Label (Badge)
    nodeGroup.append("rect")
        .attr("x", 10)
        .attr("y", -10)
        .attr("width", d => d.type.length * 8 + 10)
        .attr("height", 20)
        .attr("rx", 4)
        .attr("fill", "#0a0b10")
        .attr("stroke", d => colors[d.type as keyof typeof colors] || '#6b7280')
        .attr("stroke-width", 1);

    nodeGroup.append("text")
        .attr("x", 15)
        .attr("y", 4)
        .text(d => d.type.toUpperCase())
        .attr("font-size", "10px")
        .attr("font-weight", "bold")
        .attr("fill", d => colors[d.type as keyof typeof colors] || '#6b7280');

    // Node Label
    nodeGroup.append("text")
        .attr("x", nodeWidth / 2)
        .attr("y", nodeHeight / 2 + 5)
        .attr("text-anchor", "middle")
        .text(d => d.label.length > 20 ? d.label.substring(0, 18) + "..." : d.label)
        .attr("fill", "#f3f4f6")
        .attr("font-size", "12px")
        .attr("font-weight", "500")
        .style("pointer-events", "none");

  }, [nodes, links]);

  return (
    <div ref={containerRef} className="w-full h-[500px] border border-white/10 rounded-xl overflow-hidden relative bg-[#0a0b10]">
      <svg ref={svgRef} className="w-full h-full block" />
      
      {/* Legend / Controls Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
         <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500"></span> <span className="text-xs text-gray-300">Origin</span>
         </div>
         <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#f5c14b]"></span> <span className="text-xs text-gray-300">Amplifier</span>
         </div>
         <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm p-2 rounded-lg border border-white/10">
            <span className="w-3 h-3 rounded-full bg-green-500"></span> <span className="text-xs text-gray-300">Debunker</span>
         </div>
      </div>

      <div className="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
         Scroll to zoom • Drag to pan • Click to focus
      </div>

      {hoveredNode && (
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-white/20 p-4 rounded-lg max-w-xs pointer-events-none animate-fade-in">
              <h4 className="text-[#f5c14b] font-bold mb-1">{hoveredNode.label}</h4>
              <span className={`text-xs font-mono px-2 py-0.5 rounded border 
                ${hoveredNode.type === 'Origin' ? 'border-red-500 text-red-400 bg-red-900/20' : 
                  hoveredNode.type === 'Amplifier' ? 'border-yellow-500 text-yellow-400 bg-yellow-900/20' : 
                  'border-green-500 text-green-400 bg-green-900/20'}`}>
                  {hoveredNode.type.toUpperCase()}
              </span>
          </div>
      )}
    </div>
  );
};

export default PropagationGraph;
