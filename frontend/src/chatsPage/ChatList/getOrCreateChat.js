import axios from "axios";

export const getOrCreateChat = (user, otherUsername, onSuccess, onError) => {
  axios
    .put(
      "https://api.chatengine.io/chats/",
      {
        usernames: [user.username, otherUsername],
        is_direct_chat: true,
      },
      {
        headers: {
          "Project-Id": "70049943-b572-4372-9f3c-fbdeca940e0f",
          "User-Name": user.username,
          "User-Secret": user.hashed_password,
        },
      }
    )
    .then((r) => onSuccess(r))
    .catch((e) => onError(e.response.data));
};
