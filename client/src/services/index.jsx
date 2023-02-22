import React from "react";

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

export const createImage = async (newImage, id) => {
  await axios.patch(`http://localhost:3000/uploads/${id}`, newImage);
  setLoading(false);
};

export const createPost = async (newImage, id) => {
  try {
    await createImage(newImage, id);
  } catch (error) {
    console.log(error.message);
  }
};
