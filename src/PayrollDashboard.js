import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styles from './App.css';
import Insights from './Insights';
import mockPayrollData from './mockPayrollData';

const accentColor = styles.accentColor;

// Helper function to get the default time period based on the current month
const getDefaultTimePeriod = (month) => {
  switch (month) {
    case 0:
    case 1:
    case 2:
      return 'monthly';
    case 3:
    case 4:
    case 5:
      return 'quarterly';
    case 6:
    case 7:
    case 8:
      return 'semi-annual';
    case 9:
    case 10:
    case 11:
      return 'yearly';
    default:
      return 'monthly';
  }
};

function PayrollDashboard() {
  const currentMonth = new Date().getMonth();
  const [timePeriod, setTimePeriod] = useState(getDefaultTimePeriod(currentMonth));
  const [filteredData, setFilteredData] = useState(mockPayrollData);
  const [totalPayroll, setTotalPayroll] = useState(0);
  const [averageSalary, setAverageSalary] = useState(0);

  useEffect(() => {
    const { totalPayroll, averageSalary } = filterDataByTimePeriod(timePeriod);
    setTotalPayroll(totalPayroll);
    setAverageSalary(averageSalary);
  }, [timePeriod]);

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const filterDataByTimePeriod = (period) => {
    const newData = mockPayrollData.filter(item => {
      const itemDate = new Date(item.payPeriod);
      const currentDate = new Date();

      switch (period) {
        case 'monthly':
          return itemDate.getMonth() === currentDate.getMonth() && itemDate.getFullYear() === currentDate.getFullYear();
        case 'quarterly':
          const currentQuarter = Math.floor(currentDate.getMonth() / 3);
          const itemQuarter = Math.floor(itemDate.getMonth() / 3);
          return itemQuarter === currentQuarter && itemDate.getFullYear() === currentDate.getFullYear();
        case 'semi-annual':
          const currentSemester = Math.floor(currentDate.getMonth() / 6);
          const itemSemester = Math.floor(itemDate.getMonth() / 6);
          return itemSemester === currentSemester && itemDate.getFullYear() === currentDate.getFullYear();
        case 'yearly':
          return itemDate.getFullYear() === currentDate.getFullYear();
        default:
          return true;
      }
    });

    const totalPayroll = newData.reduce((acc, item) => acc + item.salary, 0);
    const averageSalary = totalPayroll / newData.length;
    setFilteredData(newData);
    return { totalPayroll, averageSalary };
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Payroll Dashboard</h1>
        <select
          value={timePeriod}
          onChange={handleTimePeriodChange}
          className="time-period-select"
        >
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="semi-annual">Semi-annual</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="summary-tiles">
        <div className="tile">
          <h2>Total Payroll</h2>
          <p>${totalPayroll}</p>
        </div>
        <div className="tile">
          <h2>Average Salary</h2>
          <p>${averageSalary.toFixed(2)}</p>
        </div>
      </div>
      <Insights />
      
      <div className="chart-container">
        <ResponsiveContainer width="50%" height={400}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill={accentColor} />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="50%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="payPeriod" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="salary" stroke={accentColor} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PayrollDashboard;