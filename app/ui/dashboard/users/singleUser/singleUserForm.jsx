"use client";

import { updateUser } from "@/app/lib/actions";
import { useFormState } from "react-dom";

import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import LoadImage from "../../loadImage/loadImage";
import SubmitButton from "../../submitButton/submitButton";

const initialState = {
  message: "",
};

const SingleUserForm = ({ user }) => {
  const [state, formAction] = useFormState(updateUser, initialState);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        <LoadImage
          item={user}
          // img={user.img}
          // username={user.username}
          buttonTitle={"Change Profile Photo"}
        />
      </div>

      <div className={styles.formInputs}>
        <input type="hidden" name="id" value={user.recordId} />
        <label>Username</label>

        <input type="text" name="username" placeholder={user.username} />
        <label>Email</label>
        <input type="email" name="email" placeholder={user.email} />

        <label>Phone</label>
        <input type="text" name="phone" placeholder={user.phone} />
        <label>Address</label>
        <textarea type="text" name="address" placeholder={user.address} />
        <label>Is Admin?</label>
        <select name="isAdmin" id="isAdmin" defaultValue={user.isAdmin}>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>
        <label>Is Active?</label>
        <select name="isActive" id="isActive" defaultValue={user.isActive}>
          <option value={"true"}>Yes</option>
          <option value={"false"}>No</option>
        </select>

        <div className={styles.error} role="status">
          {state?.message}
        </div>

        <SubmitButton title="Add" />
      </div>
    </form>
  );
};

export default SingleUserForm;
