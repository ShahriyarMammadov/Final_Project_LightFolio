import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingComp from "../../../components/loading";
import Draggable from "react-draggable";
import "./index.scss";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookShareCount,
} from "react-share";
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
  const { id } = useParams();
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const toast = useToast();
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
  const [toggle, setToggle] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  const navigate = useNavigate();
  const handleDrag = (e, data) => {
    console.log(data.lastX);
    console.log(data.lastX);
  };

  const [blob, setBlob] = useState("");

  // console.log(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const getGalleryImage = async () => {
    setLoading(true);
    let { data } = await axios.get(
      `http://localhost:3000/images/${localStorage.getItem("id")}/${id}`
    );
    setLoading(false);
    setData(data);
    console.log(data);
  };

  useEffect(() => {
    getGalleryImage();
  }, []);

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

  const handleCoverImageUpload = async () => {
    try {
      setLoading(true);
      await createPost(postImage, "coverImage", data._id, userData.data._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const cancelRef = React.useRef();

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

  const imageDelete = async () => {};

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const response = await axios.patch(
      `http://localhost:3000/editGalleryName`,
      values
    );

    console.log(response.data);
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
          <div className="galleryName">
            <div className="image">
              <div className="userData">
                <img src={data?.coverImage?.coverImg} alt="" onClick={onOpen} />
                <h2>{data?.galleryName}</h2>
              </div>
              <div className="publishAndShare">
                <button
                  style={
                    data?.galleryDirection ? null : { backgroundColor: "red" }
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

              <div className="editBar" onClick={editGalleryonOpen}>
                . . .
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
                <FormLabel htmlFor="name">First name</FormLabel>
                <Input
                  id="name"
                  placeholder="name"
                  {...register("name", {
                    required: "This is required",
                    minLength: {
                      value: 4,
                      message: "Minimum length should be 4",
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
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} isLoading={loading}>
              SAVE
            </Button>
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
        leastDestructiveRef={cancelRef}
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
              <Button ref={cancelRef} onClick={galleryDeleteOnClose}>
                Cancel
              </Button>
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
