import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingComp from "../../../components/loading";
import Draggable from "react-draggable";
import "./index.scss";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  // InstagramShareButton,
  // InstagramIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const GalleryDetailPage = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();

  const handleDrag = (e, data) => {
    console.log(data.lastX);
    console.log(data.lastX);
  };

  const getGalleryImage = async () => {
    setLoading(true);
    let { data } = await axios.get(
      `http://localhost:3000/images/${userData?.data?._id}/${id}`
    );
    setLoading(false);
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    getGalleryImage();
  }, []);

  const url = window.location.href;
  return (
    <div id="galleryDetail">
      {loading ? (
        <LoadingComp />
      ) : (
        <div className="galleryImage">
          <div className="galleryName">
            <div className="image">
              <img src={data?.coverImage?.coverImg} alt="" />
              <h2>{data?.galleryName}</h2>

              <div className="publishAndShare">
                <button>PUBLISHED</button>
                <FacebookShareButton url={url}>
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton url={url}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                {/* <InstagramShareButton url={url}>
                  <InstagramIcon size={32} round />
                </InstagramShareButton> */}
                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </div>
            </div>

            <div className="operationNav">
              <div className="upload">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>UPLOAD IMAGES</span>
              </div>
              <div className="trash">
                <i className="fa-solid fa-trash"></i>
              </div>
            </div>
          </div>
          <div className="draggableGallery">
            {data?.galleryImage?.map((image, index) => {
              return (
                <Draggable
                  key={index}
                  onStop={handleDrag}
                  // bounds={{ left: 0, top: 0, right: 700, bottom: 500 }}
                >
                  <div className="imageDiv">
                    <img src={image.image} alt={`image`} />
                  </div>
                </Draggable>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryDetailPage;
