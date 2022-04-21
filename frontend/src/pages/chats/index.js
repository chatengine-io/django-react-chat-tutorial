import { useContext } from "react";

import { Context } from "../../context";

import Header from "./Header";
import ChatList from "./ChatList";

import {
  MultiChatWindow,
  useMultiChatLogic,
  MultiChatSocket,
} from "react-chat-engine-advanced";
const projectId = "70049943-b572-4372-9f3c-fbdeca940e0f";

const ChatsPage = () => {
  const { user } = useContext(Context);

  const chatProps = useMultiChatLogic(
    projectId,
    user.username,
    user.hashed_password
  );

  if (!user) {
    return <div />;
  } else {
    return (
      <div>
        <Header />

        <div
          style={{ height: "calc(100vh - 64px)", backgroundColor: "#e8e5f4" }}
        >
          <div className="bubble-1" />
          <div className="bubble-2" />
          <div className="bubble-3" />
          <div className="bubble-4" />

          <MultiChatSocket {...chatProps} />
          <MultiChatWindow
            {...chatProps}
            renderChatList={(props) => (
              <ChatList
                {...props}
                onChatCardClick={chatProps.onChatCardClick}
              />
            )}
          />
        </div>
      </div>
    );
  }
};

export default ChatsPage;
