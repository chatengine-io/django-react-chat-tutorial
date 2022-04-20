import axios from "axios";

export const deleteUser = (currentUser, onSuccess, onError) => {
  const str = currentUser.username + ":" + currentUser.plaintext_password;
  const token = btoa(str);

  axios
    .delete("http://127.0.0.1:8000/users/me/", {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((r) => onSuccess(r))
    .catch((e) => onError(e.response.data));
};
