/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomContextMenu from './CustomContextMenu'; // Import your custom context menu
import { Button } from '@mui/material';
import axiosInstance from '../../services/axiosInstance';

interface RowData {
    customerId: number;
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNo: number;
    alternateNo: number;
    emailId: string;
    gender: string;
    buildingName: string;
    locality: string;
    street: string;
    pincode: number;
    currentLocation: string;
    enrolledDate: string;
    profilePic: string;
    idNo: string;
    active: boolean;
    kyc: string;
}

const Admin: React.FC = () => {
    const [rowData, setRowData] = useState<RowData[]>([]);
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; data: RowData | null } | null>(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://43.205.212.94:8080/api/customer/get-all-customers");
    //             if (!response.ok) {
    //                 throw new Error("Network response was not ok");
    //             }
    //             const data = await response.json();
    //             setRowData(data);
    //         } catch (error) {
    //             console.error("There was a problem with the fetch operation:", error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Using axiosInstance to make a GET request
            const response = await axiosInstance.get('/api/customer/get-all-customers');
      
            // Assuming the response contains the data in the desired format
            setRowData(response.data);
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
        };
      
        fetchData();
      }, []);
      
    const columnDefs: ColDef<RowData>[] = [
        { headerName: "Customer ID", field: "customerId", sortable: true, filter: true },
        { headerName: "First Name", field: "firstName", sortable: true, filter: true },
        { headerName: "Middle Name", field: "middleName", sortable: true, filter: true },
        { headerName: "Last Name", field: "lastName", sortable: true, filter: true },
        { headerName: "Mobile No", field: "mobileNo", sortable: true, filter: true },
        { headerName: "Alternate No", field: "alternateNo", sortable: true, filter: true },
        { headerName: "Email ID", field: "emailId", sortable: true, filter: true },
        { headerName: "Gender", field: "gender", sortable: true, filter: true },
        { headerName: "Building Name", field: "buildingName", sortable: true, filter: true },
        { headerName: "Locality", field: "locality", sortable: true, filter: true },
        { headerName: "Street", field: "street", sortable: true, filter: true },
        { headerName: "Pincode", field: "pincode", sortable: true, filter: true },
        { headerName: "Current Location", field: "currentLocation", sortable: true, filter: true },
        { headerName: "Enrolled Date", field: "enrolledDate", sortable: true, filter: true },
        { headerName: "Profile Pic", field: "profilePic", sortable: true, filter: true },
        { headerName: "ID No", field: "idNo", sortable: true, filter: true },
        { headerName: "Active", field: "active", sortable: true, filter: true, cellRenderer: (params) => params.value ? "Yes" : "No" },
        { headerName: "KYC", field: "kyc", sortable: true, filter: true },
        {
            headerName: "Edit",
            cellRenderer: (params) => (
                
                <Button variant="contained" onClick={() => editRow(params.data)}>Edit for {params.data.firstName}</Button>
            ),
            sortable: false,
            filter: false,
        },
        {
            headerName: "Approve",
            cellRenderer: (params) => (
                <Button variant="contained" onClick={() => editRow(params.data)}>Approve for {params.data.firstName}</Button>
            ),
            sortable: false,
            filter: false,
        }
    ];

    const editRow = (rowData: RowData) => {
        console.log("Editing row:", rowData);
        // Add your editing logic here (e.g., open a modal)
    };

    const approveRow = (rowData: RowData) => {
        console.log("Approving row:", rowData);
        // Add your approval logic here (e.g., send a request to the server)
    };

    const onCellContextMenu = (event: any) => {
        event.preventDefault(); // Prevent default context menu
        setContextMenu({ x: event.clientX, y: event.clientY, data: event.data });
    };

    const closeContextMenu = () => {
        setContextMenu(null);
    };

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
                <AgGridReact<RowData>
                    columnDefs={columnDefs}
                    rowData={rowData}
                    onCellContextMenu={onCellContextMenu} // Handle right-click
                />
                {contextMenu && (
                    <CustomContextMenu 
                        position={{ x: contextMenu.x, y: contextMenu.y }} 
                        data={contextMenu.data} 
                        onClose={closeContextMenu} 
                    />
                )}
            </div>
        </div>
    );
};

export default Admin;
