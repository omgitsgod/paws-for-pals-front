export const backHost = process.env.REACT_APP_BACK_HOST;
export const googleAuthUrl = `${backHost}/auth/google`;

export const removeHash = () => {
  let uri = window.location.toString();
  if (uri[uri.length - 1] === '#') {
    uri = uri.slice(0, -1);
    window.history.replaceState({}, document.title, uri);
  }
};
export const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
export const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
export const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;