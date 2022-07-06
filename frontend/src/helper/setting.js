import api from "./api";

const setSetting = (data) => {
  return new Promise((resolve, reject) => {
    api
      .post("/api/setting/set", data)
      .then((response) => {
        if (response.status === 201) {
          resolve(response.data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getAllSettings = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/api/setting/all")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

export { setSetting, getAllSettings };
