import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import LoadingComp from "../../../components/loading/index";

const AllGalleriesDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const getGalleryData = async () => {
    const response = await axios.get(
      `http://localhost:3000/publicGallery/${id}`
    );
    await setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getGalleryData();
  }, []);
  console.log(data);
  return (
    <div id="allGalleriesDetail">
      <Helmet>
        <title>{data?.galleryName}</title>
      </Helmet>

      {loading ? (
        <LoadingComp />
      ) : (
        <div className="allgalleriesPage">
          <div className="galleryDetail"></div>
        </div>
      )}
    </div>
  );
};

export default AllGalleriesDetail;
