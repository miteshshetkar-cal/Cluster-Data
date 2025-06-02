// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// const COLORS = [
//     '#FF8042', // Orange for Used Cores
//     '#00C49F', // Green for Available Cores
//     '#A9A9A9', // Grey for No Data
// ];

// /**
//  * HostMemoryUsageChart Component
//  * Displays a pie chart visualizing the total Memory cores on a host,
//  * how many are used by VMs, and how many remain available.
//  *
//  * @param {object} hostData - The host object containing 'num_Memory_cores' and 'vm_inventory'.
//  * Each VM in 'vm_inventory' should have a 'Memory_count'.
//  */
// function HostMemoryUsageChart({ hostData }) {
//     // 1. Basic check if hostData is available
//     if (!hostData || typeof hostData !== 'object') {
//         return (
//             <div style={{
//                 backgroundColor: '#ffffff',
//                 borderRadius: '12px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
//                 padding: '20px',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 justifyContent: 'space-between'
//             }}>

//                 {/* <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host Memory Core Usage</h3> */}
//                 <h3 style={{
//                     color: '#1f2937',
//                     marginBottom: '15px',
//                     fontSize: '18px',
//                     fontWeight: '600'
//                 }}>
//                     Host Memory Usage
//                 </h3>
//                 <p>No valid host data available to display Memory usage.</p>
//             </div>
//         );
//     }

//     //   const totalHostCores = hostData.num_cpu_cores || 0;
//     //   let usedCores = 0;

//     const totalMemory = hostData.memory_gb *1000|| 0;
//     let usedMemory = 0;

//     // 2. Calculate total CPU cores used by VMs
//     if (hostData.vm_inventory && Array.isArray(hostData.vm_inventory)) {
//         usedMemory = hostData.vm_inventory.reduce((sum, vm) => sum + (vm.memory_mb || 0), 0);
//     }

//     // 3. Calculate available cores
//     const availableMemory = totalMemory - usedMemory;

//     // 4. Prepare data for the pie chart
//     const chartData = [];

//     if (usedMemory > 0) {
//         chartData.push({ name: 'Used Memory', value: usedMemory });
//     }


//     if (availableMemory > 0) {
//         chartData.push({ name: 'Available Memory', value: availableMemory });
//     } else if (totalMemory > 0 && usedMemory === 0) {
//         // If there are total cores but no VMs, all are available
//         chartData.push({ name: 'Available Memory', value: totalMemory });
//     }

//     // Handle edge case where there are no cores on the host or data is invalid
//     if (totalMemory === 0) {
//         return (
//             <div style={{
//                 backgroundColor: 'white',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//                 padding: '20px',
//                 marginBottom: '20px',
//                 textAlign: 'center',
//             }}>
//                 <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host Memory Usage</h3>
//                 <p>This host has 0 Memory.</p>
//             </div>
//         );
//     }

//     if (chartData.length === 0) {
//         return (
//             <div style={{
//                 backgroundColor: 'white',
//                 borderRadius: '8px',
//                 boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//                 padding: '20px',
//                 marginBottom: '20px',
//                 textAlign: 'center',
//             }}>
//                 <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host Memory Usage</h3>
//                 <p>Could not calculate Memory usage (possibly negative available memory due to over-provisioning or invalid data).</p>
//             </div>
//         );
//     }

//     // Handle over-provisioning (used cores > total host cores)
//     const isOverProvisioned = usedMemory > totalMemory;
//     let overProvisioningMessage = '';
//     if (isOverProvisioned) {
//         overProvisioningMessage = ` (Over-provisioned by ${usedMemory - totalMemory} memory)`;
//     }

//     return (
//         <div style={{
//             backgroundColor: 'white',
//             borderRadius: '8px',
//             boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
//             padding: '20px',
//             marginBottom: '20px',
//         }}>
//             <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>
//                 Host Memory Usage: {totalMemory} GB Total Memory{overProvisioningMessage}
//             </h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                     <Pie
//                         data={chartData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={100}
//                         fill="#8884d8"
//                         // Label to show the name and its value directly on the slice
//                         // label={({ name, value }) => `${name}: ${value}`}
//                         label={({ name, value }) => {
//                             const shortName = name.replace(' Memory (GB)', '');
//                             const formattedValue = value > 1024 ? `${Math.round(value / 1024)} GB` : `${value} MB`;
//                             return `${name}: ${formattedValue}`;
//                         }}

//                         labelLine={false}
//                     >
//                         {chartData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                         ))}
//                     </Pie>
//                     <Tooltip />
//                     <Legend />
//                 </PieChart>
//             </ResponsiveContainer>
//         </div>
//     );
// }

// export default HostMemoryUsageChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
    '#FF8042', // Orange for Used Memory
    '#00C49F', // Green for Available Memory
    '#A9A9A9', // Grey for No Data
];

function HostMemoryUsageChart({ hostData }) {
    // 1. Validate hostData
    if (!hostData || typeof hostData !== 'object') {
        return (
            <div style={styles.wrapper}>
                <h3 style={styles.title}>Host Memory Usage</h3>
                <p>No valid host data available to display Memory usage.</p>
            </div>
        );
    }

    // 2. Get total memory in GB
    const totalMemory = hostData.memory_gb || 0;
    let usedMemory = 0;

    // 3. Sum used memory from VMs (convert MB to GB)
    if (Array.isArray(hostData.vm_inventory)) {
        usedMemory = hostData.vm_inventory.reduce((sum, vm) => {
            const vmMemoryGB = (vm.memory_mb || 0) / 1024;
            return sum + vmMemoryGB;
        }, 0);
    }

    // 4. Calculate available memory
    const availableMemory = totalMemory - usedMemory;

    // 5. Prepare chart data
    const chartData = [];

    if (usedMemory > 0) {
        chartData.push({ name: 'Used', value: Number(usedMemory.toFixed(2)) });
    }

    if (availableMemory > 0) {
        chartData.push({ name: 'Available', value: Number(availableMemory.toFixed(2)) });
    } else if (totalMemory > 0 && usedMemory === 0) {
        chartData.push({ name: 'Available', value: Number(totalMemory.toFixed(2)) });
    }

    // 6. Handle zero or invalid data
    if (totalMemory === 0) {
        return (
            <div style={styles.wrapper}>
                <h3 style={styles.title}>Host Memory Usage</h3>
                <p>This host has 0 GB memory.</p>
            </div>
        );
    }

    if (chartData.length === 0) {
        return (
            <div style={styles.wrapper}>
                <h3 style={styles.title}>Host Memory Usage</h3>
                <p>Could not calculate memory usage (invalid or negative values).</p>
            </div>
        );
    }

    // 7. Check over-provisioning
    const isOverProvisioned = usedMemory > totalMemory;
    const overProvisioningMessage = isOverProvisioned
        ? ` (Over-provisioned by ${(usedMemory - totalMemory).toFixed(2)} GB)`
        : '';

    return (
        <div style={styles.wrapper}>
            <h3 style={styles.title}>
                Host Memory Usage: {totalMemory.toFixed(2)} GB{overProvisioningMessage}
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
                        fill="#8884d8"
                        label={({ name, value }) => `${name}: ${value} GB`}
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} GB`, 'Memory']} />
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

export default HostMemoryUsageChart;
