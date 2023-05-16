import React from 'react';
import Layout from "../Layout";
import {useUserStore} from "../../stores/userStore";
import {shallow} from "zustand/shallow";
import AdminInterface from "../AdminInterface";
import SubjectList from "../SubjectList";

const MainApp = () => {
  const [user] = useUserStore(
    (state) => [state.user],
    shallow
  );

  if (!user) {
    return null;
  }
  const renderUI = () => {
    switch (user.role) {
      case "student":
        return <></>;
      case "teacher":
        return <SubjectList />;
      case "admin":
        return <AdminInterface />
    }
  };

  return (
    <Layout>
      {renderUI()}
    </Layout>
  );
};

export default MainApp;
