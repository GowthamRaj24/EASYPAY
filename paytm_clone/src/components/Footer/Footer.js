import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <ul className="footer-links">
          <li><a href="/help">Help</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/fees">Fees</a></li>
          <li><a href="/security">Security</a></li>
          <li><a href="/shop">Shop</a></li>
        </ul>
      </div>
      <div className="footer-middle">
        <ul className="footer-sub-links">
          <li><a href="/about">About</a></li>
          <li><a href="/newsroom">Newsroom</a></li>
          <li><a href="/developers">Developers</a></li>
          <li><a href="/partners">Partners</a></li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>
          EasyPay Services in India are provided by EasyPay Payments Private Limited
          (CIN U74990MH2009PTC194653). Users are advised to read the{" "}
          <a href="/terms-and-conditions" className="footer-link">
            terms and conditions
          </a>{" "}
          carefully.
        </p>
        <p>
          When you visit or interact with our sites, services, applications, tools, or
          messaging, we or our authorised service providers may use cookies, web beacons,
          and other similar technologies for storing information to help provide you with
          a better, faster, and safer experience and for advertising purposes. Learn more{" "}
          <a href="/privacy" className="footer-link">here</a>.
        </p>
        <p className="copyright">
          © 1999–2024 Accessibility Cookies Privacy Gowtham Raj Legal
        </p>
      </div>
    </footer>
  );
};

export default Footer;
