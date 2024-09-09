import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import SubHeading from "../../components/SubHeading/SubHeading";
import Wrapper from "../../components/Wrapper/Wrapper";
import "./loginPage.css";
import ButtonUse from "../../components/Button/ButtonUse";
import { useState } from "react";
import Password from "../../components/Password/Password";
import Link from "../../components/Link/Link";
import axios from "axios";

const LoginPage = () => {
    const [password , setPassword] = useState("");
    const [username , setUsername] = useState("");

    const onLogin = () => {
        axios.post("http://localhost:4001/users/loginUser", { username: username, password: password })
            .then((res) => {
                const responseData = res.data;
                const token = responseData.token;
                console.log(token);
                localStorage.setItem("token", `Bearer ${token}`);
                window.location.href = "/home";
            })
            .catch((err) => {
                console.error(err.response.data);
            });
    }

    return (<>

    <div className="loginBackground">
        <Wrapper>
            <Heading>Login Page</Heading>
            <SubHeading size="1.5">Welcome to the PAY-NOW</SubHeading>
            <Input type="text" placeholder="Enter Name"  setInput={setUsername} input={username} inputHeading="Username" className="inputemail"></Input>
            <Password inputHeading="Password" password={password} setPassword={setPassword}/>
            <ButtonUse onClick = {onLogin} >Login</ButtonUse>
            <SubHeading size="1.2"> <Link link="/signup">Forgot Password?</Link></SubHeading>
            <Link link="/signup">Create an Account</Link>
        </Wrapper>
    </div>

    </>)
}

export default LoginPage;