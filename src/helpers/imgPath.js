export function setImgPath(path, type, typeImg) {
  const defaultAvatar = './src/assets/img_not_found.png';
  const defaultPoster = './src/assets/no_picture.png';
  if (path) {
    return `https://image.tmdb.org/t/p/${type}/${path}`;
  } else {
    switch (typeImg) {
      case 'poster':
        return defaultPoster;
      case 'avatar':
        return defaultAvatar;
      default:
        defaultAvatar;
    }
  }
}
