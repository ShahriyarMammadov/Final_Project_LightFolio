import React from "react";
import "./index.scss";
import { useSelector } from "react-redux";

const WhatsNewPage = () => {
  const userDataRedux = useSelector((state) => state.getAllUserDataReducer);
  console.log(userDataRedux);

  return (
    <div id="whatsNew">
      <div className="whatsNew">
        {userDataRedux?.data?.whatsNew?.map((element) => {
          return (
            <>
              <p>{element.author}</p>
              <p>{element.newHeaderText}</p>
              <p>{element.newAboutText}</p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default WhatsNewPage;
