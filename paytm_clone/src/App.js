import {BrowserRouter , Routes , Route} from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import SignupPage from "./pages/signupPage/signupPage";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import HomePage from "./pages/homePage/homePage";
import SendMoneyPage from "./pages/sendMoney/sendMoneyPage";
import Dashboard from "./pages/dashboard/dashboard";
import QRCodeScanner from "./pages/qrscanner/qrscanner";
import RazorPay from "./components/RazorPay/RazorPay";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element = {<LoginPage/>}/>
          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/send" element={<SendMoneyPage/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/qr" element={<QRCodeScanner/>}/>
          <Route path="/razorpay" element={<RazorPay/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;