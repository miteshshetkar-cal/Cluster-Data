
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Define colors for the pie slices
const COLORS = [
  '#0088FE', // Blue
  '#00C49F', // Green
  '#FFBB28', // Yellow
  '#FF8042', // Orange
  '#8A2BE2', // BlueViolet
  '#FF69B4', // HotPink
  '#4682B4', // SteelBlue
];
  
function HostHardwareChart({ hostData }) {
  
  if (!hostData) {
    return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host Hardware Resources</h3>
        <p>No host data available to display the chart.</p>
      </div>
    );
  }

  const chartData = [
    { name: 'CPU Cores', value: hostData.num_cpu_cores || 0 },
    // { name: 'Memory (GB)', value: hostData.memory_gb || 0 },
    // { name: 'CPU Speed (MHz)', value: hostData.cpu_speed_mhz || 0 },
    { name: 'HBAs', value: hostData.num_hba || 0 },
    { name: 'NICs', value: hostData.num_nics || 0 },
    { name: 'CPU Threads', value: hostData.cpu_threads || 0 },
  ].filter(item => item.value > 0); // Filter out items with 0 value to avoid empty slices

  if (chartData.length === 0) {
     return (
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        padding: '20px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host Hardware Resources</h3>
        <p>No numerical resource data available for this host.</p>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      padding: '20px',
      marginBottom: '20px',
    }}>
      <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host Hardware Resources</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value" // The numerical value to determine slice size
            nameKey="name"  // The name/label for each slice
            cx="50%"        // Center X-coordinate
            cy="50%"        // Center Y-coordinate
            outerRadius={100} // Outer radius of the pie
            fill="#8884d8"
            // Label to show the name and its value directly on the slice
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={false} // Hide the lines connecting labels to slices
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />   {/* Displays information when hovering over a slice */}
          <Legend />    {/* Shows the color-coded legend for each resource */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HostHardwareChart;
