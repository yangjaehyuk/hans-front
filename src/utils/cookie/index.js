export const setCookie = (accessToken) => {
  try {
    document.cookie = `accessToken=${accessToken};path=/;secure`;
  } catch (e) {
    console.error(e);
  }
};

export function getCookie(name) {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))
    ?.split('=')[1];
  return cookieValue || undefined;
}

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
