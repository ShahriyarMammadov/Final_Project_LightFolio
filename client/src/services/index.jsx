import React from "react";
import axios from "axios";
import GalleryDetailPage from "../pages/admin/galleryDetailPage";

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const createImage = async (newImage, endpoint, albomId, userId) => {
  const response = await axios.post(
    `http://localhost:3000/${endpoint}/${userId}`,
    {
      newImage: newImage,
      albomId: albomId,
    }
  );
  setLoading(false);
  <GalleryDetailPage message={"salam"} />;
  console.log(data);
};

export const createPost = async (newImage, endpoint, albomId, userId) => {
  try {
    await createImage(newImage, endpoint, albomId, userId);
  } catch (error) {
    console.log(error.message);
  }
};

// export const profilePhotoCreate = async (newImage, endpoint, albomId, userId) => {
//   const response = await axios.post(
//     `http://localhost:3000/${endpoint}/${userId}`,
//     {
//       newImage: newImage,
//       albomId: albomId,
//     }
//   );
//   setLoading(false);
//   <GalleryDetailPage message={"salam"} />;
//   console.log(data);
// };

// export const uploadProfileImage = async (newImage, endpoint, userId) => {
//   try {
//     await createImage(newImage, endpoint, userId);
//   } catch (error) {
//     console.log(error.message);
//   }
// };
