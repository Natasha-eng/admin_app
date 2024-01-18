const trimImageString = (image) => {
  let img;
  if (image && image.at(0) === '"' && image.at(-1) === '"') {
    img = image.slice(1, -1);
    return img;
  } else {
    return image;
  }
};

const convertToBase64 = (file) =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      res(reader.result);
    };
    reader.onerror = () => {
      rej(console.log("file loading error "));
    };
  });

export { trimImageString, convertToBase64 };
