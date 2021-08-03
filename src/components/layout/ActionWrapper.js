import styled from "styled-components";

const ActionWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;

  margin: 1rem 0;

  justify-content: flex-start;

  .action:nth-child(2n) {
    justify-self: flex-end;
  }
`;

export { ActionWrapper };
