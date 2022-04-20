import { useContext, useState, useEffect, useRef } from "react";

import { fetchUserList } from "./fetchUserList";
import { getOrCreateChat } from "./getOrCreateChat";

import { Context } from "../../../context";
import { Input, ChatCard } from "react-chat-engine-advanced";

const ChatList = (props) => {
  const didMountRef = useRef(false);
  const { user, userList, setUserList } = useContext(Context);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      fetchUserList(
        (r) => {
          console.log(r.data.results);
          setUserList(r.data.results);
        },
        (e) => console.log(e)
      );
    }
  });

  const getOtherUser = (chat) => {
    let username = "";
    chat.people.map((person) => {
      if (person.person.username !== user.username) {
        username = person.person.first_name + " " + person.person.last_name;
      }
    });
    return username;
  };

  const renderChats = () => {
    return props.chats.map((chat, index) => {
      return (
        <ChatCard
          key={`chat-card-${index}`}
          title={getOtherUser(chat)}
          description={
            chat.last_message.text ? chat.last_message.text : "Say hello!"
          }
          timeStamp={
            chat.last_message.created
              ? chat.last_message.created.substr(5, 5)
              : chat.created.substr(5, 5)
          }
          isActive={props.activeChatId === chat.id}
          hasNotification={user.username !== chat.last_message.sender_username}
          style={{ margin: "6px 12px 6px 12px" }}
          onClick={() => props.onChatCardClick(chat.id)}
          avatarUsername={chat.last_message.sender?.username}
          avatarUrl={
            chat.last_message.sender
              ? chat.last_message.sender.avatar
              : "https://chat-engine-assets.s3.amazonaws.com/empty-chat-thumb.png"
          }
        />
      );
    });
  };

  const renderSearch = () => {
    return userList.map((otherUser, index) => {
      const userStr = `${otherUser.username} ${otherUser.email} ${otherUser.first_name} ${otherUser.last_name}`;

      if (
        userStr.indexOf(search) !== -1 &&
        otherUser.username !== user.username &&
        otherUser.username !== "admin"
      ) {
        return (
          <ChatCard
            key={`chat-card-${index}`}
            title={`${otherUser.first_name} ${otherUser.last_name}`}
            description={otherUser.username}
            style={{ margin: "6px 12px 6px 12px" }}
            avatarUsername={otherUser.username}
            avatarUrl={otherUser.avatar}
            onClick={() =>
              getOrCreateChat(
                user,
                otherUser.username,
                (r) => {
                  setSearch("");
                  props.onChatCardClick(r.data.id);
                },
                (e) => console.log(e)
              )
            }
          />
        );
      } else {
        return <div />;
      }
    });
  };

  return (
    <div
      style={{
        height: "100%",
        backgroundColor: "#4e426d",
        overflowY: "scroll",
      }}
    >
      <Input
        label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {search.length > 0 ? renderSearch() : renderChats()}
    </div>
  );
};

export default ChatList;
