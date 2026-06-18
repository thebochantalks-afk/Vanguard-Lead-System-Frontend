import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

export default function LineChart({ data, xKey, yKey, color = "#FF4D1C" }) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 w-full glass-card flex items-center justify-center">
        <p className="text-sm text-muted">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="h-64 w-full glass-card p-5">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.15} />
              <stop offset="95%" stopColor={color} stopOpacity={0.01} />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="rgba(255,255,255,0.06)" 
            vertical={false} 
          />
          <XAxis 
            dataKey={xKey} 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(str) => {
              const date = new Date(str);
              return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.3)" 
            fontSize={11} 
            tickLine={false} 
            axisLine={false}
            width={40}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'rgba(26, 26, 26, 0.95)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              fontSize: '12px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
            itemStyle={{ color }}
            labelStyle={{ color: '#FAFAF8', fontWeight: 600, marginBottom: 4 }}
            cursor={{ stroke: 'rgba(255,255,255,0.1)' }}
          />
          <Area 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={{ r: 3, fill: '#0D0D0D', stroke: color, strokeWidth: 2 }}
            activeDot={{ r: 5, fill: color, stroke: '#0D0D0D', strokeWidth: 2, filter: 'url(#glow)' }} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}