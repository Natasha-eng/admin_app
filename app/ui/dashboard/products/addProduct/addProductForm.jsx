"use client";

import LoadImage from "../../loadImage/loadImage";
import { useFormState } from "react-dom";

import styles from "./addProduct.module.css";
import { addProduct } from "@/app/lib/actions";
import { useEffect, useState } from "react";
import { convertToBase64, trimImageString } from "@/app/lib/utils";
import SubmitButton from "../../submitButton/submitButton";

const initialState = {
  message: "",
};

const AddProductForm = () => {
  // const [photoFile, setPhotoFile] = useState("");
  // const addProductWithPhoto = addProduct.bind(null, photoFile);
  const [message, formAction] = useFormState(addProduct, {
    initialState,
  });

  // const imgFile = trimImageString(img);

  // console.log("base64 photoFile", photoFile);

  // const onPhotoSelected = async (e) => {
  //   if (e.target.files?.length) {
  //     const file = e.target.files[0];
  //     console.log("file", file);
  //     const base64 = await convertToBase64(file);
  //     setPhotoFile(base64);
  //   }
  // };

  // useEffect(() => {
  //   setPhotoFile(photoFile);
  // }, [photoFile]);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <LoadImage
          // onPhotoSelected={onPhotoSelected}
          // photoFile={photoFile}
          // setPhotoFile={setPhotoFile}
          buttonTitle={"Add Product Photo"}
        />
      </div>

      <div className={styles.formInputs}>
        <label>Title</label>
        <input type="text" placeholder="title" name="title" required />
        <label>Category</label>
        <select name="cat" id="cat">
          <option value="smartphones">Smartphones</option>
          <option value="computers">Computers</option>
          <option value="laptops">Laptops</option>
          <option value="mens-watches">Mens-watches</option>
          <option value="womens-watches">womens-watches</option>
        </select>
        <label>Price</label>
        <input type="number" placeholder="price" name="price" required />
        <label>Stock</label>
        <input type="number" placeholder="stock" name="stock" required />
        <label>Color</label>
        <input type="text" placeholder="color" name="color" />
        <label>Size</label>
        <input type="text" placeholder="size" name="size" />
        <label>Description</label>
        <textarea
          required
          name="desc"
          id="desc"
          rows="16"
          placeholder="Description"
        ></textarea>

        <div className={styles.error} role="status">
          {message?.message}
        </div>

        <SubmitButton title="Add" />
      </div>
    </form>
  );
};

export default AddProductForm;
