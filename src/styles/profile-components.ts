import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  flex-direction: column;
  grid-template-rows: 1fr 5fr;
  background-color: #f4f6f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    gap: 15px;
    grid-template-rows: 1fr 4fr;
  }
  @media (max-width: 480px) {
    gap: 10px;
    grid-template-rows: 1fr 3fr;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  &.avatar {
    position: relative;
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 80px;
      height: 80px;
      overflow: hidden;
    }
    @media (max-width: 480px) {
      width: 60px;
      height: 60px;
      svg {
        width: 60px;
        height: 60px;
      }
    }
  }
  &.profile {
    position: absolute;
    display: flex;
    transform: translate(70%, 250%);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    z-index: 10;
  }
  &.posts {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media (max-width: 768px) {
      gap: 8px;
    }
    @media (max-width: 480px) {
      gap: 5px;
    }
  }
`;
export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarInput = styled.input`
  display: none;
  width: 100%;
`;

export const Username = styled.span`
  font-size: 22px;
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const Input = styled.input`
  width: 50%;
  font-size: 20px;
  text-align: center;
  padding: 10px 20px;
  border-radius: 50px;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 70%;
    font-size: 18px;
  }

  @media (max-width: 480px) {
    width: 90%;
    font-size: 16px;
    padding: 8px 16px;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 5px 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  border-radius: 20px;
  border: none;
  background-color: #b0c4de;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #a0b0c0;
    transform: translateY(-3px);
  }
  &.photo {
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 10;
    width: 100%;
    height: 25px;
    svg {
      width: 30%;
      height: 100%;
      margin-right: 5px;
    }
  }
  &.edit {
    padding: 10px 10px;
    font-size: 14px;
  }
  &.cancel {
    background-color: #ccc;
  }
  @media (max-width: 480px) {
    font-size: 10px;
    padding: 4px 8px;
    width: 60px;
  }
`;
export const Details = styled.div`
  position: absolute;
  top: calc(100% + 70%);
  width: calc(100% + 50%);
  left: 30%;
  font-size: 12px;
  background-color: #f4f6f9;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    left: 10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
  }
  @media (max-width: 480px) {
    width: 120px;
    font-size: 10px;
  }
`;
export const Detail = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0; /* 원래 색상으로 유지 */
  }

  @media (max-width: 480px) {
    padding: 8px;
  }
`;
export const Error = styled.span`
  font-weight: 600;
  font-size: 13px;
  color: tomato; /* 원래 색상으로 유지 */
  margin-top: -1%;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;
