import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef } from 'ag-grid-community';
import CustomContextMenu from './CustomContextMenu'; // Import your custom context menu
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import axiosInstance from '../../services/axiosInstance';
import axios from 'axios';
// import * as XLSX from 'xlsx';

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
  const [rowData, setRowData] = useState<RowData[]>([]);  // For static customer data
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; data: RowData | null } | null>(null);
  const [viewSelected, setViewSelected] = useState<string>('customer');  // Default view is 'customer'
  const [pricingRowData  , setPricingData] =useState<any[]>([]);
  const [data, setData] = useState([]);
  // Handle radio button changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setViewSelected(e.target.value);
    if(e.target.value === 'requests'){
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/api/serviceproviders/engagements/all?page=0&size=100');
          setRowData(response.data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };
      fetchData();
    } else if(e.target.value === 'pricing'){
      axios.get('http://3.110.168.35:3000/records')
  .then(function (response) {
    // handle success
    setPricingData(response.data)
  })
    }
  };

  // Fetch customer data
  useEffect(() => {
    if (viewSelected === 'customer') {
      const fetchData = async () => {
        try {
          const response = await axiosInstance.get('/api/customer/get-all-customers');
          setRowData(response.data);
        } catch (error) {
          console.error('There was a problem with the fetch operation:', error);
        }
      };

      fetchData();
    }
  }, [viewSelected]);

  const [columnDefsProvider] = useState([
    { headerName: "First Name", field: "firstName", sortable: true },
    { headerName: "Last Name", field: "lastName", sortable: true },
    { headerName: "Mobile No.", field: "mobileNo" },
    { headerName: "Email", field: "emailId" },
    { headerName: "Gender", field: "gender" },
    { headerName: "Role", field: "housekeepingRole" },
    { headerName: "Speciality", field: "speciality" },
    { headerName: "Rating", field: "rating" },
    { headerName: "Age", field: "age" },
    { headerName: "Location", field: "currentLocation" },
    // Add more columns as needed
  ]);

  const columnDefsPricing: ColDef<any>[] = [
    {
      headerName: "Service Category",
      field: "serviceCategory",
       rowGroup: true,  // Enable grouping by this column
      hide: true,      // Hide this column as it's just for grouping
    },
    {
      headerName: "Type",
      field: "type",
    },
    {
      headerName: "Service Type",
      field: "serviceType",
    },
    {
      headerName: "Sub Category",
      field: "subCategory",
    },
    {
      headerName: "People Range",
      field: "peopleRange",
    },
    {
      headerName: "Frequency",
      field: "frequency",
    },
    {
      headerName: "Price Per Month",
      field: "pricePerMonth",
      sortable: true,
      filter: true,
    },
  ];

  
  const columnDefsBooking : ColDef<any>[] = [
    { headerName: "Id", field: "id", sortable: true },
    { headerName: "Provider Id", field: "serviceProviderId", sortable: true },
    { headerName: "CustomerId", field: "customerId" },
    { headerName: "Start Date", field: "startDate" },
    { headerName: "End Date", field: "endDate" },
    { headerName: "Times", field: "timeslot" },
    { headerName: "Amount", field: "monthlyAmount" },
    { headerName: "Type", field: "bookingType" },
    { headerName: "Service", field: "serviceType" },
    { headerName: "isActive", field: "active" },
    // Add more columns as needed
  ];

  // Column definitions for both customer and provider
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
    { headerName: "Active", field: "active", sortable: true, filter: true, cellRenderer: (params) => (params.value ? "Yes" : "No") },
    { headerName: "KYC", field: "kyc", sortable: true, filter: true },
    {
      headerName: "Edit",
      cellRenderer: (params) => (
        <Button variant="contained" onClick={() => editRow(params.data)}>Edit</Button>
      ),
      sortable: false,
      filter: false,
    },
    {
      headerName: "Approve",
      cellRenderer: (params) => (
        <Button variant="contained" onClick={() => approveRow(params.data)}>Approve</Button>
      ),
      sortable: false,
      filter: false,
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Read the file using the FileReader API
    const reader = new FileReader();
    
    reader.onload = (evt) => {
      // Parse the Excel data using xlsx.utils
      const binaryStr = evt?.target?.result;
      // const wb = XLSX.read(binaryStr, { type: 'binary' });

      // Assuming we want the first sheet
      // const ws = wb.Sheets[wb.SheetNames[0]];

      // Convert the sheet to JSON (array of objects)
      // const jsonData : any = XLSX.utils.sheet_to_json(ws);
      // setData(jsonData);
        // Set the JSON data to state
    };

    // Read the file as binary string
    reader.readAsBinaryString(file);
  };

  // Datasource for infinite scrolling in 'provider' view
  const datasource = {
    getRows: async (params) => {
      const startRow = params.startRow;
      const endRow = params.endRow;
      const size = endRow - startRow;

      try {
        const response = await fetch(`http://43.205.212.94:8080/api/serviceproviders/serviceproviders/all?start=${startRow}&size=${size}`);
        const data = await response.json();

        console.log('API Response:', data);


        // Simulate delay for API response
        setTimeout(() => {
          const lastRow = data.totalElements <= endRow ? startRow + data.content.length : -1;
          params.successCallback(data, lastRow);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        params.failCallback();  // Trigger failure callback
      }
    },
  };

  const datasourceProvider = {
    getRows: async (params) => {
      const startRow = params.startRow;
      const endRow = params.endRow;
      const size = endRow - startRow;

      try {
        const response = await fetch(`http://43.205.212.94:8080/api/serviceproviders/engagements/all?page=0&size=100`);
        const data = await response.json();

        console.log('API Response:', data);


        // Simulate delay for API response
        setTimeout(() => {
          const lastRow = data.totalElements <= endRow ? startRow + data.content.length : -1;
          params.successCallback(data, lastRow);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        params.failCallback();  // Trigger failure callback
      }
    },
  };

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
    <div style={{ display: 'block', height: '100%', marginTop: '30px' , width: '100%' }}>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChange}
        >
          <FormControlLabel value="customer" control={<Radio />} label="Customer" />
          <FormControlLabel value="provider" control={<Radio />} label="Provider" />
          <FormControlLabel value="requests" control={<Radio />} label="Requests" />
          <FormControlLabel value="pricing" control={<Radio />} label="Pricing" />
          <FormControlLabel value="excel" control={<Radio />} label=" upload  excel" />
          

        </RadioGroup>
      </FormControl>

      {viewSelected === 'customer' && (
        <div style={{ height: '70%', width: '100%' }}>
          <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <AgGridReact<RowData>
              columnDefs={columnDefs}
              rowData={rowData}  // Static data for 'customer'
              onCellContextMenu={onCellContextMenu}
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
      )}

      {viewSelected === 'provider' && (
        <div style={{ height: '70%', width: '100%' }}>
          <div className="ag-theme-alpine" style={{ height: '100%'}}>
            <AgGridReact
              columnDefs={columnDefsProvider}
              rowModelType="infinite"
              cacheBlockSize={10}
              maxBlocksInCache={5}
              datasource={datasource}
            />
          </div>
        </div>
      )}
      {viewSelected === 'requests' && (
        <div style={{ height: '70%', width: '100%' }}>
          <div className="ag-theme-alpine" style={{ height: '100%'}}>
            <AgGridReact<RowData>
              columnDefs={columnDefsBooking}
              rowData={rowData}
            />
          </div>
        </div>
      )}
      {viewSelected === 'pricing' && (
        <div style={{ height: '70%', width: '100%' }}>
          <div className="ag-theme-alpine" style={{ height: '100%'}}>
          <AgGridReact
        columnDefs={columnDefsPricing}
        rowData={pricingRowData}
        groupDefaultExpanded={-1}  // Expand all groups by default
        autoGroupColumnDef={{
          headerName: "Group",
          field: "serviceCategory",
          cellRendererParams: {
            suppressCount: true,  // Don't show the count of items in each group
          },
        }}
      />
          </div>
        </div>
      )}
      {viewSelected === 'excel' && (
        <div style={{ height: '70%', width: '100%' }}>
          <div>
      <h1>Excel File Reader</h1>
      
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
      />
      
      {data.length > 0 && (
        <div>
          <h2>Excel Data:</h2>
          <table border={1}>
            <thead>
              <tr>
                {/* Assuming first row contains column headers */}
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value : any, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
