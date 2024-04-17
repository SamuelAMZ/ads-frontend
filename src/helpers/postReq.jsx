// post request helpers boiler plate
// env
let REACT_APP_DOMAIN = import.meta.env.VITE_REACT_APP_DOMAIN;
let VITE_ENV = import.meta.env.VITE_ENV;

const postReq = async (data, url) => {
  // headers
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append("GET", "POST", "OPTIONS");
  headers.append("Access-Control-Allow-Origin", `${REACT_APP_DOMAIN}`);
  headers.append("Access-Control-Allow-Credentials", "true");

  // fetch
  let endpoint = `${REACT_APP_DOMAIN}${url}`;

  try {
    const req = await fetch(endpoint, {
      mode: "cors",
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (req.status === 400) {
      return await req.json();
    }

    if (!req.ok) {
      if (VITE_ENV === "development") {
        console.log(req, "response error");
      }
      throw new Error(`HTTP error! status: ${req.status}`);
    }

    const serverRes = await req.json();
    return serverRes;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default postReq;
