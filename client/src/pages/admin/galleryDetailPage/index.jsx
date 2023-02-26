import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComp from "../../../components/loading";
import Draggable from "react-draggable";
import "./index.scss";
import mediumZoom from "medium-zoom";
import Helmet from "react-helmet";
import { useDropzone } from "react-dropzone";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormLabel,
  FormControl,
  FormHelperText,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { convertToBase64, createPost } from "../../../services";
import { useToast } from "@chakra-ui/react";
import ProgressBar from "../../../components/progressBar";
import { useForm } from "react-hook-form";

const GalleryDetailPage = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const toast = useToast();
  const [toggle, setToggle] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  // Modal State
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: newImageisOpen,
    onOpen: newImageonOpen,
    onClose: newImageClose,
  } = useDisclosure();
  const {
    isOpen: galleryDeleteIsOpen,
    onOpen: galleyDeleteOnOpen,
    onClose: galleryDeleteOnClose,
  } = useDisclosure();
  const {
    isOpen: editGalleryisOpen,
    onOpen: editGalleryonOpen,
    onClose: editGalleryonClose,
  } = useDisclosure();

  const navigate = useNavigate();
  const handleDrag = (e, data) => {
    console.log(data.lastX);
    console.log(data.lastX);
  };

  // console.log(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Get Users Gallery and Gallery Images
  const getGalleryImage = async () => {
    setLoading(true);
    let { data } = await axios.get(
      `http://localhost:3000/images/${localStorage.getItem("id")}/${id}`
    );
    setLoading(false);
    setData(data);
    setImages(data.galleryImage);
    console.log(data);
  };

  useEffect(() => {
    getGalleryImage();
  }, []);

  // Gallery Public or Personal
  const directionEdit = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/galleryDirection/${userData.data._id}/${data._id}`,
        { direction: !data.galleryDirection }
      );

      toast({
        title: `${response.data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${response.data.error}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Image Zoom Effect
  useEffect(() => {
    mediumZoom(".draggableGallery img");
  }, [data]);

  // DropZone image download
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      handleFileUpload(acceptedFiles[0]);
    },
  });

  const handleFileUpload = async (e) => {
    const file = e;
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  const handleFileInput = async (e) => {
    const file = e.target.file[0];
    const base64 = await convertToBase64(file);
    setPostImage({ ...postImage, myFile: base64 });
  };

  // Gallery CoverImage download and change
  const handleCoverImageUpload = async () => {
    try {
      setLoading(true);
      await createPost(postImage, "coverImage", data._id, userData.data._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Gallery Image download
  const handleImageUpload = async () => {
    try {
      setLoading(true);
      const response = await createPost(
        postImage,
        "uploads",
        data._id,
        userData.data._id,
        setLoadedPercent
      );
      // toast({
      //   title: `${response.data.message}`,
      //   position: "bottom-right",
      //   status: "success",
      //   isClosable: true,
      // });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: `${error}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  // Gallery Delete
  const galleryDeleteById = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3000/galleryDelete/${userData.data._id}/${data._id}`
      );
      toast({
        title: `${response.data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
      if (response.data.delete) {
        navigate("/admin/galleries/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Share
  const url = window.location.href;

  const handleClick = async () => {
    try {
      await navigator.share({
        title: "LightFolio",
        text: `${userData.data.fullName}'s Gallery`,
        url: url,
      });
      toast({
        title: `SHARE SUCCESS`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${error}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    }
  };

  // Image Delete
  const imageDelete = async (imageId) => {
    try {
      const updatedImages = images.filter((img) => img._id !== imageId);
      setImages(updatedImages);

      const response = await axios.delete(
        `http://localhost:3000/imageDelete/${userData.data._id}/${data._id}/${imageId}`
      );
      toast({
        title: `${response.data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: `${error}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  //Edit Gallery name
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/editGalleryName/${userData.data._id}`,
        { value: values, albomId: data._id }
      );

      response.data.status && editGalleryonClose();

      toast({
        title: `${response.data.message}`,
        position: "bottom-right",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: `${error}`,
        position: "bottom-right",
        status: "error",
        isClosable: true,
      });
    }
  };

  // const imageDownloadToClick = async (base64Image) => {
  //   var base64 = base64Image;
  //   var binary = atob(base64);
  //   console.log(binary);
  //   var blob = new Blob([binary], { type: "image/png" });
  //   var url = URL.createObjectURL(blob);
  //   setBlob(url);
  // };

  return (
    <div id="galleryDetail">
      {loading ? (
        <LoadingComp />
      ) : (
        <div className="galleryImage">
          <Helmet>
            <title>{data?.seoTitle || data?.galleryName}</title>
          </Helmet>
          <div className="galleryName">
            <div className="image">
              <div className="userData">
                <img src={data?.coverImage?.coverImg} alt="" onClick={onOpen} />
                <h2>{data?.galleryName}</h2>{" "}
                <i
                  className="fa-solid fa-pen-to-square"
                  title="Edit Gallery Name"
                  onClick={editGalleryonOpen}
                ></i>
              </div>
              <div className="publishAndShare">
                <button
                  style={
                    data?.galleryDirection
                      ? null
                      : { backgroundColor: "darkred" }
                  }
                  onClick={() => {
                    directionEdit();
                  }}
                >
                  {data?.galleryDirection ? (
                    <>
                      <i className="fa-solid fa-circle-check"></i> PUBLISHED
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-xmark"></i> PERSONAL
                    </>
                  )}
                </button>
                <div className="share">
                  <button onClick={handleClick}>
                    <i className="fa-solid fa-square-share-nodes"></i> SHARE
                  </button>
                </div>
              </div>
            </div>

            <div className="operationNav">
              <div className="upload" onClick={newImageonOpen}>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>UPLOAD IMAGES</span>
              </div>
              <div className="trash" onClick={galleyDeleteOnOpen}>
                <i className="fa-solid fa-trash"></i>
              </div>

              <div className="editBar">. . .</div>
            </div>
          </div>
          {images.length === 0 ? (
            <div>
              <FormControl>
                <div {...getRootProps()} className="coverImage">
                  <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                  <FormHelperText>
                    The date the photos were taken.
                  </FormHelperText>
                  <input
                    {...getInputProps()}
                    id="coverImage"
                    onChange={(e) => {
                      handleFileInput(e);
                    }}
                  />
                  {acceptedFiles.length > 0 && (
                    <p>Selected file: {acceptedFiles[0].name}</p>
                  )}
                </div>
                <div className="progress-text">{loadedPercent}%</div>
                <ProgressBar loadedPercent={loadedPercent} />
                <Button
                  colorScheme="blue"
                  mr={3}
                  isLoading={loading}
                  onClick={handleImageUpload}
                >
                  {loadedPercent === 100 ? "Loaded" : "Upload"}
                </Button>
              </FormControl>
            </div>
          ) : (
            <div className="draggableGallery">
              <div className="grid-container">
                {images?.map((image, index) => {
                  return (
                    <Draggable
                      key={index}
                      onStop={handleDrag}
                      // bounds={{ left: 0, top: 0, right: 700, bottom: 500 }}
                    >
                      <div className="draggableGallery">
                        <img src={image.image} alt={`image`} />
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => {
                            imageDelete(image._id);
                          }}
                        ></i>
                      </div>
                    </Draggable>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cover Image Modal */}
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload to your Gallery Cover Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <div {...getRootProps()} className="coverImage">
                <FormLabel htmlFor="coverImage">Cover Image</FormLabel>
                <FormHelperText>The date the photos were taken.</FormHelperText>
                <input
                  {...getInputProps()}
                  id="coverImage"
                  onChange={(e) => {
                    handleFileInput(e);
                  }}
                />
                {acceptedFiles.length > 0 && (
                  <p>Selected file: {acceptedFiles[0].name}</p>
                )}
              </div>
              <div className="progress-text">{loadedPercent}%</div>
              <ProgressBar loadedPercent={loadedPercent} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              onClick={handleCoverImageUpload}
            >
              Upload
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* New Image Modal */}

      <Modal
        closeOnOverlayClick={false}
        isOpen={newImageisOpen}
        onClose={newImageClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload to your Gallery Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <div {...getRootProps()} className="coverImage">
                <FormLabel htmlFor="coverImage">New Image</FormLabel>
                <FormHelperText>The date the photos were taken.</FormHelperText>
                <input
                  {...getInputProps()}
                  id="coverImage"
                  onChange={(e) => {
                    handleFileInput(e);
                  }}
                />
                {acceptedFiles.length > 0 && (
                  <p>Selected file: {acceptedFiles[0].name}</p>
                )}
              </div>
              <div className="progress-text">{loadedPercent}%</div>
              <ProgressBar loadedPercent={loadedPercent} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              onClick={handleImageUpload}
            >
              {loadedPercent === 100 ? "Loaded" : "Upload"}
            </Button>
            <Button
              onClick={() => {
                newImageClose();
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* edit Gallery Name */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={editGalleryisOpen}
        onClose={editGalleryonClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EDIT GALLERY NAME</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.name}>
                <FormLabel htmlFor="name">Gallery Name:</FormLabel>
                <Input
                  id="name"
                  placeholder="Gallery Name"
                  defaultValue={data.galleryName}
                  {...register("name", {
                    required: "Gallery Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum length should be 3",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                SAVE
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                editGalleryonClose();
              }}
            >
              CANCEL
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Gallery */}

      <AlertDialog
        isOpen={galleryDeleteIsOpen}
        onClose={galleryDeleteOnClose}
        id="deleteModal"
      >
        <AlertDialogOverlay>
          <AlertDialogContent className="alert">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {loading ? <span className="loader"></span> : "Delete Gallery"}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={galleryDeleteOnClose}>Cancel</Button>
              <Button colorScheme="red" onClick={galleryDeleteById} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default GalleryDetailPage;
