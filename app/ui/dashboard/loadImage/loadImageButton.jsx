"use client";

import styles from "./loadimage.module.css";

const LoadImageButton = ({ onPhotoSelected, photoFile, buttonTitle }) => {
  return (
    <label htmlFor="fileImg" className={styles.changePhotoButton}>
      {buttonTitle}
      <input
        type="file"
        name="img"
        id="fileImg"
        // accept="image/*"
        onChange={onPhotoSelected}
      />
      <input
        type="hidden"
        name="profileImg"
        id="fileBase64"
        value={photoFile || ""}
      />
    </label>
  );
};

export default LoadImageButton;
