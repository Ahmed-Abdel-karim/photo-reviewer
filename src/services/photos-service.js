const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = process.env.REACT_APP_API_ACCESS_KEY;
const ACCEPTED_VERSION = process.env.REACT_APP_API_ACCEPTED_VERSION;

const RANDOM_PHOTO_URL = "photos/random";

export const apiRequest = ({ url, body, method = "get", params }) => {
  const headers = new Headers();
  headers.append("Authorization", ACCESS_KEY);
  headers.append("Accept-Version", ACCEPTED_VERSION);
  return fetch(new URL(`${BASE_URL}/${url}?${new URLSearchParams(params)}`), {
    body,
    headers,
    method,
  }).then((res) => res.json());
};

export const randomImageApiCall = () =>
  apiRequest({
    url: RANDOM_PHOTO_URL,
    params: {
      topics:
        "CDwuwXJAbEw,iUIsnVtjB0Y,rnSKDHwwYUk,6sMVjTLSkeQ,R_Fyn-Gwtlw,xHxYTMHLgOc,Jpg6Kidl-Hk,FY4YHxYhY-4",
    },
  }).then(({ urls, alt_description, blur_hash, id }) => ({
    urls,
    alt_description,
    blur_hash,
    id,
  }));

const MAX_ATTEMPTS = 6;
let currentAttemps = 0;

export const getRandomImage = async (omittedImages) => {
  // try getting image
  const image = await randomImageApiCall();

  if (!omittedImages[image.id]) {
    currentAttemps = 0;
    return image;
  }
  // if the image is black listed
  // try MAX_ATTEMPTS times then wait 1000ms and try again

  if (currentAttemps < MAX_ATTEMPTS) {
    currentAttemps = currentAttemps + 1;
    return getRandomImage(omittedImages);
  } else {
    await setTimeout(() => {}, 1000);
    currentAttemps = 0;
    return getRandomImage(omittedImages);
  }
};
