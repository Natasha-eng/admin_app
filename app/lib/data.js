import { base } from "./db";

export const getMinifiedRecord = (record) => {
  return {
    recordId: record.id,
    ...record.fields,
  };
};

export const getMinifiedRecords = (records) => {
  return records.map((record) => getMinifiedRecord(record));
};

export const fetchUsers = async (q) => {
  try {
    if (q) {
      return fetchFilteredUsers(q);
    } else {
      const usersData = await base("users").select().firstPage();
      const users = getMinifiedRecords(usersData);
      const count = users.length;
      return { count, users };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchFilteredUsers = async (q) => {
  try {
    const usersData = await base("users")
      .select({
        filterByFormula: `OR(REGEX_MATCH(LOWER(username),"${q}"),REGEX_MATCH(LOWER(email),"${q}"))`,
      })
      .firstPage();
    const users = getMinifiedRecords(usersData);
    const count = users.length;
    return { count, users };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};

export const fetchUser = async (id) => {
  try {
    const userData = await base("users").find(id);
    const user = getMinifiedRecord(userData);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const fetchProducts = async (q) => {
  try {
    if (q) {
      return fetchFilteredProducts(q);
    } else {
      const productsData = await base("products").select().firstPage();
      const count = productsData.length;

      const products = getMinifiedRecords(productsData);
      return { count, products };
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchFilteredProducts = async (q) => {
  try {
    const productsData = await base("products")
      .select({
        filterByFormula: `OR(REGEX_MATCH(LOWER(title),"${q}"),REGEX_MATCH(LOWER(desc),"${q}"))`,
      })
      .firstPage();

    const count = productsData.length;

    const products = getMinifiedRecords(productsData);

    return { count, products };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch products!");
  }
};

export const fetchProduct = async (id) => {
  try {
    const productData = await base("products").find(id);
    const product = getMinifiedRecord(productData);
    return product;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch product!");
  }
};

// DUMMY DATA

export const cards = [
  {
    id: 1,
    title: "Total Users",
    number: 10.928,
    change: 12,
  },
  {
    id: 2,
    title: "Stock",
    number: 8.236,
    change: -2,
  },
  {
    id: 3,
    title: "Revenue",
    number: 6.642,
    change: 18,
  },
];
