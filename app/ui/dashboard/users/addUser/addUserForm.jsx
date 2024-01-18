"use client";

import { useFormState } from "react-dom";
import LoadImage from "../../loadImage/loadImage";
import { addUser } from "@/app/lib/actions";

import styles from "./addUser.module.css";
import SubmitButton from "../../submitButton/submitButton";

const initialState = {
  message: "",
};

const AddUserForm = () => {
  const [state, formAction] = useFormState(addUser, initialState);
  return (
    <form action={formAction} className={styles.form}>
      <div>
        <LoadImage buttonTitle={"Add User Photo"} />
      </div>
      <div className={styles.formInputs}>
        <label>Username</label>
        <input type="text" placeholder="username" name="username" required />
        <label>Email</label>
        <input type="email" placeholder="email" name="email" required />
        <label>Password</label>
        <input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <label>Phone</label>
        <input type="phone" placeholder="phone" name="phone" />
        <label>Is Admin?</label>
        <select name="isAdmin" id="isAdmin" defaultValue={"false"}>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>
        <label>Is Active?</label>
        <select name="isActive" id="isActive" defaultValue={"false"}>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>
        <label>Address</label>
        <textarea
          name="address"
          id="address"
          rows="16"
          placeholder="Address"
        ></textarea>

        <div className={styles.error} role="status">
          {state?.message}
        </div>

        <SubmitButton title="Add" />
      </div>
    </form>
  );
};

export default AddUserForm;
