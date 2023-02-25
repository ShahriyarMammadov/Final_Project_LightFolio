import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./index.scss";
import LoadingComponent from "../../../components/loading";
import { Link } from "react-router-dom";
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
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import { convertToBase64, createPost } from "../../../services";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import axios from "axios";

const GalleriesPage = () => {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const userData = useSelector((state) => state.getAllUserDataReducer);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: coverİmageOpen,
    onOpen: onCoverİmageOpen,
    onClose: onCoverClose,
  } = useDisclosure();
  const [postImage, setPostImage] = useState({
    myFile: "",
  });
  const [albomId, setAlbomId] = useState("");
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      handleFileUpload(acceptedFiles[0]);
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const { data } = await axios.post(
      `http://localhost:3000/galleryCreate/${userData.data._id}`,
      values
    );
    onCoverİmageOpen();

    setAlbomId(data.galleryId);
  };

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

  const handleImageUpload = async () => {
    setLoading(true);
    await createPost(postImage, "coverImage", albomId, userData.data._id);
    setLoading(false);
  };

  const expiration = new Date();
  const expirationDate =
    expiration.getMonth() + 1 < 10
      ? `${expiration.getFullYear()}-0${
          expiration.getMonth() + 1
        }-${expiration.getDate()}T${expiration.getHours()}:${expiration.getMinutes()}`
      : `${expiration.getFullYear()}-${
          expiration.getMonth() + 1
        }-${expiration.getDate()}T${expiration.getHours()}:${expiration.getMinutes()}`;

  return (
    <div id="galleriesPage">
      {userData.loading ? (
        <LoadingComponent />
      ) : (
        <div className="galleries">
          {userData.data.galleries && userData.data.galleries.length === 0 ? (
            <div className="noData">
              <h3>Don't currently have any galleries, want to add one?</h3>
              <button onClick={onOpen}>+ NEW GALLERY</button>
            </div>
          ) : (
            userData?.data?.galleries?.map((gallery, index) => {
              return (
                <Link to={`galleriesDetail/${gallery._id}`} key={index}>
                  <div className="card">
                    <div className="expired">
                      {gallery?.expirationDate != "" &&
                      gallery?.expirationDate?.slice(0, 10) >=
                        expirationDate?.slice(0, 10) ? (
                        ""
                      ) : (
                        <p>EXPIRED</p>
                      )}
                    </div>
                    <div className="galleryImage">
                      <img
                        src={`${gallery?.coverImage?.coverImg}`}
                        alt={gallery?.galleryName}
                      />
                      <h6>{gallery?.galleryName}</h6>
                    </div>

                    <div className="galleryName">
                      <p>{gallery?.galleryName}</p>
                      <div className="visitorAndImageLength">
                        <span>{gallery.galleryImage.length}</span>
                        <i className="fa-solid fa-images"></i>
                        <span>1</span>
                        <i className="fa-solid fa-eye"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}

          <Modal
            onClose={onClose}
            size={""}
            isOpen={isOpen}
            scrollBehavior={"inside"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader style={{ textDecoration: "none" }}>
                Create New Gallery
              </ModalHeader>
              <div className="modalHeader">
                <h5>Create a New Gallery</h5>
              </div>
              <ModalCloseButton />
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl isInvalid={errors.galleryName}>
                    <div className="left">
                      <FormLabel htmlFor="galleryName">Gallery Name</FormLabel>
                      <FormHelperText>
                        Give your gallery a descriptive name.
                      </FormHelperText>
                    </div>
                    <Input
                      id="galleryName"
                      type={"text"}
                      {...register("galleryName", {
                        required: "Gallery Name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length should be 3",
                        },
                      })}
                    />
                    <FormErrorMessage>
                      {errors.galleryName && errors.galleryName.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <div className="left">
                      <FormLabel htmlFor="eventDate">Event Date</FormLabel>
                      <FormHelperText>
                        The date the photos were taken.
                      </FormHelperText>
                    </div>
                    <Input
                      {...register("eventDate")}
                      type={"datetime-local"}
                      id="eventDate"
                    />
                  </FormControl>

                  <FormControl>
                    <div className="left">
                      <FormLabel htmlFor="expirationDate">
                        Expiration Date
                      </FormLabel>
                      <FormHelperText>
                        The gallery will no longer be visible after the
                        expiration date.
                      </FormHelperText>
                    </div>
                    <Input
                      {...register("expirationDate")}
                      type={"datetime-local"}
                      id="expirationDate"
                    />
                  </FormControl>

                  <FormControl>
                    <div className="left">
                      <FormLabel htmlFor="galleryDirection">
                        Gallery directory
                      </FormLabel>
                      <FormHelperText>
                        Share this gallery with the public by displaying it in
                        your <Link to={"/galleries"}>gallery directory.</Link>
                      </FormHelperText>
                    </div>
                    <input
                      {...register("galleryDirection")}
                      type={"checkbox"}
                      id="galleryDirection"
                    />
                    <label htmlFor="galleryDirection">
                      Display in gallery directory
                    </label>
                  </FormControl>

                  <p
                    onClick={() => {
                      setToggle(!toggle);
                    }}
                  >
                    <i className="fa-solid fa-chevron-down"></i> Additional
                    options
                  </p>

                  {toggle && (
                    <>
                      <FormControl>
                        <div className="left">
                          <FormLabel htmlFor="project">Project</FormLabel>
                          <FormHelperText>
                            Associate this gallery with a project or booked
                            mini-session.
                          </FormHelperText>
                        </div>
                        <Input
                          type={"text"}
                          id="project"
                          {...register("project")}
                        />
                      </FormControl>

                      <FormControl>
                        <div className="left">
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <FormHelperText>
                            Event location, details, etc.
                          </FormHelperText>
                        </div>
                        <Input
                          type={"text"}
                          id="description"
                          {...register("description")}
                        />
                      </FormControl>

                      <FormControl>
                        <div className="left">
                          <FormLabel htmlFor="seoTitle">SEO Title</FormLabel>
                          <FormHelperText>
                            Recommended to be around 60 characters long
                          </FormHelperText>
                        </div>
                        <Input
                          type={"text"}
                          id="seoTitle"
                          {...register("seoTitle")}
                        />
                      </FormControl>

                      <FormControl>
                        <div className="left">
                          <FormLabel htmlFor="seoDescription">
                            SEO Description
                          </FormLabel>
                          <FormHelperText>
                            Recommended to be between 50 to 160 characters long
                          </FormHelperText>
                        </div>
                        <Input
                          type={"text"}
                          id="seoDescription"
                          {...register("seoDescription")}
                        />
                      </FormControl>
                    </>
                  )}

                  <Button mt={4} isLoading={isSubmitting} type="submit">
                    Next: Choose a Cover Layout
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal
            closeOnOverlayClick={false}
            isOpen={coverİmageOpen}
            onClose={onCoverClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Upload to your Gallery Cover Image</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
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
                <Button onClick={onCoverClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default GalleriesPage;
