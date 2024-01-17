"use client";

import LoadImage from "../../loadImage/loadImage";
import { useFormState } from "react-dom";

import styles from "./addProduct.module.css";
import { addProduct } from "@/app/lib/actions";

const initialState = {
  message: "",
};

const AddProductForm = () => {
  const [state, formAction] = useFormState(addProduct, initialState);
  return (
    <form action={formAction} className={styles.form}>
      <div>
        <LoadImage buttonTitle={"Add Product Photo"} />
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
          {state?.message}
        </div>

        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default AddProductForm;
