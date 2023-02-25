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

export const createImage = async (
  newImage,
  endpoint,
  albomId,
  userId,
  setLoadedPercent
) => {
  const totalSize = newImage.size;
  let loadedSize = 0;

  const response = await axios.post(
    `http://localhost:3000/${endpoint}/${userId}`,
    {
      newImage: newImage,
      albomId: albomId,
    },
    {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setLoadedPercent(percentCompleted);
      },
    }
  );
};

export const createPost = async (
  newImage,
  endpoint,
  albomId,
  userId,
  setLoadedPercent
) => {
  try {
    await createImage(newImage, endpoint, albomId, userId, setLoadedPercent);
  } catch (error) {
    console.log(error.message);
  }
};
