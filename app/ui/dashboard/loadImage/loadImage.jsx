"use client";

import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import imgStyles from "./loadimage.module.css";
import LoadImageButton from "./loadImageButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trimImageString } from "@/app/lib/utils";
// onPhotoSelected,
//   photoFile,
const LoadImage = ({
  // img,
  // username,
  item,
  buttonTitle,
}) => {
  const imgFile = item && trimImageString(item.img);
  const [photoFile, setPhotoFile] = useState(imgFile || "");

  const convertToBase64 = (file) =>
    new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        res(reader.result);
      };
      reader.onerror = () => {
        rej(console.log("file loading error "));
      };
    });

  const onPhotoSelected = async (e) => {
    console.log("called");
    if (e.target.files?.length) {
      const file = e.target.files[0];
      console.log("file", file);
      const base64 = await convertToBase64(file);
      setPhotoFile(base64);
    }
  };

  useEffect(() => {
    setPhotoFile(imgFile);
  }, [imgFile]);

  return (
    <div className={styles.infoContainer}>
      <Image
        src={photoFile || "/no-avatar.jpg"}
        alt="avatar"
        width={300}
        height={300}
        className={imgStyles.img}
      />

      <LoadImageButton
        photoFile={photoFile}
        onPhotoSelected={onPhotoSelected}
        buttonTitle={buttonTitle}
      />

      <div>{item?.username || item?.title || ""}</div>
    </div>
  );
};

export default LoadImage;
