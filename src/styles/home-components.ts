import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  gap: 50px;
  grid-template-rows: 1fr 5fr;
  background-color: #f4f6f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    gap: 30px;
    grid-template-rows: 1fr 4fr;
  }

  @media (max-width: 480px) {
    gap: 20px;
    grid-template-rows: 1fr 3fr;
  }
`;