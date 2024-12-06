// Chart.js (reusable chart component)
import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2'; // Import various chart types
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, Title } from 'chart.js';

// Register elements for different chart types
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, Title);

const ChartComponent = ({ type, data, options }) => {
    let ChartType;

    // Dynamically set the chart type based on props
    switch (type) {
        case 'doughnut':
            ChartType = Doughnut;
            break;
        case 'bar':
            ChartType = Bar;
            break;
        case 'line':
            ChartType = Line;
            break;
        default:
            ChartType = Doughnut; // Default to Doughnut if none specified
            break;
    }

    return <ChartType data={data} options={options} />;
};

export default ChartComponent;
