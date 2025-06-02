import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = [
    '#FF8042', // Orange for Used Cores
    '#00C49F', // Green for Available Cores
    '#A9A9A9', // Grey for No Data
];

/**
 * HostCpuUsageChart Component
 * Displays a pie chart visualizing the total CPU cores on a host,
 * how many are used by VMs, and how many remain available.
 *
 * @param {object} hostData - The host object containing 'num_cpu_cores' and 'vm_inventory'.
 * Each VM in 'vm_inventory' should have a 'cpu_count'.
 */
function HostCpuUsageChart({ hostData }) {
    // 1. Basic check if hostData is available
    if (!hostData || typeof hostData !== 'object') {
        return (
            <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                padding: '20px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>

                <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host CPU Core Usage</h3>
                <p>No valid host data available to display CPU usage.</p>
            </div>
        );
    }

    const totalHostCores = hostData.num_cpu_cores || 0;
    let usedCores = 0;

    // 2. Calculate total CPU cores used by VMs
    if (hostData.vm_inventory && Array.isArray(hostData.vm_inventory)) {
        usedCores = hostData.vm_inventory.reduce((sum, vm) => sum + (vm.cpu_count || 0), 0);
    }

    // 3. Calculate available cores
    const availableCores = totalHostCores - usedCores;

    // 4. Prepare data for the pie chart
    const chartData = [];

    if (usedCores > 0) {
        chartData.push({ name: 'Used Cores', value: usedCores });
    }

    // Only add 'Available Cores' if there are physical cores and some are available
    // or if there are no used cores, meaning all are available.
    if (availableCores > 0) {
        chartData.push({ name: 'Available Cores', value: availableCores });
    } else if (totalHostCores > 0 && usedCores === 0) {
        // If there are total cores but no VMs, all are available
        chartData.push({ name: 'Available Cores', value: totalHostCores });
    }

    // Handle edge case where there are no cores on the host or data is invalid
    if (totalHostCores === 0) {
        return (
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
                padding: '20px',
                marginBottom: '20px',
                textAlign: 'center',
            }}>
                {/* <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host CPU Core Usage</h3> */}
                <h3 style={{
                    color: '#1f2937',
                    marginBottom: '15px',
                    fontSize: '18px',
                    fontWeight: '600'
                }}>
                    Host CPU Usage
                </h3>
                <p>This host has 0 CPU cores.</p>
            </div>
        );
    }

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
                <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>Host CPU Core Usage</h3>
                <p>Could not calculate CPU usage (possibly negative available cores due to over-provisioning or invalid data).</p>
            </div>
        );
    }

    // Handle over-provisioning (used cores > total host cores)
    const isOverProvisioned = usedCores > totalHostCores;
    let overProvisioningMessage = '';
    if (isOverProvisioned) {
        overProvisioningMessage = ` (Over-provisioned by ${usedCores - totalHostCores} cores)`;
    }

    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            padding: '20px',
            marginBottom: '20px',
        }}>
            <h3 style={{ color: '#1f2937', marginBottom: '15px' }}>
                Host CPU Core Usage: {totalHostCores} Total Cores{overProvisioningMessage}
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
                        // Label to show the name and its value directly on the slice
                        label={({ name, value }) => `${name}: ${value}`}
                        labelLine={false}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default HostCpuUsageChart;