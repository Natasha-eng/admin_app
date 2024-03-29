"use client";

import { authenticate } from "@/app/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import SubmitButton from "./submitButtom/submitButton";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <div>
        Credentials to explore the app:
        <div>username: Natasha</div>
        <div>password: 12345678</div>
      </div>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />

      <SubmitButton />
      {state && state}
    </form>
  );
};

export default LoginForm;
