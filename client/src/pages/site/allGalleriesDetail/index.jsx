import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import LoadingComp from "../../../components/loading/index";
import { Rate } from "antd";
import {
  deleteFavoriteAction,
  favoriteAction,
} from "../../../redux/action/favorite.action";
import { useDispatch, useSelector } from "react-redux";
import mediumZoom from "medium-zoom";

const AllGalleriesDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [toggleWishList, settoggleWishList] = useState(false);

  const { id } = useParams();
  // const [images, setImages] = useState({});

  const wishData = useSelector((state) => state.favReducer);
  const dispatch = useDispatch();

  const getGalleryData = async () => {
    const response = await axios.get(
      `http://localhost:3000/publicGallery/${id}`
    );
    await setData(response.data);
    console.log(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getGalleryData();
  }, []);

  const handleRating = (rating) => {
    console.log(rating);
  };

  const handleWishList = async (galleryData) => {
    settoggleWishList(!toggleWishList);

    if (toggleWishList) {
      dispatch(favoriteAction(galleryData));

      data.galleries.filter((element) => {
        console.log(element._id !== galleryData._id);
      });
      // localStorage.setItem("wishList",JSON.stringify());
    } else {
      dispatch(deleteFavoriteAction(galleryData));
    }
  };

  useEffect(() => {
    mediumZoom(".gallery img");
  }, [data]);

  return (
    <div id="allGalleriesDetail">
      <Helmet>
        <title>{data?.galleryName}</title>
      </Helmet>

      {loading ? (
        <LoadingComp />
      ) : (
        <div className="allgalleriesPage">
          <div className="galleryDetail">
            {data?.galleries.map((e, i) => {
              return (
                <>
                  <div className="galleryImageAndName">
                    <div className="imageAndName" key={i}>
                      <img src={e?.coverImage?.coverImg} alt={e?.galleryName} />
                      <h1>{e?.galleryName}</h1>
                    </div>
                    <div className="rateAndWishList" key={e._id}>
                      <Rate
                        allowHalf
                        defaultValue={4.5}
                        onChange={(e) => {
                          handleRating(e);
                        }}
                      />
                      <i
                        className="fa-solid fa-heart"
                        onClick={() => {
                          handleWishList(e);
                        }}
                      ></i>
                    </div>
                  </div>

                  <div className="grid-container">
                    {e?.galleryImage.map((image, index) => {
                      return (
                        <div className="gallery" key={index}>
                          <img src={image.image} alt={`image`} />
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllGalleriesDetail;