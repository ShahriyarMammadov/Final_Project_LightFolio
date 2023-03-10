import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import LoadingComp from "../../../components/loading";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";

const AllGalleries = () => {
  const [data, setData] = useState([]);



  const [loading, setLoading] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(12);

  // Get All Direction: true galleries
  const getGalleries = async () => {
    setLoading(true);
    const response = await axios.get(`http://localhost:3000/allGalleries`);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getGalleries();
  }, []);

  return (
    <div id="allGalleries">
      <Helmet>
        <title>Galleries | LightFolio</title>
      </Helmet>
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <div className="galleryHeader">
            <h2>All Galleries</h2>
            <p>VIEW AND CHOOSE YOUR FAVORITE</p>
          </div>
          <div className="gallery">
            {data
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
              })}
          </div>
          {data?.length > 12 && (
            <button
              className="sliceButton"
              onClick={() => {
                setSliceNumber(sliceNumber + 12);
              }}
            >
              Show more Gallery
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default AllGalleries;
