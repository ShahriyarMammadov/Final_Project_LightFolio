import React from "react";
import "./index.scss";
import { Helmet } from "react-helmet";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import image1 from "../../../assets/images/cardImage1.jpg";
import image2 from "../../../assets/images/cardImage2.jpg";
import image3 from "../../../assets/images/cardImage3.jpg";
import image4 from "../../../assets/images/cardImage4.jpg";
import image5 from "../../../assets/images/cardImage5.jpg";
import paypal from "../../../assets/images/logo_paypal.gif";
import bayPhoto from "../../../assets/images/logo_bayphoto.gif";
import aws from "../../../assets/images/logo_aws.gif";
import loxleyColour from "../../../assets/images/logo_loxleycolour.gif";
import stripe from "../../../assets/images/logo_stripe.gif";
import coverImg1 from "../../../assets/images/cover-model-1.jpg";
import coverImg2 from "../../../assets/images/cover-model-2.jpg";
import coverImg3 from "../../../assets/images/cover-model-3.jpg";
import digitalImage from "../../../assets/images/digital downloads photo.jpg";
import galleryImage from "../../../assets/images/gallery-directory.jpg";
import beachModel from "../../../assets/images/beachModel.png";
import onlineSales from "../../../assets/images/online-sales.jpg";
import worldPhotographer from "../../../assets/images/world-photographers.jpg";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>LightFolio: Client Photo Gallery for PhotoGraphers</title>
      </Helmet>
      <section id="section1">
        <div className="backGroundImage">
          <div className="text">
            <h1>
              <div className="animation">
                Create{" "}
                <TypeAnimation
                  sequence={[
                    "modern",
                    2000,
                    "unique ",
                    2000,
                    "beautiful",
                    2000,
                  ]}
                  speed={50}
                  style={{ fontSize: "2em" }}
                  wrapper="span"
                  repeat={Infinity}
                />{" "}
              </div>
              client photo galleries
            </h1>

            <p>Online photo galleries for easy sharing, downloads and sales</p>
            <Link to={"/signup"}>START FOR FREE</Link>
          </div>
        </div>
      </section>

      <section id="section2">
        <div className="headerText">
          <h2>Customize your online photo gallery </h2>
          <p>
            <Link to={"/themes"}>Cover themes</Link>,{" "}
            <Link to={"/themes#thumbs"}>thumbnail styles </Link> and{" "}
            <Link to={"/font-option"}>font selections</Link> are just the
            beginning of all the available customization options. Stand out from
            the crowd and impress your clients with your custom designed photo
            galleries.
          </p>
        </div>
        <div className="cardBackImage">
          <div className="colorImg">
            <div className="borderImg"></div>
          </div>
          <div className="imageCard">
            <div className="card card1">
              <Link to={"/"}>
                <img src={image1} alt="" />
              </Link>
              <div className="text">
                <p>
                  <em>London // Masonry - Wide</em>
                </p>
              </div>
            </div>
            <div className="card">
              <Link to={"/"}>
                <img src={image2} alt="" />
              </Link>
              <div className="text">
                <p>
                  <em>London // Pins</em>
                </p>
              </div>
            </div>
            <div className="card">
              <Link to={"/"}>
                <img src={image3} alt="" />
              </Link>
              <div className="text">
                <p>
                  <em>Berlin // Masonry</em>
                </p>
              </div>
            </div>
            <div className="card">
              <Link to={"/"}>
                <img src={image4} alt="" />
              </Link>
              <div className="text">
                <p>
                  <em>Auckland // Dark Theme</em>
                </p>
              </div>
            </div>
            <div className="card card1">
              <Link to={"/"}>
                <img src={image5} alt="" />
              </Link>
              <div className="text">
                <p>
                  <em>Santa Fe // Squares</em>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="pageAndFont">
          <div className="cardPageAndFont">
            <div className="number">8</div>
            <div className="text">
              <div className="header">
                <Link to={"/themes"}>
                  {" "}
                  <h5>Cover Page Styles</h5>
                </Link>
                <Link to={"/themes"}>
                  <p>
                    Fullscreen + single image, split screen + dual image,
                    centered circle image and other options.
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="cardPageAndFont">
            <div className="number">
              30<sup>+</sup>
            </div>
            <div className="text">
              <div className="header">
                <Link to={"/themes"}>
                  {" "}
                  <h5>Cover Page Styles</h5>
                </Link>
                <Link to={"/themes"}>
                  <p>
                    A font for every style. Multiple serif, sans-serif and
                    handwritten/script fonts are available. Set font size, color
                    and more.
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="cardPageAndFont">
            <div className="number">8</div>
            <div className="text">
              <div className="header">
                <Link to={"/themes"}>
                  {" "}
                  <h5>Thumbnail Styles</h5>
                </Link>
                <Link to={"/themes"}>
                  <p>
                    Control thumbnail shape (rectangles, squares and circles)
                    and size (thumbnails vs fullscreen photos).
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="section3">
        <div className="headerText">
          <p>POWERED BY</p>
        </div>

        <div className="logoImage">
          <div className="image">
            <img src={paypal} alt="" />
          </div>
          <div className="image">
            <img src={bayPhoto} alt="" />
          </div>
          <div className="image">
            <img src={aws} alt="" />
          </div>
          <div className="image">
            <img src={loxleyColour} alt="" />
          </div>
          <div className="image">
            <img src={stripe} alt="" />
          </div>
        </div>

        <div className="proofPhotos">
          <div className="text">
            <h1>Photo proofing for professionals</h1>
            <p>
              A photo sharing platorm you and your clients will love. View,
              select and communicate all online. Enable watermarks, downloads,
              favorites and password protection.
            </p>

            <Link to={"/photo-proofing"}>
              <i className="fa-solid fa-right-long"></i> PROOF PHOTOS
            </Link>
          </div>
          <div className="littleCardImage">
            <div className="littleCard card1">
              <img src={coverImg1} alt="" />
            </div>
            <div className="littleCard card2">
              <img src={coverImg2} alt="" />
            </div>
            <div className="littleCard card3">
              <img src={coverImg3} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section id="section4">
        <div className="left">
          <img src={digitalImage} alt="" />
        </div>
        <div className="right">
          <p className="delivery">DELIVERY</p>
          <Link to={"/"}>
            <h2>Digital Downloads</h2>
          </Link>
          <div className="text">
            <p>
              Conveniently deliver photos to your clients online. With every
              photo gallery, control file size and restrict access with a
              personalized password--all at the click of a button.
            </p>
          </div>
          <Link to={"/"} className="clientBTn">
            <i className="fa-solid fa-right-long"></i> CLIENT DOWNLOADS
          </Link>
        </div>
      </section>

      <section id="section5">
        <div className="right">
          <p className="delivery">PORTAL</p>
          <Link to={"/"}>
            <h2>A mini website for your photo galleries</h2>
          </Link>
          <div className="text">
            <p>
              Organize your client photo galleries into a central repository.
              This gives your clients an easy way to find all of your published
              online galleries. Customize your directory by choosing from
              <Link to={"/themes"}>several themes</Link> and use the SEO
              settings to improve your search engine rankings.
            </p>
          </div>
          <Link to={"/"} className="clientBTn">
            <i className="fa-solid fa-right-long"></i> GALLERY DIRECTORIES
          </Link>
        </div>
        <div className="left">
          <img src={galleryImage} alt="" />
        </div>
      </section>

      <section id="section6">
        <div className="left">
          <img src={beachModel} alt="" />
        </div>
        <div className="right">
          <p className="delivery">ANALYTICS</p>
          <h2>Photo gallery activity reports</h2>
          <div className="text">
            <p>
              Quickly identify which images have been viewed, how many times,
              and which images have been downloaded and/or favorited. Lightfolio
              analytics gives you insight into all your online gallery traffic.
            </p>
          </div>
          <Link to={"/"} className="clientBTn">
            <i className="fa-solid fa-right-long"></i> VISITOR ANALYTICS
          </Link>
        </div>
      </section>

      <section id="section7">
        <div className="right">
          <p className="delivery">SALES</p>
          <Link to={"/online-store"}>
            <h2>Sell Online</h2>
          </Link>
          <div className="text">
            <p>
              Allow your clients to purchase prints, digital downloads and more.
              Process your own orders or integrate with our{" "}
              <Link to={"/lab-partners"}>photo lab partners</Link>. Set your own
              pricing, minimum orders, shipping rates and create coupons.
            </p>
          </div>
          <Link to={"/online-store"} className="clientBTn">
            <i className="fa-solid fa-right-long"></i> ONLINE SALES
          </Link>
        </div>
        <div className="left">
          <img src={onlineSales} alt="" />
        </div>
      </section>

      <section id="section8">
        <div className="headerText">
          <h2>Global Network </h2>
          <p>
            Create your <Link to={"/signup"}>free online photo gallery</Link>{" "}
            and join photographers in 110+ countries around the globe.{" "}
            <Link to={"/signup"}>Join your peers today</Link>.
          </p>
        </div>
        <div className="image">
          <img src={worldPhotographer} alt="" />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
