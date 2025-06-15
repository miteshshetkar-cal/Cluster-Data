import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const VM_COLORS = [
  '#FF6384', '#36A2EB', '#FF9F40', '#9966FF', '#FFCD56',
  '#4BC0C0', '#C9CBCF', '#F67019', '#FDB45C', '#949FB1',
  '#00A6B4', '#FF6B6B', '#845EC2', '#0081CF', '#FFC75F',
  '#FF9671', '#D65DB1', '#008F7A', '#B39CD0', '#FF5E78'
];

const AVAILABLE_COLOR = '#00C49F'; // Green

function ResourcePieChart({
  label = "Resource",
  used = 0,
  total = 0,
  unit = "",
  vmData = [],
  dataKey = "cpu_count"
}) {
  const isValid = typeof used === 'number' && typeof total === 'number' && total >= 0;
  if (!isValid) return renderMessage(label, "Invalid data provided.");

  const available = total - used;

  // Build the chart data with each VM as a separate slice
  // const chartData = vmData
  //   .map((vm) => ({
  //     name: vm.vm_id,
  //     value: vm[dataKey] || 0,
  //     isAvailable: false
  //   }))
  //   .filter(entry => entry.value > 0);
  const chartData = vmData
    .map((vm, index) => ({
      name: vm.vm_id,
      value: vm[dataKey] || 0,
      isAvailable: false,
      showUsedLabel: index === 0 // Only the first VM gets the label
    }))
    .filter(entry => entry.value > 0);

  // Add the "Available" slice if any available resources exist
  if (available > 0) {
    chartData.push({
      name: 'Available',
      value: Number(available.toFixed(2)),
      isAvailable: true
    });
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
      <p style={styles.subtitle}>
        Total Virtual Machines: {vmData.length}
      </p>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            // label={({ name, value }) =>
            //   name === "Available" ? `${name}: ${value} ${unit}` : `${"Used"}: 100`
            // }
            label={({ name, value, showUsedLabel }) =>
              name === "Available"
                ? `${name}: ${value} ${unit}`
                : showUsedLabel
                  ? `Used: ${used.toFixed(2)} ${unit}`
                  : ''
            }

            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isAvailable ? AVAILABLE_COLOR : VM_COLORS[index % VM_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip unit={unit} />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Tooltip showing info based on the slice
const CustomTooltip = ({ active, payload, unit }) => {
  if (active && payload && payload.length) {
    const { name, value, isAvailable } = payload[0].payload;

    if (isAvailable) {
      return (
        <div style={styles.tooltip}>
          <strong>Available:</strong> {value} {unit}
        </div>
      );
    }

    return (
      <div style={styles.tooltip}>
        <strong>VM ID:</strong> {name}<br />
        <strong>Used:</strong> {value} {unit}
      </div>
    );
  }

  return null;
};

function renderMessage(label, message) {
  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>{label} Usage</h3>
      <p>{message}</p>
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
    marginBottom: '10px',
    fontSize: '18px',
    fontWeight: '600',
  },
  subtitle: {
    marginBottom: '5px',
    color: '#6b7280',
    fontSize: '14px'
  },
  tooltip: {
    backgroundColor: '#f9fafb',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    lineHeight: '1.5'
  }
};

export default ResourcePieChart;
