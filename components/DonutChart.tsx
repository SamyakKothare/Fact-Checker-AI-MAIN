import React, { useState } from 'react';

interface ChartData {
  id: string;
  label: string;
  value: number;
  color: string;
  description: string;
}

interface DonutChartProps {
  data: ChartData[];
  onHover: (id: string | null) => void;
}

const DonutChart: React.FC<DonutChartProps> = ({ data, onHover }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  const size = 300;
  const center = size / 2;
  const radius = 80;
  const strokeWidth = 40;
  
  // Helper to calculate SVG path for an arc
  const describeArc = (x: number, y: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  let cumulativeAngle = 0;

  const handleMouseEnter = (index: number, id: string) => {
    setHoveredIndex(index);
    onHover(id);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    onHover(null);
  };

  if (total === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <p>No data to visualize</p>
          </div>
      )
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-[#0a0b10] p-6 rounded-xl border border-white/5">
      {/* SVG Chart */}
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {data.map((slice, index) => {
            const sliceAngle = (slice.value / total) * 360;
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + sliceAngle;
            
            // Adjust calculations slightly to create a gap between slices
            const gap = sliceAngle > 5 ? 2 : 0; 
            const path = describeArc(center, center, radius, startAngle + gap/2, endAngle - gap/2);
            
            cumulativeAngle += sliceAngle;
            
            const isHovered = hoveredIndex === index;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <path
                key={slice.id}
                d={path}
                fill="none"
                stroke={slice.color}
                strokeWidth={isHovered ? strokeWidth + 8 : strokeWidth}
                className={`transition-all duration-300 ease-out cursor-pointer ${isDimmed ? 'opacity-30' : 'opacity-100'}`}
                onMouseEnter={() => handleMouseEnter(index, slice.id)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
          
          {/* Center Text */}
          <foreignObject x={center - 60} y={center - 40} width="120" height="80">
            <div className="flex flex-col items-center justify-center h-full text-center pointer-events-none">
               {hoveredIndex !== null ? (
                   <>
                    <span className="text-2xl font-bold text-gray-100">{data[hoveredIndex].value}</span>
                    <span className="text-xs uppercase tracking-wider text-gray-400 truncate w-full px-1">{data[hoveredIndex].label}</span>
                   </>
               ) : (
                   <>
                    <span className="text-2xl font-bold text-gray-100">{total}</span>
                    <span className="text-xs text-gray-500">Total Nodes</span>
                   </>
               )}
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Legend & Tooltip Area */}
      <div className="flex-1 min-w-[200px]">
         <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Distribution</h3>
         <div className="space-y-3">
             {data.map((item, index) => (
                 <div 
                    key={item.id}
                    className={`flex items-start gap-3 p-2 rounded-lg transition-all duration-200 cursor-pointer ${hoveredIndex === index ? 'bg-white/5 scale-105' : hoveredIndex !== null ? 'opacity-40' : 'hover:bg-white/5'}`}
                    onMouseEnter={() => handleMouseEnter(index, item.id)}
                    onMouseLeave={handleMouseLeave}
                 >
                     <div className="w-3 h-3 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: item.color }}></div>
                     <div>
                         <div className="flex items-center justify-between gap-4">
                             <span className="text-sm font-medium text-gray-200">{item.label}</span>
                             <span className="text-xs font-bold text-gray-500">{Math.round((item.value / total) * 100)}%</span>
                         </div>
                         {hoveredIndex === index && (
                            <p className="text-xs text-gray-400 mt-1 animate-fade-in leading-relaxed">
                                {item.description}
                            </p>
                         )}
                     </div>
                 </div>
             ))}
         </div>
      </div>
    </div>
  );
};

export default DonutChart;
