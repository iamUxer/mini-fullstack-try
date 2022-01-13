import React, { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import { UserContext } from "../../App";

const AuthModal = ({ ...props }) => {
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("userInfo", userInfo.message);
  useEffect(() => {
    if (userInfo.message) {
      setIsModalVisible(true);
    }
  }, [userInfo]);

  const handleOk = () => {
    setIsModalVisible(false);
    setUserInfo({ ...userInfo, message: null });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setUserInfo({ ...userInfo, message: null });
  };
  return (
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {props.children}
    </Modal>
  );
};

export default AuthModal;
