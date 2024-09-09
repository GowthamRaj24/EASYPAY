import ButtonUse from "../Button/ButtonUse";
import "./ContactBox.css";

const ContactBox = ({ user }) => {
    const sendMoney = () => {
        console.log("Send Money");
    };

    return (
        <div className="contact_box_container">
            <div className="contact_box">
                <div className="content">
                    <div className="content_image">
                        {user.firstName[0]}
                    </div>
                    {<div className="content_text">
                        <h3>{user.firstName + " " + user.lastName}</h3>
                        <p>{user.username}</p>
                    </div>}
                </div>
                <div className="button t">
                    <ButtonUse onClick={sendMoney} link={"/send?userId=" +user._id + "&name=" + user.firstName}>Send Money</ButtonUse>
                </div>
            </div>
        </div>
    );
};

export default ContactBox;
