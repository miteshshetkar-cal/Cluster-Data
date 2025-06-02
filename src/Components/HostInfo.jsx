import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlineEye } from 'react-icons/ai';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import ResourcePieChart from './ResourcePieChart';

function HostInfo({ cluster_data }) {
    const location = useLocation();
    const navigate = useNavigate();

    const { cluster_id: cluster_id } = useParams();

    const group = cluster_data.find(g => g.cluster_id === cluster_id);

    const columns = [
        {
            name: 'Sr No',
            cell: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'IP Address',
            selector: row => row.host_ip,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.host_name,
            sortable: true,
            width: 'auto',
        },
        {
            name: 'CPU Cores',
            selector: row => row.num_cpu_cores,
            sortable: true,
        },
        {
            name: 'Memory(GB)',
            selector: row => row.memory_gb,
            sortable: true,
        },
        {
            name: 'CPU Spped(MHz)',
            selector: row => row.cpu_speed_mhz,
            sortable: true,
        },
        {
            name: 'CPU Model',
            selector: row => row.cpu_model,
            sortable: true,
        },
        {
            name: 'HBA',
            selector: row => row.num_hba,
            sortable: true,
        },
        {
            name: 'NICs',
            selector: row => row.num_nics,
            sortable: true,
        },
        {
            name: 'Vendor',
            selector: row => row.vendor,
            sortable: true,
        },
        {
            name: 'CPU Threads',
            selector: row => row.cpu_threads,
            sortable: true,
        },

        {
            name: 'Host Details',
            cell: (row) => {

                const handleViewClick = () => {

                    navigate(`/hostinfo/${cluster_id}/vminfo/${row.host_ip}`, { state: { hostInfo: row, host_ip: row.host_ip } });
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

                        <AiOutlineEye style={{ marginRight: '5px' }} />  Hosts Details

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

    if (group.hosts && Array.isArray(group.hosts)) {
        group.hosts.forEach(item => {
            totalMemory += (item.memory_gb || 0);
            totalCores += item.num_cpu_cores || 0;

            item.vm_inventory.forEach(vm => {
                usedMemory += (vm.memory_mb || 0) / 1024;
                usedCores += vm.cpu_count || 0;
            });
        });
    }


    return (

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Host Information for Cluster : <label style={{ color: '#2563eb' }}>{cluster_id}</label></h2>

            <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '20px',
                marginBottom: '20px',
                justifyContent: 'space-between'
            }}>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <ResourcePieChart label="CPU" used={usedCores} total={totalCores} unit="cores" />
                </div>
                <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
                    <ResourcePieChart label="Memory" used={usedMemory} total={totalMemory} unit="GB" />
                </div>
            </div>

            <DataTable
                columns={columns}
                data={group.hosts}
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
            <Link to="/">Back to Cluster Overview</Link>
        </div>

    );
}

export default HostInfo;
