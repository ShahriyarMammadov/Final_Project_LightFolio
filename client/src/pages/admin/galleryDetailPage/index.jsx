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
  WhatsappShareButton,
  WhatsappIcon,
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
} from "@chakra-ui/react";
import { convertToBase64, createPost } from "../../../services";

const GalleryDetailPage = () => {
  const userData = useSelector((state) => state.getAllUserDataReducer);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const { id } = useParams();
  const [postImage, setPostImage] = useState({
    myFile: "",
  });

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

  const directionEdit = async () => {
    const { response } = await axios.patch(
      `http://localhost:3000/galleryDirection/${userData.data._id}/${data._id}`,
      { direction: !data.galleryDirection }
    );
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
    setLoading(true);
    await createPost(postImage, "coverImage", data._id, userData.data._id);
    setLoading(false);
  };

  const handleImageUpload = async () => {
    setLoading(true);
    await createPost(postImage, "uploads", data._id, userData.data._id);
    setLoading(false);
  };

  const cancelRef = React.useRef();
  const galleryDeleteById = async () => {
    const response = await axios.delete(
      `http://localhost:3000/galleryDelete/${userData.data._id}/${data._id}`
    );
  };
  console.log(cancelRef);

  const url = window.location.href;
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
                  <FacebookShareButton url={url}>
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={url}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton url={url}>
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              onClick={handleCoverImageUpload}
            >
              Save
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
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={loading}
              onClick={handleImageUpload}
            >
              Save
            </Button>
            <Button onClick={newImageClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Gallery */}

      <AlertDialog
        isOpen={galleryDeleteIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={galleryDeleteOnClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
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
