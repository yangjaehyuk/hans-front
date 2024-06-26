/** When we sign in to our website, we always get an access token. */
/** I used this function to set a cookie value which is named access token easily. */
export const setCookie = (accessToken) => {
  try {
    document.cookie = `accessToken=${accessToken};path=/;max-age=300000`;
  } catch (e) {
    console.error(e);
  }
};

/** We often use a cookie value which is named access token, because some api require an authorization value located in request header.*/
/** I used this function to get a cookie value which is named access token easily. */
export function getCookie(name) {
  const cookieString = document.cookie;
  if (cookieString.length > 0) {
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const separatorIndex = cookie.indexOf('=');
      const cookieName = cookie.substring(0, separatorIndex);
      if (cookieName === name) {
        return decodeURIComponent(cookie.substring(separatorIndex + 1));
      }
    }
  }
  return undefined;
}

/** When we sign out, browser must delete our information such as recoil value, and access token value */
/** I used this function to delete cookies easily.*/
export const deleteAllCookies = () => {
  try {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
  } catch (e) {
    console.error(e);
  }
};
