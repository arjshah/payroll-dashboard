import React, { useState } from 'react';
import mockPayrollData from './mockPayrollData';
import { CSVLink } from 'react-csv';

function RawData() {
  const [data, setData] = useState(mockPayrollData);
  const [search, setSearch] = useState('');

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    filterData(event.target.value);
  };

  const filterData = (searchTerm) => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = mockPayrollData.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setData(filteredData);
  };

  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Role', key: 'role' },
    { label: 'Salary', key: 'salary' },
    { label: 'Pay Period', key: 'payPeriod' },
  ];

  return (
    <div className="raw-data-container">
      <h1>Raw Payroll Data</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search by any field..."
        className="raw-data-search"
      />
      <table className="raw-data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Pay Period</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>${item.salary}</td>
              <td>{item.payPeriod}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CSVLink data={data} headers={headers} filename="payroll-data.csv" className="export-csv">
        Export to CSV
      </CSVLink>
    </div>
  );
}

export default RawData;