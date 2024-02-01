"use client";

import { useFormStatus } from "react-dom";
import styles from "@/app/ui/login/loginForm/loginForm.module.css";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${pending ? styles.submit : ""}`}
      type="submit"
      disabled={pending}
    >
      {pending ? "Submitting" : "Login"}
    </button>
  );
};

export default SubmitButton;
