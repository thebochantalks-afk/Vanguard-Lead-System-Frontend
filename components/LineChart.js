import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function LineChart({ data, xKey, yKey, color = "#FF4D1C" }) {
  return (
    <div className="h-64 w-full bg-surface border border-border rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
          <XAxis 
            dataKey={xKey} 
            stroke="#6B6B6B" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(str) => {
              const date = new Date(str);
              return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
            }}
          />
          <YAxis 
            stroke="#6B6B6B" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1A1A1A', 
              border: '1px solid #2A2A2A',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            itemStyle={{ color: color }}
            cursor={{ stroke: '#2A2A2A' }}
          />
          <Line 
            type="monotone" 
            dataKey={yKey} 
            stroke={color} 
            strokeWidth={2} 
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 6 }} 
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
