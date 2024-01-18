"use server";

import fs from "fs";

import { revalidatePath } from "next/cache";
import { base } from "./db";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "../auth";
import { getMinifiedRecord } from "./data";

const convertImageToBase64URL = (filename, imageType = "png") => {
  try {
    const buffer = fs.readFileSync(filename);
    const base64String = Buffer.from(buffer).toString("base64");
    // console.log(`base64String`, base64String.slice(0, 100));
    return `data:image/${imageType};base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${filename} no exist ❌`);
  }
};

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
  let { title, desc, price, stock, color, size, cat, img, profileImg } =
    Object.fromEntries(formData.entries());

  console.log("add formData", formData);
  // console.log("add product img", img);

  console.log("add product profileImg", profileImg);
  console.log("add product prevState", prevState);

  const strImg = JSON.stringify(profileImg);

  if (strImg.length > 100000) {
    return { message: "The image size is too big. Failed to add product!" };
  }

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
    return { message: `Failed to create product! ${err}` };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};
// photoFile
export const updateProduct = async (prevState, formData) => {
  console.log("prevState!", prevState);
  console.log("formData!", formData);
  // console.log("photoFile!", photoFile);

  const { id, title, desc, price, stock, cat, color, profileImg, img } =
    Object.fromEntries(formData.entries());
  // console.log("add product profileImg", profileImg);
  // console.log("update formData entries", formData.entries());
  // console.log("update photoFile bind", photoFile);

  const strImg = JSON.stringify(profileImg); //photoFile

  // console.log("img", img);
  console.log("update strImg.length", strImg.length);

  if (strImg.length > 100000) {
    return { message: "The image size is too big. Failed to update product!" };
  }

  // console.log("update strImg with profileImg", strImg);

  try {
    const updateFields = {
      title,
      desc,
      price: price !== "" ? Number(price) : "",
      stock: stock !== "" ? Number(stock) : "",
      category: cat,
      color,
      img: strImg,
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || undefined || false) &&
        delete updateFields[key]
    );

    // console.log("updateFields", updateFields);

    const updatedProductData = await base("products").update(
      id,
      {
        ...updateFields,
      },
      { typecast: true }
    );

    const updatedProduct = getMinifiedRecord(updatedProductData);

    if (!updatedProduct.title) {
      return { message: "Failed to update product!" };
    }

    // console.log("updated product", updatedProduct);
  } catch (err) {
    console.log(err);
    return { message: `Failed to update product! ${err}` };
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
