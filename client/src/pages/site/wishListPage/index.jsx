import React, { useState } from "react";
import "./index.scss";
import { Link, useNavigate } from "react-router-dom";

const WishListPage = () => {
  const wishArray = JSON.parse(localStorage.getItem("wishList")) ?? [];
  const [sliceNumber, setSliceNumber] = useState(12);

  const navigate = useNavigate();

  return (
    <div id="wishListPage">
      <div className="cancelBtn">
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="fa-solid fa-circle-left"></i> BACK
        </button>
      </div>
      <div className="gallery">
        {wishArray.length === 0 ? (
          <>
            <h2 className="lenghth2">
              There is Nothing in Your Favorites Yet, Choose the Gallery you
              Like
            </h2>
            <Link to={"/galleries"} className={"galleriesSend"}>
              Go to the Galleries{" "}
              <i className="fa-solid fa-arrow-right-long"></i>
            </Link>
          </>
        ) : (
          wishArray
            ?.slice(0, sliceNumber)
            .reverse()
            .map((gallery, i) => {
              return (
                <Link to={`/galleriesDetail/${gallery._id}`} key={i}>
                  <div className="imageCard">
                    <div className="card card1">
                      <img
                        src={gallery?.coverImage?.coverImg}
                        alt={gallery?.galleryName}
                      />
                      <div className="text">
                        <p>
                          <em>{gallery?.galleryName}</em>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
        )}
      </div>
      {wishArray?.length > 12 && (
        <button
          className="sliceButton"
          onClick={() => {
            setSliceNumber(sliceNumber + 12);
          }}
        >
          Show more Gallery
        </button>
      )}
    </div>
  );
};

export default WishListPage;
