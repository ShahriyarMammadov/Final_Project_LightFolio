import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import footerLogo from "../../../assets/images/footer-logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="footerHeader">
        <div className="headerText">
          <h2>Join Now for FREE </h2>
          <div className="hr"></div>
          <p>No credit card required</p>
        </div>

        <div className="button">
          <Link to={"/signup"}>GET STARTED</Link>
        </div>
      </div>

      <div className="footerNav">
        <div className="navCard">
          <div className="header">
            <Link to={"/"}>
              <img src={footerLogo} alt="" />
            </Link>
          </div>
          <p>A software platform for photographers.</p>
          <p>© Lightfolio 2023</p>
        </div>

        <div className="navCard">
          <div className="header">
            <h5>CLIENT GALLERIES</h5>
          </div>
          <nav>
            <Link to={"/features"}>Features List</Link>
            <Link to={"/photo-proofing"}>Proofing</Link>
            <Link to={"/deliver-photos-to-client"}>Client Downloads</Link>
            <Link to={"/themes"}>Themes</Link>
            <Link to={"/online-store"}>Online Store</Link>
            <Link to={"/visitor-analytics"}>Visitor Analytics</Link>
            <Link to={"/gallery-directories"}>Gallery Directories</Link>
          </nav>
          <div className="header">
            <Link to={"/pricing"}>PRICING</Link>
          </div>
          <div className="header">
            <Link to={"/websites"}>WEBSİTES</Link>
          </div>
          <div className="header">STUDIO MANAGER</div>
          <nav>
            <Link to={"/"}>Photograohy CRM</Link>
            <Link to={"/"}>Invoices</Link>
            <Link to={"/"}>Mini Sessions</Link>
            <Link to={"/"}>Booking Site</Link>
          </nav>
        </div>

        <div className="navCard">
          <div className="header">
            <h5>CONTRACTS</h5>
          </div>
          <nav>
            <Link to={"/pricing"}>Contracts</Link>
            <Link to={"/wedding-photography-contract"}>Wedding Contract</Link>
            <Link to={"/portrait-photography-contract"}>Portrait Contract</Link>
            <Link to={"/boudoir-photography-contract"}>Boudoir Contract</Link>
            <Link to={"/engagement-shoot-contract"}>
              Engagement Shoot Contract
            </Link>
            <Link to={"/print-release"}>Print Release</Link>
            <Link to={"/event-photography-contract"}>Event Contract</Link>
            <Link to={"/commercial-photography-contract"}>
              Commercial Contract
            </Link>
            <Link to={"/real-estate-photography-contract"}>
              Real Estate Contract
            </Link>
            <Link to={"/second-shooter-contract"}>Second Shooter Contract</Link>
            <Link to={"/photo-booth-contract"}>Photo Booth Contract</Link>
          </nav>
        </div>

        <div className="navCard">
          <div className="header">
            <h5>FORMS</h5>
          </div>
          <nav>
            <Link to={"/photography-forms"}>Forms</Link>
            <Link to={"/photography-forms/photography-client-questionnaire"}>
              Photography Client Questionnaire
            </Link>
            <Link to={"/photography-forms/wedding-photography-questionnaire"}>
              Wedding Day Questionnaire
            </Link>
            <Link to={"/photography-forms/boudoir-questionnaire"}>
              Boudoir Questionnaire
            </Link>
            <Link to={"/photography-forms/family-portrait-questionnaire"}>
              Engagement Shoot Contract
            </Link>
            <Link to={"/photography-forms/family-portrait-questionnaire"}>
              Family Portrait Contract
            </Link>
            <Link to={"/photography-forms/senior-portraits-questionnaire"}>
              Senior Portaits Contract
            </Link>
            <Link to={"/photography-forms/photography-booking-form"}>
              Photo Booking Form
            </Link>
            <Link to={"/photography-forms/contact-form"}>Contact Form</Link>
          </nav>
        </div>

        <div className="navCard">
          <div className="header">
            <h5>RELEASES</h5>
          </div>
          <nav>
            <Link to={"/releases/photo"}>Photo Releases</Link>
            <Link to={"/releases/model-release-form"}>Model Releases</Link>
            <Link to={"/releases/minor-model-release-form"}>
              Minor Model Releases
            </Link>
            <Link to={"/releases/boudoir-photo-release-form"}>
              Buodoir Releases
            </Link>
            <Link to={"/releases/social-media-release-form"}>
              Social Media Releases
            </Link>
            <Link to={"/releases/video-release-form"}>Video Releases</Link>
            <Link to={"/releases/copyright-release-form"}>
              Copyright Releases
            </Link>
            <Link to={"/releases/daycare-release-form"}>Daycare Releases</Link>
            <Link to={"/releases/patient-release-form"}>Patient Releases</Link>
            <Link to={"/releases/employes-release-form"}>
              Employes Releases
            </Link>
            <Link to={"/releases"}>Pet Releases</Link>
            <Link to={"/releases/church-release-form"}>Church Releases</Link>
          </nav>
        </div>

        <div className="navCard support">
          <div className="header">
            <h5>SUPPORT</h5>
          </div>
          <nav>
            <Link to={"/help"}>Knowladge Base</Link>
            <Link to={"/privacypolicy"}>Privacy Policy</Link>
            <Link to={"/termsofuse"}>Termos of Use</Link>
            <span
              onClick={(e) => {
                window.location.href = "mailto:hello@lightfolio.com";
              }}
            >
              <i className="fa-solid fa-envelope"></i> hello@lightfolio.com
            </span>
          </nav>

          <div className="header">
            <h5>FOLLOW US</h5>
          </div>
          <nav>
            <Link to={"/blog"}>
              <i className="fa-solid fa-blog"></i> Blog
            </Link>
            <a href="https://www.facebook.com/lightfolio" target={"_blank"}>
              <i className="fa-brands fa-facebook"></i> Facebook
            </a>
            <a href="https://www.instagram.com/lightfolio/" target={"_blank"}>
              <i className="fa-brands fa-instagram"></i> Instagram
            </a>
            <a href="https://twitter.com/light_folio" target={"_blank"}>
              <i className="fa-brands fa-twitter"></i> Twitter
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
