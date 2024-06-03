import React from 'react';

const Insights = () => {
  const insights = [
    'Budget Pressure: Coaches hired in the same month as another coach earn 7% less.',
    'Seasonality: March pay periods have the highest average salary at $4,380.',
    'Trend: The highest-paid coach has a salary that is 35% higher than the average Coach salary.',
  ];

  return (
    <div className="insights-container">
      <h3>Insights</h3>
      <ul>
        {insights.map((insight, index) => (
          <li key={index}>{insight}</li>
        ))}
      </ul>
    </div>
  );
};

export default Insights;