import axios from "axios";

export const fetchUserList = (onSuccess, onError) => {
  axios
    .get("http://127.0.0.1:8000/users/", {})
    .then((r) => onSuccess(r))
    .catch((e) => onError(e.response.data));
};
