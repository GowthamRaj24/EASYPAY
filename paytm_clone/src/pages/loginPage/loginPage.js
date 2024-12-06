import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import SubHeading from "../../components/SubHeading/SubHeading";
import Wrapper from "../../components/Wrapper/Wrapper";
import "./loginPage.css";
import ButtonUse from "../../components/Button/ButtonUse";
import { useState, useEffect } from "react";
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

    // Function to create animated circles (copied from HomePage.js)
    useEffect(() => {
        const createCircles = () => {
            const circleContainer = document.querySelector('.circle-background');
            for (let i = 0; i < 20; i++) { // Adjust the number of circles as needed
                const circle = document.createElement('div');
                circle.classList.add('circle');
                
                // Random size, position, and animation duration for each circle
                const size = Math.random() * 100 + 50; // Random size between 50px and 150px
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                const duration = Math.random() * 20 + 20; // Animation duration between 20s and 40s

                // Set styles for each circle
                circle.style.width = `${size}px`;
                circle.style.height = `${size}px`;
                circle.style.left = `${posX}px`;
                circle.style.top = `${posY}px`;
                circle.style.animationDuration = `${duration}s`;

                // Append the circle to the container
                circleContainer.appendChild(circle);
            }
        };

        createCircles(); // Call the function once when the component mounts
    }, []);

    return (<>

    <div className="circle-background"></div> {/* Container for the animated circles */}
    
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
