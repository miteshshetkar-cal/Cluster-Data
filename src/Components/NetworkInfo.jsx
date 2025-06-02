import React from 'react'
import DataTable from 'react-data-table-component';
import { AiOutlineEye } from 'react-icons/ai';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
export const NetworkInfo = ({ cluster_data }) => {
    const location = useLocation();
    const networkInfo = location.state?.networkInfo;
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
            name: 'Network ID',
            selector: row => row.network_id,
            sortable: true,
        },
        {
            name: 'Network Name',
            selector: row => row.network_name,
            sortable: true,
            width: 'auto',
        },
        {
            name: 'MAC Address',
            selector: row => row.mac_address,

        },
        {
            name: 'IP Address',
            selector: row => row.ip_address,

        },
    ];
    // const diskColumns = [
    //     { name: 'Disk ID', selector: row => row.disk_id },
    //     { name: 'Disk Label', selector: row => row.disk_label },
    //     { name: 'Disk Size(GB)', selector: row => row.disk_size_gb },
    //     { name: 'Disk Type', selector: row => row.disk_type },
    //     { name: 'Storage Path', selector: row => row.disk_storage_path },
    // ];

    // const networkColumns = [
    //     { name: 'Network ID', selector: row => row.network_id },
    //     { name: 'Network Name', selector: row => row.network_name },
    //     { name: 'MAC Address', selector: row => row.mac_address },
    //     { name: 'IP Address', selector: row => row.ip_address },
    // ];

    return (

        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ marginBottom: '20px', color: '#1f2937' }}>Network Information</h2>
            <DataTable
                columns={columns}
                data={vm_info.network}
                // data={networkInfo}
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

            <button onClick={() => { navigate(`/hostinfo/${cluster_id}/vminfo/${host_ip}`, { state: { host_ip: host_ip } }); }}>
                Back to VM Info
            </button>
        </div>

    )

}
