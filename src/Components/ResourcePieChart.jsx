// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// const VM_COLORS = [
//   '#FF6384', '#36A2EB', '#FF9F40', '#9966FF', '#FFCD56',
//   '#4BC0C0', '#C9CBCF', '#F67019', '#FDB45C', '#949FB1',
//   '#00A6B4', '#FF6B6B', '#845EC2', '#0081CF', '#FFC75F',
//   '#FF9671', '#D65DB1', '#008F7A', '#B39CD0', '#FF5E78'
// ];

// const AVAILABLE_COLOR = '#00C49F'; // Green for available

// function ResourcePieChart({ label = "Resource", used = 0, total = 0, unit = "", vmData = [], dataKey = "cpu_count" }) {
//   const isValid = typeof used === 'number' && typeof total === 'number' && total >= 0;
//   if (!isValid) {
//     return renderMessage(label, "Invalid data provided.");
//   }

//   const available = total - used;
//   const chartData = [];

//   // Push VM usage data
//   vmData.forEach(vm => {
//     const value = vm[dataKey] || 0;
//     if (value > 0) {
//       chartData.push({
//         name: `${vm.vm_id}`,
//         value: value,
//         isAvailable: false
//       });
//     }
//   });

//   // Add "Available" segment
//   if (available > 0) {
//     chartData.push({
//       name: 'Available',
//       value: Number(available.toFixed(2)),
//       isAvailable: true
//     });
//   } else if (used === 0 && total > 0) {
//     chartData.push({
//       name: 'Available',
//       value: Number(total.toFixed(2)),
//       isAvailable: true
//     });
//   }

//   if (total === 0) return renderMessage(label, "Total is 0.");
//   if (chartData.length === 0) return renderMessage(label, "No usable data.");

//   const overProvisioned = used > total;
//   const overMsg = overProvisioned
//     ? ` (Over-provisioned by ${(used - total).toFixed(2)} ${unit})`
//     : '';

//   return (
//     <div style={styles.wrapper}>
//       <h3 style={styles.title}>
//         {label} Usage: {total.toFixed(2)} {unit}{overMsg}
//       </h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={chartData}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label={({ name, value }) => `${name}: ${value} ${unit}`}
//             labelLine={false}
//           >
//             {chartData.map((entry, index) => (
//               <Cell
//                 key={`cell-${index}`}
//                 fill={entry.isAvailable ? AVAILABLE_COLOR : VM_COLORS[index % VM_COLORS.length]}
//               />
//             ))}
//           </Pie>
//           <Tooltip
//             formatter={(value, name) => [`${value} ${unit}`, name]}
//             contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "5px", fontSize: "14px" }}
//           />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// function renderMessage(label, message) {
//   return (
//     <div style={styles.wrapper}>
//       <h3 style={styles.title}>{label} Usage</h3>
//       <p>{message}</p>
//     </div>
//   );
// }

// const styles = {
//   wrapper: {
//     backgroundColor: 'white',
//     borderRadius: '8px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//     padding: '20px',
//     marginBottom: '20px',
//     textAlign: 'center',
//   },
//   title: {
//     color: '#1f2937',
//     marginBottom: '15px',
//     fontSize: '18px',
//     fontWeight: '600',
//   }
// };

// export default ResourcePieChart;
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const VM_COLORS = [
  '#FF6384', '#36A2EB', '#FF9F40', '#9966FF', '#FFCD56',
  '#4BC0C0', '#C9CBCF', '#F67019', '#FDB45C', '#949FB1',
  '#00A6B4', '#FF6B6B', '#845EC2', '#0081CF', '#FFC75F',
  '#FF9671', '#D65DB1', '#008F7A', '#B39CD0', '#FF5E78'
];

const AVAILABLE_COLOR = '#00C49F'; // Green for available

function ResourcePieChart({ label = "Resource", used = 0, total = 0, unit = "", vmData = [], dataKey = "cpu_count" }) {
  const isValid = typeof used === 'number' && typeof total === 'number' && total >= 0;
  if (!isValid) {
    return renderMessage(label, "Invalid data provided.");
  }

  const available = total - used;
  const chartData = [];

  // Push VM usage data
  vmData.forEach(vm => {
    const value = vm[dataKey] || 0;
    if (value > 0) {
      chartData.push({
        name: `${vm.vm_id}`,
        value: value,
        isAvailable: false
      });
    }
  });

  // Add "Available" segment
  if (available > 0) {
    chartData.push({
      name: 'Available',
      value: Number(available.toFixed(2)),
      isAvailable: true
    });
  } else if (used === 0 && total > 0) {
    chartData.push({
      name: 'Available',
      value: Number(total.toFixed(2)),
      isAvailable: true
    });
  }

  if (total === 0) return renderMessage(label, "Total is 0.");
  if (chartData.length === 0) return renderMessage(label, "No usable data.");

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
              <Cell
                key={`cell-${index}`}
                fill={entry.isAvailable ? AVAILABLE_COLOR : VM_COLORS[index % VM_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} ${unit}`, name]}
            contentStyle={{ backgroundColor: "#f9fafb", borderRadius: "5px", fontSize: "14px" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

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
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: '600',
  }
};

export default ResourcePieChart;

