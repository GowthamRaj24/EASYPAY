import { useState, useEffect } from "react";
import Appbar from "../../components/Appbar/Appbar";
import Heading from "../../components/Heading/Heading";
import SubHeading from "../../components/SubHeading/SubHeading";
import Wrapper from "../../components/Wrapper/Wrapper";
import axios from "axios";
import "./dashboard.css";
import TransactionBox from "../../components/TransactionBox/TransactionBox";

const Dashboard = () => {
    const [userData, setUserData] = useState({});
    const [QrCode, setQrCode] = useState("");
    const [walletBalance, setWalletBalance] = useState("Loading...");

    const fetchWalletBalance = async () => {
        try {
            const response = await axios.post(
                "http://localhost:4001/transactions/checkBalance",
                { userId: userData._id }
            );
            setWalletBalance(response.data.balance);
        } catch (error) {
            console.log(error);
        }
    }
    
    const fetchUserData = async () => {
        try {
            const x = localStorage.getItem("token");
            const token = x.split(" ")[1];
            const response = await axios.post(
                "http://localhost:4001/users/userData",
                { token: token }
            );
            setUserData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const qrCode = async (userId) => {
        axios
            .post("http://localhost:4001/qrcode/generateQr", { userId: userId._id })
            .then(async (res) => {
                console.log("Got the QR code");
                setQrCode(res.data.qrCode);
            })
            .catch((err) => {
                console.error(err?.response?.data);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData();
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (userData._id) {
            
            qrCode(userData);
        }
    }, [userData]);

    useEffect(() => {
        if (userData._id) {
            fetchWalletBalance();
        }
    }, [userData]);

    return (
        <>
            <Appbar />
            <div className="dashboardBackground">
                <Wrapper>
                    <div className="dashboardContent">
                        <Heading className="dashboardHeading">Profile</Heading>
                        <SubHeading size="1.5">Welcome to PAY-NOW</SubHeading>
                        <SubHeading size="1.7">{userData?.firstName + " " + userData?.lastName}</SubHeading>
                        <SubHeading size="1.7">{userData?.username}</SubHeading>
                        
                        {QrCode ? (
                            <img className="qrCodeImage" src={QrCode} alt="Profile" />
                        ) : (
                            <div className="qrCodePlaceholder">QrCode</div>
                        )}

                        <Heading className="dashboardHeading">Balance : {walletBalance}</Heading>
                    </div>
                </Wrapper>

                <Wrapper>
                <div className="transactionHistory">
                    <Heading className="dashboardHeading">Transaction History</Heading>
                    {userData.transactions?.map((transaction , index) => (
                        <TransactionBox
                            key={index}
                            userId={transaction.to}
                            amount={transaction.amount}
                        />
                    ))}
                </div>
                </Wrapper>
            </div>
        </>
    );
};

export default Dashboard;