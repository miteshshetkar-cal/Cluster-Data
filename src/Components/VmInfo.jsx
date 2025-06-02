import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlineEye } from 'react-icons/ai';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import HostCpuUsageChart from './HostCpuUsageChart';
import HostMemoryUsageChart from './HostMemoryUsageChart';
import ResourcePieChart from './ResourcePieChart';

export const VmInfo = ({ cluster_data }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cluster_id } = useParams();

    const group = cluster_data.find(g => g.cluster_id === cluster_id);
    const host_ip = location.state?.host_ip;
    const host_info = group?.hosts.find(i => i.host_ip === host_ip);

    const [expandedRow, setExpandedRow] = useState(null);

    const toggleExpand = (vm_id) => {
        setExpandedRow(prev => (prev === vm_id ? null : vm_id));
    };

    const columns = [
        {
            name: 'Sr No',
            cell: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'VM ID',
            selector: row => row.vm_id,
            sortable: true,
            width: '120px',
            wrap: true,
        },
        {
            name: 'Name',
            selector: row => row.vm_name,
            sortable: true,
            width: '160px',
            wrap: true,
        },
        {
            name: 'Host Name',
            selector: row => row.host_name,
            sortable: true,
            width: '200px',
            wrap: true,
        },
        {
            name: 'Host ID',
            selector: row => row.host_id,
            sortable: true,
            width: '140px',
            wrap: true,
        },
        {
            name: 'CPU Count',
            selector: row => row.cpu_count,
            sortable: true,
            width: '120px',
        },
        {
            name: 'CPU Cores per Socket',
            selector: row => row.cpu_cores_per_socket,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Memory(MB)',
            selector: row => row.memory_mb,
            sortable: true,
            width: '120px',
        },
        {
            name: 'OS Type',
            selector: row => row.os_type,
            sortable: true,
            width: '160px',
            wrap: true,
        },
        {
            name: 'OS Version',
            selector: row => row.os_version,
            sortable: true,
            width: '160px',
            wrap: true,
        },
        {
            name: 'Tools Status',
            selector: row => row.vm_tools_status,
            sortable: true,
            width: '120px',
            wrap: true,
        },
        {
            name: 'Power State',
            selector: row => row.power_state,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Notes',
            selector: row => row.notes ? row.notes : "Null",
            sortable: true,
            width: '200px',
            wrap: true,
            cell: row => (
                <div style={{
                    maxHeight: '100px',      // You can adjust this height
                    overflowY: 'auto',
                    padding: '5px',
                    whiteSpace: 'normal',
                }}>
                    {row.notes ? row.notes : "Null"}
                </div>
            )
        },

        // {
        //     name: 'Disk & Network Info',
        //     cell: (row) => (
        //         <button
        //             onClick={() => toggleExpand(row.vm_id)}
        //             style={{
        //                 background: '#1d4ed8',
        //                 color: 'white',
        //                 border: 'none',
        //                 borderRadius: '5px',
        //                 padding: '5px 10px',
        //                 cursor: 'pointer',
        //                 display: 'flex',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <AiOutlineEye style={{ marginRight: '5px' }} />
        //             {expandedRow === row.vm_id ? 'Hide Info' : 'View Info'}
        //         </button>
        //     ),
        //     $ignoreRowClick: true,
        //     $allowOverflow: true,
        //     $button: true,
        //     width: '180px',
        // }
    ];

    const diskColumns = [
        { name: 'Disk ID', selector: row => row.disk_id, wrap: true },
        { name: 'Disk Label', selector: row => row.disk_label, wrap: true },
        { name: 'Disk Size(GB)', selector: row => row.disk_size_gb },
        { name: 'Disk Type', selector: row => row.disk_type, wrap: true },
        { name: 'Storage Path', selector: row => row.disk_storage_path, wrap: true },
    ];

    const networkColumns = [
        { name: 'Network ID', selector: row => row.network_id, wrap: true },
        { name: 'Network Name', selector: row => row.network_name, wrap: true },
        { name: 'MAC Address', selector: row => row.mac_address, wrap: true },
        { name: 'IP Address', selector: row => row.ip_address, wrap: true },
    ];

    const ExpandableRow = ({ data }) => (
        <div style={{ padding: '15px', backgroundColor: '#f9fafb' }}>
            <h4 style={{ marginBottom: '10px' }}>Disk Information</h4>
            <DataTable
                columns={diskColumns}
                data={data.disk || []}
                dense
                noHeader
                highlightOnHover
                striped
                customStyles={{
                    rows: { style: { minHeight: '60px' } },
                    headCells: {
                        style: {
                            backgroundColor: '#f3f4f6',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#111827',
                            whiteSpace: 'normal',
                        },
                    },
                    cells: {
                        style: {
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            minHeight: '50px'
                        },
                    },
                }}
            />
            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Network Information</h4>
            <DataTable
                columns={networkColumns}
                data={data.network || []}
                dense
                noHeader
                highlightOnHover
                striped
                customStyles={{
                    rows: { style: { minHeight: '60px' } },
                    headCells: {
                        style: {
                            backgroundColor: '#f3f4f6',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#111827',
                            whiteSpace: 'normal',
                        },
                    },
                }}
            />
        </div>
    );



    // Host Usage
    let usedMemory = 0;
    let usedCores = 0;

    if (host_info.vm_inventory && Array.isArray(host_info.vm_inventory)) {
        host_info.vm_inventory.forEach(vm => {
            usedMemory += (vm.memory_mb || 0) / 1024;
            usedCores += vm.cpu_count || 0;
        });
    }



    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Host Details</h2>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
                justifyContent: 'space-between'
            }}>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <ResourcePieChart label="CPU" used={usedCores} total={host_info.num_cpu_cores} unit="cores" />
                </div>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <ResourcePieChart label="Memory" used={usedMemory} total={host_info.memory_gb} unit="GB" />
                </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
                <DataTable
                    columns={columns}
                    data={host_info.vm_inventory}
                    pagination
                    highlightOnHover
                    striped
                    responsive
                    expandableRows
                    expandableRowsComponent={ExpandableRow}
                    expandableRowExpanded={(row) => row.vm_id === expandedRow}
                    customStyles={{
                        rows: { style: { minHeight: '60px' } },
                        headCells: {
                            style: {
                                backgroundColor: '#f3f4f6',
                                fontWeight: 'bold',
                                fontSize: '14px',
                                color: '#111827',
                                whiteSpace: 'normal',
                            },
                        },
                        cells: {
                            style: {
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                            },
                        },
                    }}
                />
            </div>

            <Link to={`/hostinfo/${cluster_id}`} style={{ marginTop: '20px', display: 'inline-block' }}>← Back to Host Info</Link>
        </div>
    );
};
