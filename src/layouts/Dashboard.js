import React from "react";

import Wrapper from "../components/Wrapper";
import Main from "../components/Main";
import Content from "../components/Content";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const Dashboard = ({ children }) => (
  <>
    <Wrapper>
      <SideBar />
      <Main>
        <NavBar />
        <Content>{children}</Content>
        <Footer />
      </Main>
    </Wrapper>
  </>
);

export default Dashboard;
