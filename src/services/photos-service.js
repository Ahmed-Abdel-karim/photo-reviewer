const BASE_URL = "https://api.unsplash.com/";
const ACCESS_KEY = process.env.REACT_APP_API_ACCESS_KEY;
const ACCEPTED_VERSION = process.env.REACT_APP_API_ACCEPTED_VERSION;

const RANDOM_PHOTO_URL = `${BASE_URL}photos/random`;

const apiRequest = async ({ url, body, method = "get", params }) => {
  const headers = new Headers();
  headers.append("Authorization", ACCESS_KEY);
  headers.append("Accept-Version", ACCEPTED_VERSION);
  const res = await fetch(new URL(`${url}?${new URLSearchParams(params)}`), {
    body,
    headers,
    method,
  });
  if (res.status !== 200) {
    throw new Error("something went worng");
  }
  return res.json();
};

const randomImageApiCall = async () => {
  const { urls, alt_description, id } = await apiRequest({
    url: RANDOM_PHOTO_URL,
    params: {
      topics:
        "CDwuwXJAbEw,iUIsnVtjB0Y,rnSKDHwwYUk,6sMVjTLSkeQ,R_Fyn-Gwtlw,xHxYTMHLgOc,Jpg6Kidl-Hk,FY4YHxYhY-4",
    },
  });

  return {
    urls: {
      small: urls.small,
      thumb: urls.thumb,
    },
    alt_description,
    id,
  };
};

const MAX_ATTEMPTS = 6;
let currentAttemps = 0;

const getRandomImage = async (omittedImages) => {
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

export { getRandomImage, RANDOM_PHOTO_URL };
