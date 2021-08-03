import React from "react";
import styled from "styled-components";
import { FullPageContainer } from "components/layout";
import Header from "components/layout/Header";

const ContentBox = styled.div`
  height: calc(100vh - 68px);
  overflow-y: auto;
  padding: 4rem;
`;

const DashboardWrapper = ({ children }) => (
  <FullPageContainer>
    <Header />
    <ContentBox>{children}</ContentBox>
  </FullPageContainer>
);

export default DashboardWrapper;
