import axios from "axios";

export const login = (values, onSuccess, onError) => {
  const str = values.username + ":" + values.password;
  const token = btoa(str);

  axios
    .get("http://127.0.0.1:8000/users/me/", {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((r) => onSuccess(r))
    .catch((e) => onError(e.response.data));
};
