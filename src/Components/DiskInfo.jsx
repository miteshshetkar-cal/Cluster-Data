import React from 'react'
import DataTable from 'react-data-table-component';
import { AiOutlineEye } from 'react-icons/ai';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
export const DiskInfo = ({ cluster_data }) => {
    const location = useLocation();
    const diskInfo = location.state?.diskInfo;
    const navigate = useNavigate();

    const { cluster_id: cluster_id, vm_id: vm_id } = useParams();
    const group = cluster_data.find(g => g.cluster_id === cluster_id);
    const host_ip = location.state?.host_ip;
    const host_info = group?.hosts.find(i => i.host_ip === host_ip);

    const vm_info = host_info?.vm_inventory.find(i => i.vm_id === vm_id);


    const columns = [
        {
            name: 'Sr No',
            cell: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Disk ID',
            selector: row => row.disk_id,
            sortable: true,
        },
        {
            name: 'Disk Label',
            selector: row => row.disk_label,
            sortable: true,
            width: 'auto',
        },
        {
            name: 'Disk Size(GB)',
            selector: row => row.disk_size_gb,
            sortable: true,
        },
        {
            name: 'Disk Type',
            selector: row => row.disk_type,
            sortable: true,
        },
        {
            name: 'Disk Storage Path',
            selector: row => row.disk_storage_path,
            sortable: true,
        },

    ];

    return (

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Disk Information</h2>
            <DataTable
                columns={columns}
                data={vm_info.disk}
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

            <button onClick={()=>{ navigate(`/hostinfo/${cluster_id}/vminfo/${host_ip}`, { state: { host_ip:host_ip } });} }>
                Back to VM Info
            </button>
        </div>

    )

}
