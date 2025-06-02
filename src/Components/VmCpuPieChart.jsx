import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#FF6384', '#36A2EB', '#FFCE56', '#00C49F', '#FF8042', '#A28CFD',
  '#FF9F40', '#4BC0C0', '#9966FF', '#C9CBCF', '#FF6384', '#36A2EB'
];

function VmCpuPieChart({ vmData = [] }) {
  if (!Array.isArray(vmData) || vmData.length === 0) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.title}>VM CPU Usage</h3>
        <p>No VM data available.</p>
      </div>
    );
  }

  const chartData = vmData.map(vm => ({
    name: `VM-${vm.vm_id}`,
    value: vm.cpu_count || 0,
  })).filter(vm => vm.value > 0);

  if (chartData.length === 0) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.title}>VM CPU Usage</h3>
        <p>No valid CPU data.</p>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>VM-wise CPU Usage (cores)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value}`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value} cores`, name]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    padding: '20px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  title: {
    color: '#1f2937',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '600',
  }
};

export default VmCpuPieChart;
