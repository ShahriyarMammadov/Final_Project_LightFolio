import React from "react";
import "./index.scss";
import { useSelector } from "react-redux";

const WhatsNewPage = () => {
  const userDataRedux = useSelector((state) => state.getAllUserDataReducer);
  console.log(userDataRedux);

  return (
    <div id="whatsNew">
      <div className="whatsNew">
        {userDataRedux?.data?.whatsNew?.map((element, index) => {
          return (
            <>
              <div className="card" key={index}>
                <div>
                  <h6>{element.newHeaderText}</h6>
                  <p>{element.author}</p>
                </div>
                <div>
                  <p>{element?.newDate}</p>
                  <p>{element.newAboutText}</p>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsNewPage;
