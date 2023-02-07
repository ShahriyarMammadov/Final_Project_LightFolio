import React from "react";
import TabComponent from "../../../components/tab";
import { Helmet } from "react-helmet";
import "./index.scss";

const PricingPage = () => {
  return (
    <div id="pricing">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Pricing - Lightfolio</title>
      </Helmet>
      <div className="headerText">
        <h2>Online galleries for modern photographers</h2>
        <p>Get started for free. Upgrade when you need more storage.</p>
      </div>
      <div className="tab">
        <TabComponent />
      </div>

      <section id="section2">
        <div className="headerText">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="textCard">
          <div className="left">
            <div className="card">
              <h4>HOWS DOES THE FREE ACCOUNT WORK?</h4>
              <p>
                Creating your free account gives you access to most every
                feature. Your account is free for life--upgrade to any paid plan
                for more storage.
              </p>
            </div>

            <div className="card">
              <h4>HOW DO I CHANGE OR CANCEL MY SUBSCRIPTION?</h4>
              <p>
                You can easily upgrade, change and cancel your plan at any time.
                There is no lock and no obligation beyond the monthly fee.
              </p>
            </div>
            <div className="card">
              <h4>I HAVE A QUESTION--HOW DO I CONTACT SUPPORT?</h4>
              <p>
                We're always happy to help. Please feel free to email us at{" "}
                <span
                  onClick={(e) => {
                    window.location.href = "mailto:hello@lightfolio.com";
                  }}
                >
                  hello@lightfolio.com
                </span>
              </p>
            </div>
          </div>

          <div className="right">
            <div className="card">
              <h4>AM I REQUIRED TO SIGN A CONTRACT?</h4>
              <p>
                Absolutely not. Every plan is available on a month-to-month
                basis.
              </p>
            </div>
            <div className="card salesCard">
              <h4>DO YOU CHARGE SALES COMMISSION FEES?</h4>
              <p>
                Most paid plans have no commission. The free plan charges a 15%
                fee only if and when you make a sale.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
