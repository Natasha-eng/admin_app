"use client";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ title }) => {
  const { pending } = useFormStatus();
  return <button type="submit">{pending ? "Loading..." : title}</button>;
};

export default SubmitButton;
