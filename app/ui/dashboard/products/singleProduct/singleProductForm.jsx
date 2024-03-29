"use client";

import { updateProduct } from "@/app/lib/actions";
import LoadImage from "../../loadImage/loadImage";
import { useFormState } from "react-dom";

import styles from "./singleProduct.module.css";
import { convertToBase64, trimImageString } from "@/app/lib/utils";
import { useEffect, useState } from "react";
import SubmitButton from "../../submitButton/submitButton";

const initialState = {
  message: "",
};

const SingleProductForm = ({ imgTrimmed, product }) => {
  const [message, formAction] = useFormState(updateProduct, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <div>
          <LoadImage item={product} buttonTitle={"Change Product Photo"} />
        </div>
      </div>

      <div className={styles.formInputs}>
        <input type="hidden" name="id" value={product.recordId} />
        <label>Title</label>
        <input type="text" name="title" placeholder={product.title} />
        <label>Price</label>
        <input type="number" name="price" placeholder={product.price} />
        <label>Stock</label>
        <input type="number" name="stock" placeholder={product.stock} />
        <label>Color</label>
        <input
          type="text"
          name="color"
          placeholder={product.color || "color"}
        />
        <label>Size</label>
        <textarea
          type="text"
          name="size"
          placeholder={product.size || "size"}
        />
        <label>Category</label>
        <select name="cat" id="cat" defaultValue={product.category}>
          <option value="smartphones">Smartphones</option>
          <option value="computers">Computers</option>
          <option value="laptops">Laptops</option>
          <option value="mens-watches">Mens-watches</option>
          <option value="womens-watches">womens-watches</option>
        </select>
        <label>Description</label>
        <textarea
          name="desc"
          id="desc"
          rows="10"
          placeholder={product.desc}
        ></textarea>

        <div className={styles.error} role="status">
          {message?.message}
        </div>

        <SubmitButton title="Update" />
      </div>
    </form>
  );
};

export default SingleProductForm;
