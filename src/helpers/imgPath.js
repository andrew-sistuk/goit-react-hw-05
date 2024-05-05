export function setImgPath(path, type) {
  const defaultImg = '/src/assets/img_not_found.jpg';
  if (path) {
    return `https://image.tmdb.org/t/p/${type}/${path}`;
  } else {
    return defaultImg;
  }
}
