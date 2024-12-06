import React, { useEffect, useState } from 'react';
import Appbar from '../../components/Appbar/Appbar';
import Input from '../../components/Input/Input';
import Footer from "../../components/Footer/Footer";
import axios from 'axios';
import ContactBox from '../../components/ContactBox/ContactBox';
import './homePage.css';
// Import images
import image1 from "../../images/image1.jpeg";
import image2 from "../../images/image2.jpeg";
import image3 from "../../images/image3.jpeg";
import image4 from "../../images/image4.jpeg";

const images = [image1, image2, image3, image4];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <Appbar/>
      <section className="hero">
        <div className="hero-container">
          <img
            src={images[currentImageIndex]}
            alt="Hero"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1 className="hero-title">Welcome to Our Platform</h1>
            <button className="join-button">Join Now</button>
          </div>
        </div>
      </section>
      <div className="info-section">
  <h2 className="info-title">EasyPay Makes it easy.</h2>
  <div className="info-cards">
    <div className="info-card">
      <img
        src="/src/images/shopping_mall.jpeg"
        alt="Shopping Mall"
        className="info-image"
      />
      <h3 className="info-card-title">The world is your shopping mall.</h3>
      <p className="info-card-text">
        From big brands to services to little boutiques,
        Pay your bills with EasyPay easily at a click of your finger.
      </p>
      <button className="info-button">Shop Now</button>
    </div>
    <div className="info-card">
      <img
        src="/src/images/preferred_card.jpeg"
        alt="Preferred Card"
        className="info-image"
      />
      <h3 className="info-card-title">Pay with your preferred card.</h3>
      <p className="info-card-text">
        Link all your cards and choose which one to use at checkout. Paying Bills 
        online has never been this easy. You can also keep earning rewards from
        your favourite cards.
      </p>
      <button className="info-button">Link a Card Now</button>
    </div>
    <div className="info-card">
      <img
        src="/src/images/shop_confidence.jpeg"
        alt="Shop Online Confidence"
        className="info-image"
      />
      <h3 className="info-card-title">Shop online with confidence.</h3>
      <p className="info-card-text">
        Shop online with confidence – with 24/7 fraud monitoring and Buyer
        Protection on eligible purchases.{" "}
        <a href="/terms">Terms and limitations apply</a>.
      </p>
      <button className="info-button">Find Out More</button>
    </div>
  </div>
        </div>

        <div className="terms-section">
  <h2 className="terms-title">Terms and Conditions for EasyPay</h2>
  <div className="terms-box">
    <p>
      By using EasyPay, you agree to the following terms and conditions:
      <br />
      <br/>
      1. EasyPay is subject to availability and may vary by location. <br />
      <br/>
      2. Transaction limits and service fees may apply. <br />
      <br/>
      3. Refunds, if applicable, will be processed according to EasyPay’s refund
      policy. <br />
      <br/>
      4. By proceeding, you authorize EasyPay to process your payment
      information in compliance with our Privacy Policy. <br />
      <br/>
      5. These terms are subject to updates at any time. Please ensure you are
      aware of the latest terms before making a transaction.
      <br />
      <br />
      For detailed information, please refer to the full Terms and Conditions
      document.
    </p>
  </div>
  <a href="/terms-and-conditions" className="learn-more-link">
    Learn More
  </a>
  <Footer/>
</div>


    </>
    
  );
};

export default Home;

