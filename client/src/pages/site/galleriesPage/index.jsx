import React from "react";
import { Helmet } from "react-helmet";
import { Link, Outlet } from "react-router-dom";
import galleryImg from "../../../assets/images/galleryPage.jpg";
import "./index.scss";

const GalleriesPage = () => {
  return (
    <div id="galleriesPage">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Features - LightFolio</title>
      </Helmet>
      <div className="headerText">
        <h2>Client Galleries - Feature List</h2>
        <p>
          Lightfolio is a fully featured,{" "}
          <Link to={"/"}>online photo gallery</Link> platform that provides
          multiple configuration options and allows for advanced customization.
        </p>
      </div>

      <div className="image">
        <img src={galleryImg} alt="" />
      </div>

      <div className="cards">
        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-table-cells"></i>
          </div>
          <div className="text">
            <Link to={"/photo-proofing"}>PROOFING</Link>
            <p>
              Share and colloborate with clients in selecting photos. Enable
              downloads, watermarks and solicit feedback through comments.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-stamp"></i>
          </div>
          <div className="text">
            <h4>WATERMARK</h4>
            <p>
              Protect your work with text or image watermarks. Control placement
              and opacity.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-info"></i>
          </div>
          <div className="text">
            <Link to={"/visitor-analytics"}>VISITOR ANALYTICS</Link>
            <p>
              Not only can you track how many visitors you have, but you can
              also monitor geolocation, web browser and device type.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-mobile"></i>
          </div>
          <div className="text">
            <h4>RESPONSIVE DESIGN</h4>
            <p>
              Over 50% of web traffic today is on mobile devices. Our galleries
              are designed to look great on desktop computer, tablet or phone.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-square-plus"></i>
          </div>
          <div className="text">
            <h4>FAVORITES</h4>
            <p>
              Allow your clients to create and save collections of their
              favorite images. You can easily view their selections and then
              export filenames for use in Lightroom.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-dollar"></i>
          </div>
          <div className="text">
            <Link to={"/online-store"}>ONLINE SALES</Link>
            <p>
              Configure your galleries so you can sell prints, albums, digital
              downloads and more. Zero commissions.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-list"></i>
          </div>
          <div className="text">
            <Link to={"/gallery-directories"}>GALLERY DIRECTORIES</Link>
            <p>
              Create a custom portal so your users can see a list of your
              publicly shared galleries.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-brands fa-twitter"></i>
          </div>
          <div className="text">
            <h4>SOCIAL MEDIA SHARING</h4>
            <p>
              Enable this option to allow gallery visitors to easily share
              through Facebook, Twitter and email.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-download"></i>
          </div>
          <div className="text">
            <Link to={"/deliver-photos-to-client"}>DOWNLOADS</Link>
            <p>
              Enable downloading for the entire gallery or just for individual
              images. You set the download file resolution.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-lock"></i>
          </div>
          <div className="text">
            <h4>PASSWORD PROTECTION</h4>
            <p>
              Each individual gallery can be set to require a password to view
              and/or download images.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-crop"></i>
          </div>
          <div className="text">
            <Link to={"/themes"}>COVER THEMES</Link>
            <p>
              Every gallery has a cover page. Choose from 7 templates and
              customize images, text, font face, alignment and more.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-images"></i>
          </div>
          <div className="text">
            <h4>THUMBNAIL STYLES</h4>
            <p>
              Further customize your gallery by choosing a thumbnail style. Set
              the margin between images and select the menu orientation.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-file"></i>
          </div>
          <div className="text">
            <Link to={"/supported-file-types"}>SUPPORTED FILE TYPES</Link>
            <p>
              Lightfolio supports jpg, gif, png and tif. Max file size is 70MB.
              (Support for max file sizes up to 1GB+ is available upon request)
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-globe"></i>
          </div>
          <div className="text">
            <h4>CUSTOM DOMAINS</h4>
            <p>
              You can use your own domain, www.mycompany.com, to transparently
              connect to Lightfolio galleries.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-circle-half-stroke"></i>
          </div>
          <div className="text">
            <h4>COLOR SCHEMES</h4>
            <p>Choose between a light and dark color scheme.</p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="text">
            <h4>EMAIL INVITATIONS</h4>
            <p>
              Create and send customized HTML emails, inviting your clients to
              view their galleries.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-circle-half-stroke"></i>
          </div>
          <div className="text">
            <Link to={"/font-options"}>FONTS</Link>
            <p>
              Typography is important. Choose from over 20 font options when
              customizing your gallery cover.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div className="text">
            <Link to={"/lab-partners"}>PRO LAB PARTNERS</Link>
            <p>
              Offer professional prints, canvas wraps and more with our lab
              partners: Bay Photo Lab and Loxley Colour.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="icon">
            <i className="fa-solid fa-sun"></i>
          </div>
          <div className="text">
            <Link to={"/lightroom"}>LIGHTROOM</Link>
            <p>
              Easily upload and sync your galleries by using our Lightroom
              plug-in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleriesPage;
