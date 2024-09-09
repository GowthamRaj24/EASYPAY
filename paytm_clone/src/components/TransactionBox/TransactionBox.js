import axios from "axios";
import { useEffect, useState } from "react";
// import h2 from "../h2/h2";
import "./TransactionBox.css";

const TransactionBox = ({ userId , amount }) => {
    const [user , setUserDetails] = useState(null);

    const fetchUserData = async () => {
        try{
            const res = await axios.post("http://localhost:4001/users/getuserById", {userId : userId});
            setUserDetails(res.data);

        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(()=>{
        fetchUserData();
    }, []);

    return (
        amount > 0 ? (
            <div className="transaction_box_container ">
            <div className="contact_box greentransaction">
                <div className="content t">
                    <div className="content_image">
                        {user?.firstName[0]}
                    </div>
                    <div className="content_text t">
                        <h3>{user?.firstName + " " + user?.lastName}</h3>
                        <h5>{user?.username}</h5>
                    </div>
                </div>
                <div className="button">
                    <div className="amount">
                        <h4>Rs. {amount}</h4>
                    </div>
                </div>
            </div>
        </div>) :
        (<div className="transaction_box_container ">
            <div className="contact_box redtransaction">
                <div className="content t">
                    <div className="content_image">
                        {user?.firstName[0]}
                    </div>
                    <div className="content_text t">
                        <h3>{user?.firstName + " " + user?.lastName}</h3>
                        <h5>{user?.username}</h5>
                    </div>
                </div>
                <div className="button">
                    <div className="amount">
                        <h4>Rs. {amount}</h4>
                    </div>
                </div>
            </div>
        </div>)
    );
};

export default TransactionBox;
