import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import LoadingComp from "../../../components/loading";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AllGalleries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  console.log(data);

  return (
    <div id="allGalleries">
      {loading ? (
        <LoadingComp />
      ) : (
        <>
          <div className="gallery">
            {data?.map((gallery, i) => {
              return (
                <Link to={`/publicGallery/${gallery._id}`} key={i}>
                  <div className="card">
                    <img
                      src={gallery?.coverImage?.coverImg}
                      alt={gallery?.galleryName}
                    />
                    <h6>{gallery?.galleryName}</h6>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AllGalleries;
