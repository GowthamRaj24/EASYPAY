import { useSearchParams } from 'react-router-dom';
import ButtonUse from '../../components/Button/ButtonUse';
import "./sendMoneyPage.css";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import SubHeading from "../../components/SubHeading/SubHeading";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";

// audio file
import sendMoneySound from '../../assets/sounds/send-money.mp3';

const SendMoneyPage = () => {
    const [searchParam] = useSearchParams('search');
    const id = searchParam.get('userId');
    const [amount, setAmount] = useState(0);
    const [myData, setmyData] = useState({});
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
    const [showSparkles, setShowSparkles] = useState(false); // State to control the sparkles effect

    useEffect(() => {
        fetchMyId();
    }, []);

    const fetchMyId = async () => {
        const x = localStorage.getItem("token");
        if (!x) {
            window.location.href = "/login";
        }
        const token = x.split(" ")[1];
        
        try {
            const response = await axios.post('http://localhost:4001/users/userData', { token: token });
            setmyData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSendMoney = () => {
        if (amount <= 0) {
            alert("Amount should be greater than 0");
            return;
        }
        axios.post('http://localhost:4001/transactions/sendMoney', { fromUserID: myData._id, toUserID: id, amount: amount })
            .then((res) => {
                console.log(res.data);
                // Show popup when money is sent
                setShowPopup(true);

                // Play the send money sound
                const audio = new Audio(sendMoneySound);
                audio.play();

                // Show the sparkle effect for a limited time
                setShowSparkles(true);
                setTimeout(() => {
                    setShowSparkles(false);
                    setShowPopup(false);
                }, 3000);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="loginBackground">
            {myData ? (
                <Wrapper>
                    <Heading>Send Money</Heading>
                    <div className="send_money_img">
                        <div className="content_image">
                            {myData && myData.firstName}
                        </div>
                    </div>
                    <SubHeading size="1.5">Sending Money to: {myData.firstName}</SubHeading>
                    <Input type="text" placeholder="Enter Amount" setInput={setAmount} input={amount} className="inputemail"></Input>
                    <ButtonUse onClick={() => handleSendMoney()}>Initiate Transfer</ButtonUse>
                </Wrapper>
            ) : (
                <Wrapper>
                    <Heading>Send Money</Heading>
                    <SubHeading size="1.5">Loading...</SubHeading>
                </Wrapper>
            )}

            {/* Popup for money sent confirmation */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-circle">
                        <span className="tick-mark">✔</span>
                    </div>
                    <div className="popup-message">
                        Money Sent: {amount}
                    </div>

                    {/* Sparkles Effect */}
                    {showSparkles && (
                        <div className="fireworks-container">
                            <div className="sparkle sparkle-1"></div>
                            <div className="sparkle sparkle-2"></div>
                            <div className="sparkle sparkle-3"></div>
                            <div className="sparkle sparkle-4"></div>
                            <div className="sparkle sparkle-5"></div>
                            <div className="sparkle sparkle-6"></div>
                            <div className="sparkle sparkle-7"></div>
                            <div className="sparkle sparkle-8"></div>
                            <div className="sparkle sparkle-9"></div>
                            <div className="sparkle sparkle-10"></div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SendMoneyPage;
