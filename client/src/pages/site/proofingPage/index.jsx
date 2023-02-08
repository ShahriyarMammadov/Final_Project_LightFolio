import React, { useEffect, useState } from "react";
import "./index.scss";
import proofingVideo from "../../../assets/images/proofing.mp4";
import proofingClient from "../../../assets/images/proofing-client.mp4";
import proofingAdmin from "../../../assets/images/proofing-admin.mp4";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import favoriteSelected from "../../../assets/images/favorite-selected-mobile.jpg";
import arrowTop from "../../../assets/images/arrow-top.png";
import arrowBottom from "../../../assets/images/arrow-bottom.png";
import arrowTop1 from "../../../assets/images/arrowtop1.png";
import proofingEditorial from "../../../assets/images/proofing-editorial1.jpg";
import proofingEditorial1 from "../../../assets/images/proofing-wedding.jpg";
import proofingImage2 from "../../../assets/images/proofing-image2.png";
import proofingImage3 from "../../../assets/images/proofingImage3.png";

const ProofingPage = () => {
  const [imageToggle, setimageToggle] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (imageToggle) {
        setimageToggle(false);
      } else {
        setimageToggle(true);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [imageToggle]);

  return (
    <div id="proofing">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Photo Proofing for Photographers - LightFolio</title>
      </Helmet>
      <section id="downloadPage">
        <div className="section1">
          <div className="left">
            <div className="headerTxt">
              <p>Lightfolio Client Galleries</p>
            </div>
            <h1>Photo proofing software for photographers</h1>
            <p>
              Create beautiful online galleries and empower clients with an
              easy-to-use proofing system.
            </p>
            <div className="link">
              <Link to={"/signup"}>GET STARTED</Link>
            </div>
          </div>

          <div className="right">
            <div className="image">
              <img src={favoriteSelected} alt="favImg" />
              <i className="fa-solid fa-heart"></i>
            </div>
            <video muted autoPlay={"autoplay"} preload="auto" loop>
              <source src={proofingVideo} type="video/webm" />
              Sorry, your browser doesn't support videos.
            </video>
          </div>
        </div>

        <div className="sec2">
          <div className="headerText">
            <p>SIMPLICITY</p>
            <h2>How does online proofing work?</h2>
          </div>

          <div className="cards">
            <div className="card">
              <h4>
                <span>1</span> Upload images
              </h4>
              <p>
                Upload images into a private gallery, created just for your
                client.
              </p>
            </div>

            <div className="images">
              <img src={arrowTop} alt="" />
            </div>

            <div className="card">
              <h4>
                <span>2</span> Send invite
              </h4>
              <p>
                Let clients know their gallery is ready by emailing an
                invitation.
              </p>
            </div>

            <div className="images">
              <img src={arrowBottom} alt="" />
            </div>

            <div className="card">
              <h4>
                <span>3</span> Client selects
              </h4>
              <p>
                Your client(s) collaborate with you by choosing their favorites.
              </p>
            </div>

            <div className="images">
              <img src={arrowTop1} alt="" className="arrowTop1" />
            </div>

            <div className="card">
              <h4>
                <span>4</span> View choices
              </h4>
              <p>
                Get notified and review all of your clients selections +
                comments.
              </p>
            </div>
          </div>

          <div className="videos">
            <div className="video">
              <video muted autoPlay={"autoplay"} preload="auto" loop>
                <source src={proofingClient} type="video/webm" />
                Sorry, your browser doesn't support videos.
              </video>
              <video
                muted
                autoPlay={"autoplay"}
                preload="auto"
                loop
                className="adminVideo"
              >
                <source src={proofingAdmin} type="video/webm" />
                Sorry, your browser doesn't support videos.
              </video>
            </div>

            <p>
              <i>
                Clients select images from their gallery. You review what
                they've selected. Easy client proofing!
              </i>
            </p>
          </div>
        </div>

        <section className="sec3">
          <div className="left">
            <p>FAVORITES</p>
            <h2>Powerful Proofing Options</h2>
            <div className="text">
              {" "}
              <p>
                Lightfolio proofing goes beyond the basics. Give your clients
                the ability to save and view selections across multiple devices.
                Give them the option to organize their selections into multiple
                lists and allow them to invite others to help mark favorites.
              </p>
            </div>
            <Link to={"/signup"}>GET STARTED</Link>
          </div>

          <div className="right">
            <img
              src={imageToggle ? proofingEditorial : proofingEditorial1}
              alt="weedingImage"
            />
          </div>
        </section>

        <section className="colour">
          <div className="color">
            <div className="right">
              <img src={proofingImage2} alt="weedingImage" />
            </div>

            <div className="left">
              <p>DESIGN</p>
              <h2>Customize Your Gallery</h2>
              <div className="text">
                {" "}
                <p>
                  Create a customized proofing experience. Make each gallery
                  yours by choosing from multiple design options, including
                  cover pages, thumbnail sizes and styles, along with many more
                  options.
                </p>
              </div>
              <Link to={"/signup"}>GET STARTED</Link>
            </div>
          </div>
        </section>

        <section className="sec3 sec">
          <div className="left">
            <p>COMMENTS</p>
            <h2>Easy client communication</h2>
            <div className="text">
              {" "}
              <p>
                Proofing is a collaborative process. You and your clients can
                send messages all within the app, on an image by image basis.
              </p>
            </div>
            <Link to={"/signup"}>GET STARTED</Link>
          </div>

          <div className="right">
            <img src={proofingImage3} alt="weedingImage" />
          </div>
        </section>

        <section className="section4">
          <div className="headerText">
            <h2>Every essential feature for easy photo proofing</h2>
            <p>
              Not every client is the same. Fine tune each gallery by turning on
              only the features and options you need.
            </p>
          </div>
        </section>

        <div className="section2">
          <div className="cards">
            
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-comments"></i>
              </div>
              <div className="text">
                <h4>Commenting</h4>
                <p>
                  By enabling the commenting feature, clients can apply notes to
                  individual images.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-lock"></i>
              </div>
              <div className="text">
                <h4>Passwords</h4>
                <p>
                  Give access to the public or protect your galleries by
                  enabling a password requirement.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-c"></i>
              </div>
              <div className="text">
                <h4>Watermarks</h4>
                <p>
                  Protect your work by applying an optional watermark to some or
                  all of your images.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-cloud-arrow-down"></i>
              </div>
              <div className="text">
                <h4>Downloads</h4>
                <p>
                  Turn on self service <Link to={"/"}>downloads</Link> for
                  specific folders or the entire gallery.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-mobile"></i>
              </div>
              <div className="text">
                <h4>Mobile Friendly</h4>
                <p>
                  Our proofing platform works just as well on your clients
                  mobile device.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-dollar-sign"></i>
              </div>
              <div className="text">
                <h4>Sales</h4>
                <p>
                  Besides the ability to proof images, you can enable galleries
                  with online sales (prints or downloads).
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-globe"></i>
              </div>
              <div className="text">
                <h4>Custom Domain</h4>
                <p>
                  If branding is important to you, upgrade to a paid plan and
                  start using your own domain to present your images.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-earth-americas"></i>
              </div>
              <div className="text">
                <h4>Multilingual</h4>
                <p>
                  Lightfolio supports a dozen different languages. Present your
                  galleries in the native language of your client base.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-robot"></i>
              </div>
              <div className="text">
                <h4>Analytics</h4>
                <p>
                  Quickly identify which images have been viewed, how many
                  times, and which images have comments and have been favorited.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-folder"></i>
              </div>
              <div className="text">
                <h4>Folders</h4>
                <p>
                  Organize the images from your shoot and group related images
                  into separate folders.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-magnifying-glass-plus"></i>
              </div>
              <div className="text">
                <h4>Search</h4>
                <p>
                  Give your clients the ability to search for images based on
                  image descriptions and keywords.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ProofingPage;
