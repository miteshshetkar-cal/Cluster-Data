import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
  '#FF8042', // Used
  '#00C49F', // Available
  '#A9A9A9', // Fallback
];

function ResourcePieChart({ label = "Resource", used = 0, total = 0, unit = "" }) {
  const isValid = typeof used === 'number' && typeof total === 'number' && total >= 0;

  if (!isValid) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.title}>{label} Usage</h3>
        <p>Invalid data provided.</p>
      </div>
    );
  }

  const available = total - used;
  const chartData = [];

  if (used > 0) {
    chartData.push({ name: 'Used', value: Number(used.toFixed(2)) });
  }

  if (available > 0) {
    chartData.push({ name: 'Available', value: Number(available.toFixed(2)) });
  } else if (used === 0 && total > 0) {
    chartData.push({ name: 'Available', value: Number(total.toFixed(2)) });
  }

  if (total === 0) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.title}>{label} Usage</h3>
        <p>Total is 0.</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div style={styles.wrapper}>
        <h3 style={styles.title}>{label} Usage</h3>
        <p>No usable data.</p>
      </div>
    );
  }

  const overProvisioned = used > total;
  const overMsg = overProvisioned
    ? ` (Over-provisioned by ${(used - total).toFixed(2)} ${unit})`
    : '';

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>
        {label} Usage: {total.toFixed(2)} {unit}{overMsg}
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, value }) => `${name}: ${value} ${unit}`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} ${unit}`, label]} />
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

export default ResourcePieChart;
