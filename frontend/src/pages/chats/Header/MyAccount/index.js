import React, { useState } from "react";

import { Modal, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

import EditAccount from "./UpdateAccount";
import DeleteAccount from "./DeleteAccount";

const MyAccount = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Menu.Item
        style={{ lineHeight: "64px" }}
        key="app"
        icon={<UserOutlined />}
        onClick={() => setIsVisible(true)}
      >
        My Account
      </Menu.Item>

      <Modal
        title="My Account"
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        footer={null}
      >
        <EditAccount onComplete={() => setIsVisible(false)} />
        <DeleteAccount />
      </Modal>
    </>
  );
};

export default MyAccount;
