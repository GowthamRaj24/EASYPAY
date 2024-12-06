// TransactionHistory.js
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import Appbar from '../../components/Appbar/Appbar';
import './TransactionHistory.css';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionHistory = () => {
  const [userData] = useState({
    profileImage: '/default-logo.png',
    email: 'email@example.com'
  });

  const [walletBalance, setWalletBalance] = useState("Loading...");
  const [transactions] = useState([
    { id: 1, date: '2024-11-01', description: 'Grocery Shopping', amount: -50 },
    { id: 2, date: '2024-11-02', description: 'Salary', amount: 1500 },
    { id: 3, date: '2024-11-03', description: 'Coffee', amount: -5 },
  ]);

  const [view, setView] = useState("monthly");

  // Function to fetch wallet balance
  const fetchWalletBalance = async () => {
    try {
      const res = await axios.post('http://localhost:4001/transactions/checkBalance', { userId: "12345" }); // Replace "12345" with dynamic user ID if needed
      setWalletBalance(res.data.balance);
    } catch (err) {
      console.error("Error fetching wallet balance:", err);
      setWalletBalance("Error fetching balance");
    }
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  // Monthly data
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Balance',
        data: [200, 500, 300, 400, -150, 600, 350, 700, 400, 200, -100, 500], // Sample monthly balance data
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.2, // Smooth line
        fill: true,
      },
    ],
  };
    // Weekly data
    const weeklyData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Weekly Balance',
          data: [400, 300, 700, 200], // Sample weekly data
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.2,
          fill: true,
        },
      ],
    };
   // 7 Days data
   const dailyData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: '7-Day Balance',
        data: [50, -20, 30, -10, 60, 40, -5], // Sample 7-day data
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        tension: 0.2,
        fill: true,
      },
    ],
  };

   // Chart options
   const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: view === 'monthly' ? 'Month' : view === 'weekly' ? 'Week' : 'Day',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Balance',
        },
        beginAtZero: true,
      },
    },
  };

  const getData = () => {
    if (view === 'weekly') return weeklyData;
    if (view === 'daily') return dailyData;
    return monthlyData;
  };

  return (
    <>
      <Appbar />
      <div className="transaction-history-container">
        <aside className="sidebar">
          <div className="profileSection">
            <div className="profileImageWrapper">
              <img 
                src={userData.profileImage} 
                alt="User Profile"
                className="profileImage"
              />
            </div>
            <p className="profileEmail">{userData.email}</p>
          </div>
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active-link">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" activeClassName="active-link">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/transaction-history" activeClassName="active-link">Transfers</NavLink>
            </li>
            <li>
              <NavLink to="/Send" activeClassName="active-link">Send Money</NavLink>
            </li>
            <li>
              <NavLink to="/profile" activeClassName="active-link">Profile</NavLink>
            </li>
          </ul>
          {/* Add wallet balance below the profile link */}
          <div className="walletBalance">
            <p><strong>Wallet Balance:</strong></p>
            <p>${walletBalance}</p>
          </div>
        </aside>

        <main className="transaction-content">
          <div className="balance-over-time">
            <h2>Balance Over the Year</h2>
            <div className="button-group">
              <button onClick={() => setView('monthly')}>Monthly</button>
              <button onClick={() => setView('weekly')}>Weekly</button>
              <button onClick={() => setView('daily')}>7 Days</button>
            </div>
            <div className="chart-container">
              <Line data={getData()} options={chartOptions} />
            </div>
          </div>

          <h1>Transaction History</h1>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td className={transaction.amount < 0 ? 'negative' : 'positive'}>
                    ${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

export default TransactionHistory;
