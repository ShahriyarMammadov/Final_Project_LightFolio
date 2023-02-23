import React from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import LoadingComponent from "../../../components/loading";
import { Link } from "react-router-dom";

const GalleriesPage = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);
  console.log(userData.data);

  const expiration = new Date();
  const expirationDate =
    expiration.getMonth() + 1 < 10
      ? `${expiration.getFullYear()}-0${
          expiration.getMonth() + 1
        }-${expiration.getDate()}T${expiration.getHours()}:${expiration.getMinutes()}`
      : `${expiration.getFullYear()}-${
          expiration.getMonth() + 1
        }-${expiration.getDate()}T${expiration.getHours()}:${expiration.getMinutes()}`;

  return (
    <div id="galleriesPage">
      {userData.loading ? (
        <LoadingComponent />
      ) : (
        <div className="galleries">
          {userData.data.galleries &&
            userData?.data?.galleries?.map((gallery, index) => {
              return (
                <Link to={`/galleriesDetail/${gallery._id}`} key={index}>
                  <div className="card">
                    <div className="expired">
                      {gallery?.expirationDate.slice(0, 10) >=
                      expirationDate.slice(0, 10) ? (
                        ""
                      ) : (
                        <p>EXPIRED</p>
                      )}
                    </div>
                    <div className="galleryImage">
                      <img
                        src={`${gallery?.coverImage?.coverImg}`}
                        alt={gallery?.galleryName}
                      />
                      <h6>{gallery?.galleryName}</h6>
                    </div>

                    <div className="galleryName">
                      <p>{gallery?.galleryName}</p>
                      <div className="visitorAndImageLength">
                        <span>0</span>
                        <i className="fa-solid fa-images"></i>
                        <span>1</span>
                        <i className="fa-solid fa-eye"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default GalleriesPage;
