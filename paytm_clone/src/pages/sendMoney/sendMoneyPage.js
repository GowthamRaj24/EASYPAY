import { useSearchParams } from 'react-router-dom';
import ButtonUse from '../../components/Button/ButtonUse';
import "./sendMoneyPage.css";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import SubHeading from "../../components/SubHeading/SubHeading";
import Wrapper from "../../components/Wrapper/Wrapper";
import { useEffect, useState } from "react";
import axios from "axios";

const SendMoneyPage = () => {
    const [searchParam] = useSearchParams('search');
    const id = searchParam.get('userId');
    const [amount , setAmount] = useState(0);
    const [myData , setmyData] = useState({});

    useEffect(()=>{
        console.log(amount);
    }, [amount]);

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
            const response = await axios.post('http://localhost:4001/users/userData' , { token : token });
            console.log(response.data);
            setmyData(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSendMoney = () => {
        if (amount <= 0) {
            alert("Amount should be greater than 0");
            return;
        }
        axios.post('http://localhost:4001/transactions/sendMoney', { fromUserID : myData._id, toUserID : id , amount : amount})
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    return (
    <div className="loginBackground">
        {myData ?
        (<Wrapper>
            <Heading>Send Money</Heading>
            <div className="send_money_img">
                <div className="content_image">
                    {myData.firstName}
                </div>
            </div>
            <SubHeading size="1.5">Sending Money to : {myData.firstName}</SubHeading>
            <Input type="text" placeholder="Enter Amount"  setInput={setAmount} input={amount} className="inputemail"></Input>
            <ButtonUse onClick = {()=>handleSendMoney()} >Initiate Transfer</ButtonUse>
        </Wrapper>)
        :
        (<Wrapper>
            <Heading>Send Money</Heading>
            <SubHeading size="1.5">Loading...</SubHeading>
        </Wrapper>)
}
    </div>
    );
};

export default SendMoneyPage;
