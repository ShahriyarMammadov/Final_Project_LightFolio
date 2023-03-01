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
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [rating, setRating] = useState(5);

  const { id } = useParams();
  // const [images, setImages] = useState({});

  const wishData = useSelector((state) => state.favReducer);
  const dispatch = useDispatch();

  let wisharr = JSON.parse(localStorage.getItem("wishList")) ?? [];

  const getGalleryData = async () => {
    const response = await axios.get(
      `http://localhost:3000/publicGallery/${id}`
    );
    await setData(response?.data);
    setEmail(`mailto: ${response?.data?.business?.businessEmail}`);
    setTelephone(`tel: ${response?.data?.business?.businessPhone}`);
    setLoading(false);
  };

  useEffect(() => {
    getGalleryData();
  }, []);

  console.log(data);

  const handleRating = async (rating, id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/rating/${id}`, {
        newRating: rating,
      });
      setRating(response?.data?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishList = async (galleryData) => {
    let newWishList = [...wisharr];
    const toggle = JSON.parse(localStorage.getItem("wishList")).some(
      (item) => item?._id === galleryData?._id
    );

    if (toggle) {
      dispatch(deleteFavoriteAction(galleryData));
      newWishList = newWishList.filter((item) => item._id !== galleryData._id);
    } else {
      dispatch(favoriteAction(galleryData));
      newWishList.push(galleryData);
    }

    localStorage.setItem("wishList", JSON.stringify(newWishList));
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
            {data?.galleries?.map((e, i) => {
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
                        defaultValue={rating}
                        onChange={(rating) => {
                          handleRating(rating, e._id);
                        }}
                      />
                      {JSON.parse(localStorage.getItem("wishList")).some(
                        (item) => item?._id === e?._id
                      ) ? (
                        <i
                          className="fa-solid fa-heart"
                          onClick={() => {
                            handleWishList(e);
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fa-regular fa-heart"
                          onClick={() => {
                            handleWishList(e);
                          }}
                        ></i>
                      )}
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

                  <div className="businessAbout">
                    <div className="about">
                      <h5>
                        <span>Company Name: </span> {data?.companyName}
                      </h5>
                      <h4>
                        <span>City: </span>
                        {data?.business?.city}
                      </h4>
                    </div>

                    <div className="contact">
                      <div className="usContact">
                        <a href={telephone}>
                          <span>Phone: </span>
                          {data?.business?.businessPhone}
                        </a>
                        <a href={email}>
                          <span>Email: </span>
                          {data?.business?.businessEmail}
                        </a>
                        <p>{data?.business?.addressLine1}</p>
                      </div>

                      <div className="webContact">
                        {data?.socialMedia?.faceBookUrl && (
                          <a
                            href={data?.socialMedia?.faceBookUrl}
                            target="_blank"
                            className="sosial"
                          >
                            <i className="fa-brands fa-facebook"></i>
                          </a>
                        )}
                        {data?.socialMedia?.instagramUrl && (
                          <a
                            href={data?.socialMedia?.instagramUrl}
                            target="_blank"
                            className="sosial"
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        )}
                        {data?.socialMedia?.pinterestUrl && (
                          <a
                            href={data?.socialMedia?.pinterestUrl}
                            target="_blank"
                            className="sosial"
                          >
                            <i className="fa-brands fa-pinterest"></i>
                          </a>
                        )}
                        {data?.socialMedia?.twitterUrl && (
                          <a
                            href={data?.socialMedia?.twitterUrl}
                            target="_blank"
                            className="sosial"
                          >
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                        )}
                        {data?.socialMedia?.youtubeUrl && (
                          <a
                            href={data?.socialMedia?.youtubeUrl}
                            target="_blank"
                            className="sosial"
                          >
                            <i className="fa-brands fa-youtube"></i>
                          </a>
                        )}
                        {data?.socialMedia?.tiktokUrl && (
                          <a
                            href={data?.socialMedia?.tiktokUrl}
                            target="_blank"
                            className="sosial"
                          >
                            <i className="fa-brands fa-tiktok"></i>
                          </a>
                        )}
                      </div>

                      <div className="signature">
                        <h4>{data?.signature}</h4>
                      </div>
                    </div>
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
