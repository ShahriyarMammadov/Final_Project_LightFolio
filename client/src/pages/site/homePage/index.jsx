import React from "react";
import "./index.scss";
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

const HomePage = () => {
  return (
    <div>
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
              <i class="fa-solid fa-right-long"></i> PROOF PHOTOS
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
    </div>
  );
};

export default HomePage;
