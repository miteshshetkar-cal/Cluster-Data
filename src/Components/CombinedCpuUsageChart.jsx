import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS_MAIN = ['#FF8042', '#00C49F']; // Used, Available
const COLORS_VM = [
  '#8884d8', '#8dd1e1', '#82ca9d', '#ffc658', '#a4de6c', '#d0ed57',
  '#ffbb28', '#ff8042', '#00C49F', '#FF6384', '#FFCE56', '#36A2EB'
];

function CombinedCpuUsageChart({ total = 0, vmData = [] }) {
  const used = vmData.reduce((sum, vm) => sum + (vm.cpu_count || 0), 0);
  const available = Math.max(total - used, 0);

  const summaryData = [
    { name: 'Used', value: used },
    { name: 'Available', value: available }
  ];

  const vmBreakdown = vmData
    .filter(vm => vm.cpu_count > 0)
    .map(vm => ({
      name: `VM-${vm.vm_id}`,
      value: vm.cpu_count
    }));

  const overProvisioned = used > total;

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>
        CPU Usage: {total.toFixed(2)} cores
        {overProvisioned && (
          <span style={{ color: 'red', fontWeight: 'normal' }}>
            {' '} (Over-provisioned by {(used - total).toFixed(2)})
          </span>
        )}
      </h3>

      <div style={styles.charts}>
        <div style={styles.chartBox}>
          <h4 style={styles.subTitle}>Overall CPU</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={summaryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {summaryData.map((entry, index) => (
                  <Cell key={`cell-main-${index}`} fill={COLORS_MAIN[index % COLORS_MAIN.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} cores`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartBox}>
          <h4 style={styles.subTitle}>Used CPU by VMs</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={vmBreakdown}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {vmBreakdown.map((entry, index) => (
                  <Cell key={`cell-vm-${index}`} fill={COLORS_VM[index % COLORS_VM.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} cores`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
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
  subTitle: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#374151',
  },
  charts: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px'
  },
  chartBox: {
    flex: '1 1 45%',
    minWidth: '300px',
  }
};

export default CombinedCpuUsageChart;

