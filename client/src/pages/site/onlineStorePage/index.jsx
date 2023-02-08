import React from "react";
import storeImg from "../../../assets/images/order-page.jpg";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import "./index.scss";

const OnlineStorePage = () => {
  return (
    <div id="onlineStore">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Online Store - LightFolio</title>
      </Helmet>
      <section id="onlinePage">
        <div className="section1">
          <div className="left">
            <h1>Online Store</h1>
            <p>
              Set up shop with your own online store. Easily sell prints,
              downloads and more in any gallery.
            </p>
            <div className="link">
              <Link to={"/signup"}>GET STARTED</Link>
            </div>
          </div>

          <div className="right">
            <img src={storeImg} alt="" />
          </div>
        </div>

        <div className="section2">
          <div className="headerText">
            <h2>How It Works</h2>
            <p>
              Selling with Lightfolio is easy. Use the sales setup wizard to
              painlessly enable your online store. Set your own prices,
              shipping, and sales taxes. Choose to fulfill your own orders or
              use one of our professional lab partners. Lastly, connect to
              Stripe or PayPal to process online payments. Now you're ready to
              go!
            </p>
          </div>
          <div className="cards">
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-file-invoice-dollar"></i>
              </div>
              <div className="text">
                <h4>PRICE LISTS</h4>
                <p>
                  Create custom price lists for every gallery. Control which
                  products you want to sell and for how much markup. Add
                  pictures and product description.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-box"></i>
              </div>
              <div className="text">
                <h4>SELF FULFILLMENT</h4>
                <p>
                  Take control of your orders. You're responsible for order
                  fulfillment and shipping. Sell any product you can produce.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="icon">
                <i className="fa-solid fa-cubes"></i>
              </div>
              <div className="text">
                <h4>LAB FULFILLMENT</h4>
                <p>
                  Let one of our <Link to={"/lab-partners"}>lab partners</Link>{" "}
                  handle your orders. Sell from their extensive catalog of
                  products and have them ship to your clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlineStorePage;
