import React, { useEffect, useState } from 'react';
import Appbar from '../../components/Appbar/Appbar';
import Input from '../../components/Input/Input';
import axios from 'axios';
import ContactBox from '../../components/ContactBox/ContactBox';
import './homePage.css';

const HomePage = () => {
    const [filter, setFilter] = useState('');
    const [listedUsers, setListedUsers] = useState([]);
    const [walletBalance, setWalletBalance] = useState(-1);
    const [myId , setmyId] = useState("");
    const [loadBalance , setLoadBalance] = useState(true);

    const fetchData = async () => {
        const x = localStorage.getItem("token");
        if (!x) {
            window.location.href = "/login";
        }
        const token = x.split(" ")[1];
        try {
            const response = await axios.post('http://localhost:4001/users/userData', { token: token });
            const userId = response.data._id;
            setmyId(userId);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchWalletBalance = async () => {
        try {
            axios.post('http://localhost:4001/transactions/checkBalance', { userId: myId })
            .then((res) => {
                setWalletBalance(res.data.balance);
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.post('http://localhost:4001/contacts/searchContacts', { filter });
            setListedUsers(res.data.list);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWalletBalance();
        fetchUsers();
    }
    ,[myId]);
    
    useEffect(() => {
        fetchData()
        
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [filter]);

    return (
        <div className="homePage">
            <Appbar />
            
            {walletBalance !== -1 && (
                <div className='wallet_balance'>
                    <h1>Wallet Balance: </h1>
                    <h2>Rs. {walletBalance}</h2>
                </div>
            )}

            <div className="search">
                <Input placeholder="Search Contacts" setInput={setFilter} input={filter} />
            </div>

            <h1>Contacts</h1>
            {listedUsers.length === 0 ? 
            (<div className="contactsList">
                <h2>No Contacts Found</h2>
            </div>
            ) : 
            (<div className="contactsList">
            {
                listedUsers.filter((user) => user._id !== myId).map((user) => (
                    <ContactBox key={user._id} user={user} />
                ))
            }
             </div>)}

        </div>
    );
};

export default HomePage;
