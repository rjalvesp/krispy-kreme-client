import styled from "styled-components";

const centered = `
  align-items: center;
  justify-content: center;
`;

const FullPageContainer = styled.div`
  height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;

  ${(props) => (props.auth ? centered : "")};

  background-color: ${({ auth, theme }) =>
    auth ? theme.colors.reverseBg : theme.colors.bg};
`;

export { FullPageContainer };
