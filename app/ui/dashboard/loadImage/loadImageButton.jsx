"use client";

import styles from "./loadimage.module.css";

const LoadImageButton = ({ onPhotoSelected, photoFile, buttonTitle }) => {
  return (
    <label htmlFor="profileImg" className={styles.changePhotoButton}>
      {buttonTitle}
      <input
        type="file"
        name="img"
        id="profileImg"
        onChange={onPhotoSelected}
      />
      <input
        type="hidden"
        name="profileImg"
        id="profileImg"
        value={photoFile}
      />
    </label>
  );
};

export default LoadImageButton;
