import axios from "axios";

export const createUser = (values, onSuccess, onError) => {
  axios
    .post("http://127.0.0.1:8000/users/me/", values)
    .then((r) => onSuccess(r))
    .catch((e) => onError(e.response.data));
};
