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

    // 1. Measure Container
    const width = containerRef.current.clientWidth;
    // Calculate needed height based on depth, or fixed minimum
    const minHeight = 500;
    
    // Clear previous
    d3.select(svgRef.current).selectAll("*").remove();

    // 2. Prepare Data (Clone to avoid mutation issues in React Strict Mode)
    const graphNodes = nodes.map(n => ({ ...n })) as (GraphNode & d3.SimulationNodeDatum)[];
    const graphLinks = links.map(l => ({ ...l })) as (GraphLink & d3.SimulationLinkDatum<d3.SimulationNodeDatum>)[];

    // 3. Determine Levels (BFS) for Y-positioning
    // This maps propagation depth to vertical levels as requested
    const levels = new Map<string, number>();
    const adjacency: Record<string, string[]> = {};
    const inDegree: Record<string, number> = {};
    
    graphNodes.forEach(n => {
        levels.set(n.id, 0);
        adjacency[n.id] = [];
        inDegree[n.id] = 0;
    });

    graphLinks.forEach(l => {
        const src = (l.source as any).id || l.source;
        const tgt = (l.target as any).id || l.target;
        if(adjacency[src]) adjacency[src].push(tgt);
        if(inDegree[tgt] !== undefined) inDegree[tgt]++;
    });

    // BFS queue
    const queue: {id: string, depth: number}[] = [];
    
    // Find roots (Origin or 0 in-degree)
    graphNodes.forEach(n => {
        if (n.type === 'Origin' || inDegree[n.id] === 0) {
            queue.push({ id: n.id, depth: 0 });
        }
    });

    // Fallback if circular
    if (queue.length === 0 && graphNodes.length > 0) {
        queue.push({ id: graphNodes[0].id, depth: 0 });
    }

    const visited = new Set<string>();
    let maxLevel = 0;

    while(queue.length > 0) {
        const {id, depth} = queue.shift()!;
        if (visited.has(id)) continue;
        visited.add(id);
        
        // Update level if deeper path found (Longest Path layering is often better for DAGs)
        const currentLevel = levels.get(id) || 0;
        if (depth > currentLevel) {
            levels.set(id, depth);
            if (depth > maxLevel) maxLevel = depth;
        }

        const children = adjacency[id] || [];
        children.forEach(childId => {
            queue.push({ id: childId, depth: depth + 1 });
        });
    }

    // Dynamic height based on levels
    const levelHeight = 150;
    const height = Math.max(minHeight, (maxLevel + 1) * levelHeight + 100);

    // 4. Setup SVG & Zoom
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .style("background", "#0a0b10");

    const g = svg.append("g");

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => g.attr("transform", event.transform));

    svg.call(zoom);

    // 5. Force Simulation with Level Constraints
    const nodeWidth = 180;
    const nodeHeight = 60;

    const simulation = d3.forceSimulation(graphNodes)
        .force("link", d3.forceLink(graphLinks).id((d: any) => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-800)) // Spread horizontally
        .force("collide", d3.forceCollide().radius(nodeWidth / 2 + 20).iterations(2)) // Prevent overlap
        .force("y", d3.forceY((d: any) => {
            // Constraint: Y position depends strictly on level
            const lvl = levels.get(d.id) || 0;
            return 80 + lvl * levelHeight;
        }).strength(3)) // Strong strength to enforce layers
        .force("x", d3.forceX(width / 2).strength(0.1)); // Gentle centering

    // Run simulation synchronously to pre-calculate layout (avoids animation on load)
    simulation.tick(300); 

    // 6. Draw Links
    // Define Arrow Markers
    const defs = svg.append("defs");
    const roles = ['Origin', 'Amplifier', 'Debunker', 'Source'];
    const colors: Record<string, string> = {
        'Origin': '#ef4444',    // Red
        'Amplifier': '#f5c14b', // Yellow/Orange
        'Debunker': '#22c55e',  // Green
        'Source': '#3b82f6',    // Blue
    };

    roles.forEach(role => {
        defs.append("marker")
            .attr("id", `arrow-${role}`)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", nodeWidth / 2 + 8) // End exactly at node border
            .attr("refY", 0)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", colors[role] || '#888')
            .style("opacity", 0.6);
    });

    const linkSelection = g.append("g")
        .selectAll("path")
        .data(graphLinks)
        .join("path")
        .attr("d", (d: any) => {
             // Curved paths (Beziers)
             const path = d3.path();
             path.moveTo(d.source.x, d.source.y + nodeHeight / 2);
             path.bezierCurveTo(
                 d.source.x, d.source.y + nodeHeight / 2 + 50,
                 d.target.x, d.target.y - nodeHeight / 2 - 50,
                 d.target.x, d.target.y - nodeHeight / 2
             );
             return path.toString();
        })
        .attr("fill", "none")
        .attr("stroke", (d: any) => colors[d.source.type] || '#555')
        .attr("stroke-width", 2)
        .attr("marker-end", (d: any) => `url(#arrow-${d.source.type})`)
        .style("opacity", 0.4)
        .style("transition", "opacity 0.2s, stroke-width 0.2s");

    // 7. Draw Nodes
    const nodeSelection = g.append("g")
        .selectAll("g")
        .data(graphNodes)
        .join("g")
        .attr("transform", d => `translate(${d.x}, ${d.y})`)
        .style("cursor", "pointer")
        .on("mouseenter", (event, d) => {
            const rawNode = nodes.find(n => n.id === d.id) || d;
            setHoveredNode(rawNode as GraphNode);
            
            // Highlight connections
            linkSelection.style("opacity", (l: any) => 
                l.source.id === d.id || l.target.id === d.id ? 1 : 0.05
            ).attr("stroke-width", (l: any) => 
                l.source.id === d.id || l.target.id === d.id ? 3 : 1
            );
            
            nodeSelection.style("opacity", (n: any) => 
                n.id === d.id || 
                graphLinks.some((l: any) => (l.source.id === d.id && l.target.id === n.id) || (l.source.id === n.id && l.target.id === d.id))
                ? 1 : 0.2
            );
        })
        .on("mouseleave", () => {
            setHoveredNode(null);
            linkSelection.style("opacity", 0.4).attr("stroke-width", 2);
            nodeSelection.style("opacity", 1);
        })
        .on("click", (event, d) => {
            // Smooth center zoom on click
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity.translate(width/2, height/2).scale(1.2).translate(-d.x!, -d.y!)
            );
        });

    // Card styling
    nodeSelection.append("rect")
        .attr("x", -nodeWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 6)
        .attr("fill", "#050509")
        .attr("stroke", d => colors[d.type] || '#555')
        .attr("stroke-width", 2)
        .style("filter", d => `drop-shadow(0 0 10px ${colors[d.type]}20)`);

    // Role Badge
    nodeSelection.append("rect")
        .attr("x", -nodeWidth / 2 + 10)
        .attr("y", -nodeHeight / 2 - 10)
        .attr("width", d => d.type.length * 7 + 12)
        .attr("height", 20)
        .attr("rx", 4)
        .attr("fill", "#0a0b10")
        .attr("stroke", d => colors[d.type] || '#555')
        .attr("stroke-width", 1);

    nodeSelection.append("text")
        .attr("x", -nodeWidth / 2 + 16)
        .attr("y", -nodeHeight / 2 + 3)
        .text(d => d.type.toUpperCase())
        .attr("fill", d => colors[d.type] || '#ccc')
        .attr("font-size", "9px")
        .attr("font-weight", "bold");

    // Label
    nodeSelection.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .text(d => d.label.length > 22 ? d.label.substring(0, 20) + "..." : d.label)
        .attr("fill", "#eee")
        .attr("font-size", "11px")
        .attr("font-weight", "500")
        .style("pointer-events", "none");

  }, [nodes, links]);

  return (
    <div ref={containerRef} className="w-full border border-white/10 rounded-xl overflow-hidden relative bg-[#0a0b10]" style={{ height: '500px' }}>
      <svg ref={svgRef} className="w-full h-full block" />
      
      {/* Legend Overlay */}
      <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
         {['Origin', 'Amplifier', 'Debunker'].map(role => (
             <div key={role} className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded border border-white/5">
                <span className={`w-2 h-2 rounded-full ${role === 'Origin' ? 'bg-red-500' : role === 'Amplifier' ? 'bg-[#f5c14b]' : 'bg-green-500'}`}></span>
                <span className="text-[10px] uppercase text-gray-300">{role}</span>
             </div>
         ))}
      </div>

      <div className="absolute bottom-4 right-4 text-[10px] text-gray-600 pointer-events-none">
         Scroll to Zoom • Drag to Pan
      </div>

      {/* Tooltip */}
      {hoveredNode && (
          <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-md border border-white/20 p-3 rounded-lg max-w-xs pointer-events-none animate-fade-in shadow-xl">
              <h4 className="text-white font-bold text-sm mb-1">{hoveredNode.label}</h4>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border 
                ${hoveredNode.type === 'Origin' ? 'border-red-500 text-red-400 bg-red-900/30' : 
                  hoveredNode.type === 'Amplifier' ? 'border-yellow-500 text-yellow-400 bg-yellow-900/30' : 
                  'border-green-500 text-green-400 bg-green-900/30'}`}>
                  {hoveredNode.type.toUpperCase()}
              </span>
          </div>
      )}
    </div>
  );
};

export default PropagationGraph;
