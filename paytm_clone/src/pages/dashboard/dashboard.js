import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import Appbar from "../../components/Appbar/Appbar";
import Heading from "../../components/Heading/Heading";
import ContactBox from "../../components/ContactBox/ContactBox";
import ChartComponent from "../../components/Charts/Chart";
import { Link } from "react-router-dom";


import axios from "axios";
import "./dashboard.css";


const Dashboard = () => {
    const [userData, setUserData] = useState({});
    const [walletBalance, setWalletBalance] = useState("Loading...");
    const [latestTransactions, setLatestTransactions] = useState([]);
    const [filter, setFilter] = useState("all");
    const [listedUsers, setListedUsers] = useState([]);
    const [myId, setMyId] = useState("");
    
    const [contactsFilter, setContactsFilter] = useState(""); // Contact filter state
    const [chartData, setChartData] = useState(null); // Chart data state

    const fetchUserData = async () => {
        try {
            const x = localStorage.getItem("token");
            const token = x.split(" ")[1];
            const response = await axios.post(
                "http://localhost:4001/users/userData",
                { token: token }
            );
            setUserData(response.data);
            setMyId(response.data._id);

            if (response.data.transactions) {
                setLatestTransactions(response.data.transactions.slice(0, 3));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchContacts = async () => {
        try {
            const res = await axios.post('http://localhost:4001/contacts/searchContacts', { filter: contactsFilter });
            setListedUsers(res.data.list);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [contactsFilter]);

    useEffect(() => {
        // Simulate fetching chart data (replace this with actual API or data source)
        const fetchedData = {
            labels: ["January", "February", "March", "April"], // Example months or transaction periods
            datasets: [
                {
                    label: "Transactions", // Label for the chart
                    data: [65, 59, 80, 81], // Example data points (e.g., transaction amounts or the amount spent in the repsective month something of your choice doesnt matter)
                    fill: false,
                    borderColor: "rgb(75, 192, 192)", // Line color
                    tension: 0.1,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)", // Color for January
                        "rgba(54, 162, 235, 0.2)", // Color for February
                        "rgba(255, 206, 86, 0.2)", // Color for March
                        "rgba(75, 192, 192, 0.2)", // Color for April
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)", // Border for January
                        "rgba(54, 162, 235, 1)", // Border for February
                        "rgba(255, 206, 86, 1)", // Border for March
                        "rgba(75, 192, 192, 1)", // Border for April
                    ],
                    borderWidth: 1,
                },
            ],
            options: {
                maintainAspectRatio: false, // Allow flexibility with aspect ratio
                responsive: true,           // Ensure the chart is responsive
            },
        };
        setChartData(fetchedData);
    }, []);

    return (
        <>
            <Appbar />
            <div className="dashboardBackground">
                <div className="dashboardLayout">
  {/* Sidebar */}
  <div className="sidebar">
    <div className="profileSection">
        <div className="profileImageWrapper">
            <img
                src={userData.profileImage || "/default-logo.png"}
                alt="User Profile"
                className="profileImage"
            />
        </div>
        <p className="profileEmail">{userData.email || "email@example.com"}</p>
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
</div>

                    {/* Main content area */}
                    <div className="dashboardContent">
                        <h2 className="sectionTitle">Services</h2> 
                        <div className="serviceSearchBarWrapper">
                            <input 
                                type="text"
                                className="serviceSearchBar"
                                placeholder="Search for a service"
                                // You can add your onChange handler here if you need functionality
                            />
                            <button className="searchButton">Search</button>
                        </div>
                        <div className="servicesCarouselContainer">
                            <div className="servicesCarousel">
                                <div className="servicesInner">
                                    <div className="billCard electricity">
                                        <h3>Electricity</h3>
                                        <p>Pay your electricity bill</p>
                                    </div>
                                    <div className="billCard water">
                                        <h3>Water</h3>
                                        <p>Pay your water bill</p>
                                    </div>
                                    <div className="billCard internet">
                                        <h3>Internet</h3>
                                        <p>Pay your internet bill</p>
                                    </div>
                                    <div className="billCard gas">
                                        <h3>Gas</h3>
                                        <p>Pay your gas bill</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filter Section */}
                        <div className="filterSection">
                            <h2 className="sectionTitle">Latest Transactions</h2> 
                            <div className="verticalSeparator"></div> {/* Vertical line */}
                            <label htmlFor="filter">Filter Transactions: </label>
                            <select
                                id="filterSelect"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="moreThan100">More than 100 Rps</option>
                                <option value="lessThan100">Less than 100 Rps</option>
                            </select>
                        </div>

                        {/* Transactions Section */}
                        <div className="transactionsSection">
                            {latestTransactions.length > 0 ? (
                                latestTransactions.map((transaction, index) => (
                                    <div key={index} className="transactionRow">
                                        <div className="transactionLogo">
                                            <img
                                                src={transaction.senderImage || transaction.receiverImage || "/default-logo.png"}
                                                alt="Logo"
                                            />
                                        </div>
                                        <div className="transactionDetails">
                                            <p className="transactionTitle">
                                                {transaction.senderName || transaction.receiverName || "Unnamed Transaction"}
                                            </p>
                                            <p className="transactionAmount">
                                                {transaction.amount} Rps
                                            </p>
                                        </div>
                                        <div className="transactionDate">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No recent transactions available.</p>
                            )}
                        </div>
                    </div>

                    {/* Right side with contacts and chart */}
                    <div className="fullRightSection">
                        <div className="contactSection">
                            <h2 className="sectionTitle">Recent Contacts</h2>
                            <div className="contactsList">
                                {listedUsers.length === 0 ? (
                                    <p>No Contacts Found</p>
                                ) : (
                                    listedUsers.slice(-3).map((user, index) => (
                                        <div key={user._id} className="contactRow">
                                            <div className="contactLogo">
                                                <img
                                                    src={user.profileImage || "/default-logo.png"}
                                                    alt="Contact Logo"
                                                />
                                            </div>
                                            <div className="contactDetails">
                                                <p className="contactName">{user.name}</p>
                                                <button className="sendMoneyButton">Send Money</button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        
                        {/* Chart Component below Recent Contacts */}
                        <div className="bankCardSection">
    <h2 className="sectionTitle">My Cards</h2> 

    <div className="bankCard">
        <div className="cardInfo">
            <div className="cardNumber">**** **** **** 1234</div>
            <div className="cardHolder">
                <span>Cardholder:</span>
                <p>John Doe</p>
            </div>
            <div className="cardExpiry">
                <span>Expires:</span>
                <p>12/25</p>
            </div>
        </div>
        <div className="cardLogo">
            <img src="/path/to/card-logo.png" alt="Card Logo" className="logoImage" />
        </div>
    </div>
</div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;