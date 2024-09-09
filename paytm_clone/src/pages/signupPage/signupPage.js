import {  useState } from "react";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import SubHeading from "../../components/SubHeading/SubHeading";
import CircularProgress from '@mui/material/CircularProgress';
import Wrapper from "../../components/Wrapper/Wrapper";
import ButtonUse from "../../components/Button/ButtonUse";
import Password from "../../components/Password/Password";
import Link from "../../components/Link/Link";
import axios from "axios";
import { LoadingButton } from '@mui/lab';

const SignupPage = () => {

    const [firstname , setFirstname] = useState("");
    const [lastname , setLastname] = useState("");
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const [userOTP , setUserOTP] = useState("");
    const [curr , setCurr] = useState(0);
    const [loadButton , setLoadButton] = useState(true);
    const [hashed_password , setHashed_password] = useState("");
    const [gen_otp , setGen_otp] = useState("");

    const onSignup = () => {
        axios.post("http://localhost:4001/users/signupUser", { firstName: firstname, lastName: lastname, username: username, password: password , repassword : password })
        .then((res)=>{
            setLoadButton(false);
            setHashed_password(res.data.hashed_password);
            console.log(hashed_password);
            axios.post("http://localhost:4001/users/sendOTP", { username: username })
            .then((response)=>{
                setGen_otp(response.data.otp);
                console.log(gen_otp);
                setCurr(1);
            })
        })
        .catch((err)=>{
            console.error(err);
        });
    }

    const checkOTP = () => {
        axios.post("http://localhost:4001/users/checkOTP", { otp : gen_otp, userOTP :  userOTP})
            .then((res)=>{
                if (res.status === 200){
                axios.post("http://localhost:4001/users/addUser", {firstName: firstname, lastName: lastname, username: username, password: hashed_password})
                .then((response)=>{
                    axios.post("http://localhost:4001/users/loginUser", {username: username , password : password})
                    .then((res)=>{
                        const responseData = res.data;
                        const token = responseData.token;
                        console.log(token);
                        localStorage.setItem("token", `Bearer ${token}`);
                        window.location.href = "/home";
                    })
                })
            }
                else{
                    console.log("User Can't be Added");
                    alert("User Can't Successfully");
                }
            
            })
            .catch((err)=>{
                console.error(err);
            })
        }

    return(<>
    <div className="loginBackground">
        <Wrapper>
            <Heading>{(curr === 0) ? (<>Signup Page</>) : (<>Enter OTP</>)}</Heading>
            <SubHeading size="1.5">Welcome to the PAY-NOW</SubHeading>
            {(curr === 0)?(<>
                <Input type="text" placeholder="Enter FirstName"  setInput={setFirstname} input={firstname} inputHeading="First Name" className="inputemail"></Input>
                <Input type="text" placeholder="Enter LastName"  setInput={setLastname} input={lastname} inputHeading="Last Name" className="inputemail"></Input>
                <Input type="text" placeholder="Enter Username"  setInput={setUsername} input={username} inputHeading="Username" className="inputemail"></Input>
                <Password inputHeading="Password" password={password} setPassword={setPassword}/>
                {(loadButton) ? (<ButtonUse onClick={()=>onSignup()}>Sign Up</ButtonUse>) : (<LoadingButton><CircularProgress />Loading</LoadingButton>)}
                <SubHeading size="1.2">Already a User ? <Link link="/login">Login</Link></SubHeading>
                </>):
            (<>
            <Input type="text" placeholder="Enter OTP"  setInput={setUserOTP} input={userOTP} inputHeading="OTP" className="inputemail"></Input>
            <ButtonUse onClick = {()=>checkOTP()}>Verify OTP</ButtonUse>
            </>)}
        </Wrapper>
    </div>
    </>)
}

export default SignupPage;