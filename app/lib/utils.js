const trimImageString = (image) => {
  let img;
  if (image && image.at(0) === '"' && image.at(-1) === '"') {
    img = image.slice(1, -1);
    return img;
  } else {
    return image;
  }
};

export { trimImageString };
