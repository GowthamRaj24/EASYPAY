import "./Appbar.css";
import profileLogo from "../../images/profile.svg";
import qrLogo from "../../images/qr-code.png";

const Appbar = () => {
    
    

    return (<>
    <div className="appbar">
        <div className="appbar_container">
        <div className="appbar_logo">
            Pay Now
        </div>

        <div className="appbar_profile">
            <a href="/qr">
                <div className="appbar_qr_logo">
                    <img src={qrLogo} alt="QR" />
                </div>
            </a>
            <a href="/dashboard">
            <div className="appbar_profile_logo">
                <img src={profileLogo} alt="Profile" />
            </div>
            </a>
        </div>
        </div>
    </div>
    </>
    )
}

export default Appbar;