import React from "react";
import axios from "axios";

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
  await axios.post(`http://localhost:3000/${endpoint}/${userId}`, {
    newImage: newImage,
    albomId: albomId,
  });
  setLoading(false);
};

export const createPost = async (newImage, endpoint, albomId, userId) => {
  try {
    await createImage(newImage, endpoint, albomId, userId);
  } catch (error) {
    console.log(error.message);
  }
};
