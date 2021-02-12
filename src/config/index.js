export const backHost = process.env.REACT_APP_BACK_HOST;
export const googleAuthUrl = `${backHost}/auth/google`;

export const removeHash = () => {
  let uri = window.location.toString();
  if (uri[uri.length - 1] === '#') {
    uri = uri.slice(0, -1);
    window.history.replaceState({}, document.title, uri);
  }
}