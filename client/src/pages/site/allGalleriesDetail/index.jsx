import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import Helmet from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComp from "../../../components/loading/index";
import { Rate, Modal, Input } from "antd";
import {
  deleteFavoriteAction,
  favoriteAction,
} from "../../../redux/action/favorite.action";
import { useDispatch, useSelector } from "react-redux";
import mediumZoom from "medium-zoom";
import { useToast } from "@chakra-ui/react";
import { useCookies } from "react-cookie";

const AllGalleriesDetail = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [rating, setRating] = useState(5);
  const [seoTitle, setSeoTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [image, setImage] = useState({});
  const [commentToggle, setCommentToggle] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [likeToggle, setlikeToggle] = useState(Boolean);

  const { id } = useParams();
  const toast = useToast();

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
  }, [likeToggle]);

  useEffect(() => {
    data?.galleries?.map((seoTitle) => {
      setSeoTitle(seoTitle.seoTitle);
    });
  }, []);

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
    const toggle = JSON.parse(localStorage.getItem("wishList"))?.some(
      (item) => item?._id === galleryData?._id
    );

    if (toggle) {
      dispatch(deleteFavoriteAction(galleryData));
      newWishList = newWishList?.filter((item) => item._id !== galleryData._id);
    } else {
      dispatch(favoriteAction(galleryData));
      newWishList.push(galleryData);
    }

    localStorage.setItem("wishList", JSON.stringify(newWishList));
  };

  useEffect(() => {
    mediumZoom(".gallery img");
  }, [data]);

  //Comment
  const [commentsArr, setCommentsArr] = useState([]);

  const AddedComment = async () => {
    try {
      if (comment.length < 1) {
        toast({
          title: `minimum length 1`,
          position: "bottom-right",
          status: "warning",
          isClosable: true,
        });
      } else {
        commentsArr.push({ comment: comment, name: commentName });
        setCommentToggle(true);
        const response = await axios.post(
          `http://localhost:3000/comment/${id}`,
          {
            comment: comment,
            name: commentName,
            imageId: image.id,
          }
        );

        setComment("");
        setCommentName("");

        toast({
          title: response.data.message,
          position: "bottom-right",
          status: "success",
          isClosable: true,
        });
      }
    } catch (error) {
      alert(error);
      toast({
        title: error,
        position: "bottom-right",
        status: "warning",
        isClosable: true,
      });
    }
  };

  //Share
  const url = window.location.href;

  const handleClick = async () => {
    try {
      await navigator.share({
        title: "LightFolio",
        text: `${data.fullName}'s Gallery`,
        url: url,
      });
    } catch (error) {
      toast({
        title: `Your Browser Does not Support it`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  //User ID
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="));
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.id);
    }
  }, []);

  // LIKE
  const navigate = useNavigate();

  const handleLike = async (imageId) => {
    if (!cookies.jwt) {
      navigate("/login");
    } else {
      const response = await axios.post(
        `http://localhost:3000/likeImage/${imageId}`,
        { userId: data._id, galleryId: id },
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        setlikeToggle(!likeToggle);
      }
    }
  };

  return (
    <div id="allGalleriesDetail">
      <Helmet>
        <title>{seoTitle ? seoTitle : data?.companyName}</title>
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
                      {JSON.parse(localStorage.getItem("wishList"))?.some(
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
                          <img src={image?.image} alt={`image`} />
                          <span className="imageNavText">
                            {image?.likes?.some((like) => like === userId) ? (
                              <>
                                <i
                                  className="fa-solid fa-heart"
                                  onClick={() => {
                                    handleLike(image._id);
                                  }}
                                  style={{ color: "red" }}
                                >
                                  <p>{image?.likes?.length}</p>
                                </i>
                              </>
                            ) : (
                              <>
                                <i
                                  className="fa-regular fa-heart"
                                  onClick={() => {
                                    handleLike(image._id);
                                  }}
                                >
                                  <p>{image?.likes?.length}</p>
                                </i>
                              </>
                            )}
                            <i
                              className="fa-regular fa-comments left"
                              onClick={() => {
                                setImage({
                                  image: image?.image,
                                  id: image?._id,
                                  comments: image?.comments,
                                });
                                setOpen(true);
                              }}
                            ></i>
                            <a
                              href={image?.image}
                              download={`${data?.companyName}`}
                            >
                              <i className="fa-solid fa-cloud-arrow-down left"></i>
                            </a>
                            <i
                              className="fa-solid fa-share-nodes left"
                              onClick={handleClick}
                            ></i>
                          </span>
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

          <Modal
            title="Add to Comment"
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            <div id="commentModal">
              <img src={image?.image} alt="image" />
              <div className="comment">
                <div className="allComment">
                  {image?.comments?.map((comment) => {
                    return (
                      <>
                        <h6>{comment?.name}</h6>
                        <p>{comment?.comment}</p>
                        <hr />
                      </>
                    );
                  })}
                  {commentToggle &&
                    commentsArr?.map((comments) => {
                      return (
                        <>
                          <h6>
                            {comments?.name ? comments.name : "Anonymous"}
                          </h6>
                          <p>{comments?.comment}</p>
                        </>
                      );
                    })}
                </div>
                <div className="addComment">
                  <div>
                    <Input
                      showCount
                      placeholder="Your Comment"
                      maxLength={50}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      value={comment}
                    />
                  </div>
                  <div>
                    <Input
                      className="commentName"
                      showCount
                      placeholder="Your Name"
                      maxLength={10}
                      onChange={(e) => {
                        setCommentName(e.target.value);
                      }}
                      value={commentName}
                    />
                  </div>
                  <button onClick={AddedComment}>SEND</button>
                </div>
                <div className="shareModal">
                  <i
                    className="fa-solid fa-share-nodes"
                    onClick={handleClick}
                  ></i>
                  <a href={image?.image} download={`${data?.companyName}`}>
                    <i className="fa-solid fa-cloud-arrow-down"></i>
                  </a>
                  <i className="fa-regular fa-heart"></i>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default AllGalleriesDetail;
