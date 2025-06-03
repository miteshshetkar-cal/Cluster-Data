import { useEffect, useState } from 'react';
import './App.css';
import DataTable from 'react-data-table-component';
import { AiOutlineEye } from 'react-icons/ai';
import HostInfo from './Components/HostInfo';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DomainInfo } from './Components/DomainInfo';
import { VmInfo } from './Components/VmInfo';
import { NetworkInfo } from './Components/NetworkInfo';
import { DiskInfo } from './Components/DiskInfo';
function App() {
  const [cluster, setCluster] = useState([{
    "cluster_name": "cmsa-prod-10g-1",
    "cluster_id": "domain-c7265",
    "drs_enabled": false,
    "drs_behavior": "fullyAutomated",
    "ha_enabled": false,
    "vm_monitoring": "vmMonitoringDisabled",
    "vsan_enabled": false,
    "num_hosts": 0,
    "num_effective_hosts": 0,
    "overall_status": "green",
    "hosts": []
  },
  {
    "cluster_name": "temp-qa-04-cluster-ip1",
    "cluster_id": "domain-c10155",
    "drs_enabled": false,
    "drs_behavior": "fullyAutomated",
    "ha_enabled": false,
    "vm_monitoring": "vmMonitoringDisabled",
    "vsan_enabled": false,
    "num_hosts": 3,
    "num_effective_hosts": 0,
    "overall_status": "yellow",
    "hosts": [
      {
        "host_name": "temp-qa-04-esxi-01.cisco.com",
        "host_ip": "192.78.33.159",
        "num_cpu_cores": 16,
        "memory_gb": 255,
        "cpu_speed_mhz": 1695,
        "cpu_model": "Intel(R) Xeon(R) CPU E5-2609 v4 @ 1.70GHz",
        "num_hba": 2,
        "num_nics": 8,
        "vendor": "Cisco Systems Inc",
        "cpu_threads": 16,
        "vm_inventory": [
          {
            "vm_name": "cntrlvm-FCH2040V12R",
            "vm_id": "vm-10169",
            "host_name": "temp-qa-04-esxi-01.cisco.com",
            "host_id": "host-10167",
            "cpu_count": 8,
            "cpu_cores_per_socket": 1,
            "memory_mb": 73728,
            "categories_tags": {},
            "disk": [
              {
                "disk_id": 2000,
                "disk_label": "Hard disk 1",
                "disk_size_gb": 2,
                "disk_type": "HDD",
                "disk_storage_path": "[SpringpathDS-FCH2040V12R] cntrlvm-FCH2040V12R/cntrlvm-FCH2040V12R_1.vmdk"
              },
              {
                "disk_id": 2001,
                "disk_label": "Hard disk 2",
                "disk_size_gb": 100,
                "disk_type": "HDD",
                "disk_storage_path": "[SpringpathDS-FCH2040V12R] cntrlvm-FCH2040V12R/cntrlvmBoot.vmdk"
              }
            ],
            "network": [
              {
                "network_name": "Storage Controller Management Network",
                "network_id": 4000,
                "mac_address": "00:0c:29:83:e7:16",
                "ip_address": "192.78.33.167"
              },
              {
                "network_name": "Storage Controller Data Network",
                "network_id": 4001,
                "mac_address": "00:0c:29:83:e7:20",
                "ip_address": "169.254.68.3"
              },
              {
                "network_name": "Storage Controller Replication Network",
                "network_id": 4002,
                "mac_address": "00:0c:29:83:e7:2a",
                "ip_address": "192.168.5.2"
              },
              {
                "network_name": "Storage Controller ISCSI Primary",
                "network_id": 4003,
                "mac_address": "00:0c:29:83:e7:34",
                "ip_address": "192.168.5.18"
              },
              {
                "network_name": "Storage Controller ISCSI Secondary",
                "network_id": 4004,
                "mac_address": "00:0c:29:83:e7:3e",
                "ip_address": "N/A"
              }
            ],
            "os_type": "Ubuntu Linux (64-bit)",
            "os_version": "Ubuntu Linux (64-bit)",
            "vm_tools_status": "toolsOk",
            "power_state": "poweredOn",
            "notes": null
          },
          {
            "vm_name": "vCLS (134)",
            "vm_id": "vm-10173",
            "host_name": "temp-qa-04-esxi-01.cisco.com",
            "host_id": "host-10167",
            "cpu_count": 1,
            "cpu_cores_per_socket": 1,
            "memory_mb": 128,
            "categories_tags": {},
            "disk": [
              {
                "disk_id": 2000,
                "disk_label": "Hard disk 1",
                "disk_size_gb": 2,
                "disk_type": "SSD",
                "disk_storage_path": "[SpringpathDS-FCH2040V12R] vCLS (134)/vCLS (134).vmdk"
              }
            ],
            "network": [],
            "os_type": "Other 3.x or later Linux (64-bit)",
            "os_version": "Other 3.x or later Linux (64-bit)",
            "vm_tools_status": "toolsNotRunning",
            "power_state": "poweredOff",
            "notes": "vSphere Cluster Service VM is deployed from an OVA with a minimal installed profile of PhotonOS. vSphere Cluster Service manages the resources, power state and availability of these VMs. vSphere Cluster Service VMs are required for maintaining the health and availability of vSphere Cluster Service. Any impact on the power state or resources of these VMs might degrade the health of the vSphere Cluster Service and cause vSphere DRS to cease operation for the cluster."
          }
        ]
      },
      {
        "host_name": "temp-qa-04-esxi-03.cisco.com",
        "host_ip": "192.78.33.161",
        "num_cpu_cores": 16,
        "memory_gb": 255,
        "cpu_speed_mhz": 1695,
        "cpu_model": "Intel(R) Xeon(R) CPU E5-2609 v4 @ 1.70GHz",
        "num_hba": 2,
        "num_nics": 8,
        "vendor": "Cisco Systems Inc",
        "cpu_threads": 16,
        "vm_inventory": [
          {
            "vm_name": "cntrlvm-FCH2040V12J",
            "vm_id": "vm-10165",
            "host_name": "temp-qa-04-esxi-03.cisco.com",
            "host_id": "host-10157",
            "cpu_count": 8,
            "cpu_cores_per_socket": 1,
            "memory_mb": 73728,
            "categories_tags": {
              "nutanix-pc": [
                "nutanix-pc"
              ]
            },
            "disk": [
              {
                "disk_id": 2000,
                "disk_label": "Hard disk 1",
                "disk_size_gb": 2,
                "disk_type": "HDD",
                "disk_storage_path": "[SpringpathDS-FCH2040V12J] cntrlvm-FCH2040V12J/cntrlvm-FCH2040V12J_1.vmdk"
              },
              {
                "disk_id": 2001,
                "disk_label": "Hard disk 2",
                "disk_size_gb": 100,
                "disk_type": "HDD",
                "disk_storage_path": "[SpringpathDS-FCH2040V12J] cntrlvm-FCH2040V12J/cntrlvmBoot.vmdk"
              }
            ],
            "network": [
              {
                "network_name": "Storage Controller Management Network",
                "network_id": 4000,
                "mac_address": "00:0c:29:7b:64:e3",
                "ip_address": "192.78.33.169"
              },
              {
                "network_name": "Storage Controller Data Network",
                "network_id": 4001,
                "mac_address": "00:0c:29:7b:64:ed",
                "ip_address": "169.254.68.7"
              },
              {
                "network_name": "Storage Controller Replication Network",
                "network_id": 4002,
                "mac_address": "00:0c:29:7b:64:f7",
                "ip_address": "192.168.5.4"
              },
              {
                "network_name": "Storage Controller ISCSI Primary",
                "network_id": 4003,
                "mac_address": "00:0c:29:7b:64:01",
                "ip_address": "192.168.5.20"
              },
              {
                "network_name": "Storage Controller ISCSI Secondary",
                "network_id": 4004,
                "mac_address": "00:0c:29:7b:64:0b",
                "ip_address": "N/A"
              }
            ],
            "os_type": "Ubuntu Linux (64-bit)",
            "os_version": "Ubuntu Linux (64-bit)",
            "vm_tools_status": "toolsOk",
            "power_state": "poweredOn",
            "notes": null
          },
          {
            "vm_name": "vCLS (133)",
            "vm_id": "vm-10166",
            "host_name": "temp-qa-04-esxi-03.cisco.com",
            "host_id": "host-10157",
            "cpu_count": 1,
            "cpu_cores_per_socket": 1,
            "memory_mb": 128,
            "categories_tags": {},
            "disk": [
              {
                "disk_id": 2000,
                "disk_label": "Hard disk 1",
                "disk_size_gb": 2,
                "disk_type": "SSD",
                "disk_storage_path": "[SpringpathDS-FCH2040V12J] vCLS (133)/vCLS (133).vmdk"
              }
            ],
            "network": [],
            "os_type": "Other 3.x or later Linux (64-bit)",
            "os_version": "Other 3.x or later Linux (64-bit)",
            "vm_tools_status": "toolsOk",
            "power_state": "poweredOn",
            "notes": "vSphere Cluster Service VM is deployed from an OVA with a minimal installed profile of PhotonOS. vSphere Cluster Service manages the resources, power state and availability of these VMs. vSphere Cluster Service VMs are required for maintaining the health and availability of vSphere Cluster Service. Any impact on the power state or resources of these VMs might degrade the health of the vSphere Cluster Service and cause vSphere DRS to cease operation for the cluster."
          }
        ]
      },
      {
        "host_name": "temp-qa-04-esxi-02.cisco.com",
        "host_ip": "192.78.33.160",
        "num_cpu_cores": 16,
        "memory_gb": 255,
        "cpu_speed_mhz": 1695,
        "cpu_model": "Intel(R) Xeon(R) CPU E5-2609 v4 @ 1.70GHz",
        "num_hba": 2,
        "num_nics": 8,
        "vendor": "Cisco Systems Inc",
        "cpu_threads": 16,
        "vm_inventory": [
          {
            "vm_name": "vCLS (135)",
            "vm_id": "vm-10174",
            "host_name": "temp-qa-04-esxi-02.cisco.com",
            "host_id": "host-10170",
            "cpu_count": 1,
            "cpu_cores_per_socket": 1,
            "memory_mb": 128,
            "categories_tags": {},
            "disk": [
              {
                "disk_id": 2000,
                "disk_label": "Hard disk 1",
                "disk_size_gb": 2,
                "disk_type": "SSD",
                "disk_storage_path": "[SpringpathDS-FCH2040V121] vCLS (135)/vCLS (135).vmdk"
              }
            ],
            "network": [],
            "os_type": "Other 3.x or later Linux (64-bit)",
            "os_version": "Other 3.x or later Linux (64-bit)",
            "vm_tools_status": "toolsOk",
            "power_state": "poweredOn",
            "notes": "vSphere Cluster Service VM is deployed from an OVA with a minimal installed profile of PhotonOS. vSphere Cluster Service manages the resources, power state and availability of these VMs. vSphere Cluster Service VMs are required for maintaining the health and availability of vSphere Cluster Service. Any impact on the power state or resources of these VMs might degrade the health of the vSphere Cluster Service and cause vSphere DRS to cease operation for the cluster."
          },
          {
            "vm_name": "cntrlvm-FCH2040V121",
            "vm_id": "vm-10172",
            "host_name": "temp-qa-04-esxi-02.cisco.com",
            "host_id": "host-10170",
            "cpu_count": 8,
            "cpu_cores_per_socket": 1,
            "memory_mb": 73728,
            "categories_tags": {},
            "disk": [
              {
                "disk_id": 2000,
                "disk_label": "Hard disk 1",
                "disk_size_gb": 2,
                "disk_type": "HDD",
                "disk_storage_path": "[SpringpathDS-FCH2040V121] cntrlvm-FCH2040V121/cntrlvm-FCH2040V121_1.vmdk"
              },
              {
                "disk_id": 2001,
                "disk_label": "Hard disk 2",
                "disk_size_gb": 100,
                "disk_type": "HDD",
                "disk_storage_path": "[SpringpathDS-FCH2040V121] cntrlvm-FCH2040V121/cntrlvmBoot.vmdk"
              }
            ],
            "network": [
              {
                "network_name": "Storage Controller Management Network",
                "network_id": 4000,
                "mac_address": "00:0c:29:e1:2c:63",
                "ip_address": "192.78.33.168"
              },
              {
                "network_name": "Storage Controller Data Network",
                "network_id": 4001,
                "mac_address": "00:0c:29:e1:2c:6d",
                "ip_address": "169.254.68.5"
              },
              {
                "network_name": "Storage Controller Replication Network",
                "network_id": 4002,
                "mac_address": "00:0c:29:e1:2c:77",
                "ip_address": "192.168.5.3"
              },
              {
                "network_name": "Storage Controller ISCSI Primary",
                "network_id": 4003,
                "mac_address": "00:0c:29:e1:2c:81",
                "ip_address": "192.168.5.19"
              },
              {
                "network_name": "Storage Controller ISCSI Secondary",
                "network_id": 4004,
                "mac_address": "00:0c:29:e1:2c:8b",
                "ip_address": "N/A"
              }
            ],
            "os_type": "Ubuntu Linux (64-bit)",
            "os_version": "Ubuntu Linux (64-bit)",
            "vm_tools_status": "toolsOk",
            "power_state": "poweredOn",
            "notes": null
          }
        ]
      }
    ]
  }]);

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
      minWidth: 'auto',
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
      cell: (row) => (
        <button
          onClick={() => handleViewHosts(row)}
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
        </button>
      ),
    },
  ];





  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DomainInfo cluster_data={cluster} />} />
        <Route path="hostinfo/:cluster_id" element={<HostInfo cluster_data={cluster} />} />
        <Route path="hostinfo/:cluster_id/vminfo/:host_ip" element={<VmInfo cluster_data={cluster} />} />
        {/* <Route path="hostinfo/:cluster_id/vminfo/:vm_id/diskinfo" element={<DiskInfo cluster_data={cluster}/>} />
            <Route path="hostinfo/:cluster_id/vminfo/:vm_id/networkinfo" element={<NetworkInfo cluster_data={cluster}/>} /> */}

      </Routes>
    </BrowserRouter>
    // </div>

  );
}

export default App;