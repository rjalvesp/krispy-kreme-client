import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { FullPageContainer } from "components/layout";
import Logo from "assets/images/logo.png";

const ChildrenBox = styled.div`
  width: 30rem;

  padding: 2rem 4rem 3rem;
`;

const HeaderBox = styled.div`
  img {
    height: 10rem;
  }
`;

const AuthWrapper = ({ children }) => (
  <FullPageContainer auth={true}>
    <HeaderBox>
      <img src={Logo} alt="Krispy Kreme" />
    </HeaderBox>
    <Paper elevation={3}>
      <ChildrenBox>{children}</ChildrenBox>
    </Paper>
  </FullPageContainer>
);

export default AuthWrapper;
