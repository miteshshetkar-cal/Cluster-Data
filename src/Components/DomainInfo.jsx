import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import ResourcePieChart from './ResourcePieChart';

export const DomainInfo = ({ cluster_data }) => {

    const [hostInfo, setHostInfo] = useState(null);
    const navigate = useNavigate();



    const columns = [
        {
            name: 'Sr No',
            cell: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Cluster ID',
            selector: row => row.cluster_id,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.cluster_name,
            sortable: true,
            width: 'auto',
        },
        {
            name: 'DRS Status',
            selector: row => row.drs_enabled ? "Enable" : "Disable",
            sortable: true,
        },
        {
            name: 'DRS Behavior',
            selector: row => row.drs_behavior,
            sortable: true,
        },
        {
            name: 'VM Monitoring',
            selector: row => row.vm_monitoring === "vmMonitoringDisabled" ? "Disable" : row.vm_monitoring === "vmMonitoringEnabled" ? "Enabled" : "",
            sortable: true,
        },
        {
            name: 'VSAN Status',
            selector: row => row.vsan_enabled ? "Enable" : "Disable",
            sortable: true,
        },
        {
            name: 'Number of Hosts',
            selector: row => row.num_hosts,
            sortable: true,
        },
        {
            name: 'Effective Hosts',
            selector: row => row.num_effective_hosts,
            sortable: true,
        },
        // {
        //   name: 'Overall Status',
        //   selector: row => row.overall_status,
        //   sortable: true,
        // },
        {
            name: 'Overall Status',
            cell: row => {
                let bgColor = '';
                switch (row.overall_status?.toLowerCase()) {
                    case 'green':
                        bgColor = '#10b981'; // Emerald
                        break;
                    case 'yellow':
                        bgColor = '#facc15'; // Amber
                        break;
                    case 'red':
                        bgColor = '#ef4444'; // Red
                        break;
                    default:
                        bgColor = '#9ca3af'; // Gray
                }
                return (
                    <span style={{
                        backgroundColor: bgColor,
                        color: '#fff',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                    }}>
                        {row.overall_status || 'N/A'}
                    </span>
                );
            },
            sortable: true,
        },
        {
            name: 'View Hosts',
            cell: (row) => {

                const handleViewClick = () => {

                    // navigate('/hostinfo', { state: { hostInfo: row.hosts } });
                    navigate(`/hostinfo/${row.cluster_id}`, { state: { hostInfo: row.hosts } });
                };
                return (

                    <button
                        onClick={handleViewClick}
                        style={{
                            background: '#1d4ed8',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >

                        <AiOutlineEye style={{ marginRight: '5px' }} /> View

                    </button >
                );
            }
        },
    ];

    // Host data usage 
    let usedMemory = 0;
    let usedCores = 0;
    let totalMemory = 0;

    let totalCores = 0;
    let allVmData = [];

    if (cluster_data && Array.isArray(cluster_data)) {
        cluster_data.forEach(cluster_item => {
            cluster_item.hosts.forEach(host_item => {
                totalCores += host_item.num_cpu_cores || 0;
                totalMemory += (host_item.memory_gb || 0);

                host_item.vm_inventory.forEach(vm => {
                    usedCores += vm.cpu_count || 0;
                    usedMemory += (vm.memory_mb || 0) / 1024;


                    allVmData.push({
                        vm_id: vm.vm_id,
                        cpu_count: vm.cpu_count || 0,
                        memory_gb: (vm.memory_mb || 0) / 1024
                    });
                });
            });
        });
    }


    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Cluster Overview </h2>
            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
                justifyContent: 'space-between'
            }}>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <ResourcePieChart label="CPU" used={usedCores} total={totalCores} unit="cores" vmData={allVmData} dataKey="cpu_count" />
                </div>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <ResourcePieChart label="Memory" used={usedMemory} total={totalMemory} unit="GB" vmData={allVmData} dataKey="memory_gb" />
                </div>

            </div>
            <DataTable
                columns={columns}
                data={cluster_data}
                pagination
                highlightOnHover
                striped
                responsive
                customStyles={{
                    rows: {
                        style: {
                            minHeight: '60px',
                        },
                    },
                    headCells: {
                        style: {
                            backgroundColor: '#f3f4f6',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#111827'
                        },
                    },
                }}
            />
        </div>
    )
}
