import styled, { ThemeProvider } from "styled-components";
import React from "react";
import { Context as ThemeContext } from "src/ThemeProvider";
import { withRouter } from "react-router";
import { Centered } from "src/Style";
import TopBar from "./TopBar";

const Page = ({ title, isRoot, pageContent }) => {
  return (
    <PageWrapper>
      <TopBar title={title} showBack={!isRoot} />
      <ContentWrapper>{pageContent}</ContentWrapper>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  height: 70%
  width: 70%;
  overflow: hidden;
  grid-gap: 3%;
  display: grid;
  justify-items: normal;
  background-color: ${props => props.theme.secondary.bgColor};
  grid-template-rows: 10% 90%;
`;

const ContentWrapper = styled.section`
  background-color: ${props => props.theme.tersiary.bgColor};
  height: 100%;
`;

export default Page;
