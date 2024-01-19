"use server";
import { revalidatePath } from "next/cache";
import { base } from "./db";
import { redirect } from "next/navigation";
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

  const strImg = JSON.stringify(profileImg);

  if (strImg.length > 100000) {
    return { message: "The image size is too big. Failed to add user!" };
  }

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
    throw new Error(`Failed to create user! ${err}`);
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

  const strImg = JSON.stringify(profileImg);

  if (strImg.length > 100000) {
    return { message: "The image size is too big. Failed to update user!" };
  }

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
    throw new Error(`Failed to update user! ${err}`);
  }

  revalidatePath("/dashboard/users");
  redirect("/dashboard/users");
};

export const addProduct = async (prevState, formData) => {
  let { title, desc, price, stock, color, size, cat, img, profileImg } =
    Object.fromEntries(formData.entries());

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

    throw new Error(`Failed to create product! ${err}`);
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
};

export const updateProduct = async (prevState, formData) => {
  const { id, title, desc, price, stock, cat, color, profileImg, img } =
    Object.fromEntries(formData.entries());

  const strImg = JSON.stringify(profileImg);

  if (strImg.length > 100000) {
    return { message: "The image size is too big. Failed to update product!" };
  }

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

    if (!deletedUser) {
      return { message: `Failed to delete user ${id}` };
    }
  } catch (err) {
    console.log(err);
    return { message: `Failed to delete user!" Error: ${err} occured` };
  }

  revalidatePath("/dashboard/products");
};

export const deleteProduct = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    const deletedProductData = await base("products").destroy(id);
    const deletedProduct = getMinifiedRecord(deletedProductData);

    if (!deletedProduct) {
      return { message: `Failed to delete product ${id}` };
    }
  } catch (err) {
    console.log(err);
    return { message: "Failed to delete product!" };
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
