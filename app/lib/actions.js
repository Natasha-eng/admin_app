"use server";

import { revalidatePath } from "next/cache";
import { base } from "./db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { getMinifiedRecord } from "./data";

export const addUser = async (prevState, formData) => {
  const {
    username,
    email,
    password,
    phone,
    address,
    isAdmin,
    isActive,
    profileImg,
    img,
  } = Object.fromEntries(formData);

  if (img.size > 100000) {
    return { message: "The image size is too big. Failed to add user!" };
  }

  const strImg = JSON.stringify(profileImg);
  try {
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await base("users").create(
      {
        username,
        email,
        password,
        phone,
        address,
        createdAt: new Date(),
        isAdmin: isAdmin.toString(),
        isActive: isActive.toString(),
        img: strImg,
      },
      { typecast: true }
    );
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const updateUser = async (prevState, formData) => {
  const {
    id,
    username,
    email,
    password,
    phone,
    address,
    isAdmin,
    isActive,
    profileImg,
    img,
  } = Object.fromEntries(formData);

  if (img.size > 100000) {
    return { message: "The image size is too big. Failed to update user!" };
  }

  const strImg = JSON.stringify(profileImg);

  try {
    const updateFields = {
      username,
      email,
      password,
      phone,
      address,
      isAdmin: isAdmin.toString(),
      isActive: isActive.toString(),
      img: strImg,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined) && delete updateFields[key]
    );

    const updatedUserData = await base("users").update(id, { ...updateFields });
    const updatedUser = getMinifiedRecord(updatedUserData);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (prevState, formData) => {
  const { title, desc, price, stock, color, size, cat, profileImg, img } =
    Object.fromEntries(formData);

  if (img.size > 100000) {
    return { message: "The image size is too big. Failed to add product!" };
  }

  const strImg = JSON.stringify(profileImg);
  try {
    const newProductData = await base("products").create(
      {
        title,
        desc,
        price: Number(price),
        stock: Number(stock),
        color,
        createdAt: new Date(),
        category: cat,
        size,
        img: strImg,
      },
      { typecast: true }
    );

    const newProduct = getMinifiedRecord(newProductData);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to create product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (prevState, formData) => {
  const { id, title, desc, price, stock, brand, cat, color, profileImg, img } =
    Object.fromEntries(formData);

  if (img.size > 100000) {
    return { message: "The image size is too big. Failed to update product!" };
  }

  const strImg = JSON.stringify(profileImg);
  try {
    const updateFields = {
      title,
      desc,
      price: price !== "" ? Number(price) : "",
      stock: stock !== "" ? Number(stock) : "",
      brand,
      category: cat,
      color,
      img: strImg,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined || false) &&
        delete updateFields[key]
    );

    const updatedProductData = await base("products").update(id, {
      ...updateFields,
    });

    const updatedProduct = getMinifiedRecord(updatedProductData);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update product!");
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    const deletedUserData = await base("users").destroy(id);
    const deletedUser = getMinifiedRecord(deletedUserData);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete user!");
  }

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    const deletedProductData = await base("products").destroy(id);
    const deletedProduct = getMinifiedRecord(deletedProductData);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete product!");
  }

  revalidatePath("/dashboard/products");
};

export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    if (err.message.includes("CredentialsSignin")) {
      return "Wrong Credentials";
    }
    throw err;
  }
};
