import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 3fr 1.3fr;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 15px;
  background-color: #ffffff;
  position: relative;
`;
export const Column = styled.div`
  &.photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.setting-container {
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;
export const Section = styled.div`
  &.left-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &.right-section {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const Photo = styled.img`
  width: 125px;
  height: 125px;
`;
export const DeletePhoto = styled.button`
  background-color: black;
  color: white;
  border: 0;
  font-size: 10px;
  border-radius: 50%;
  cursor: pointer;
  width: 25px;
  height: 25px;
  position: absolute;
  z-index: 10;
  top: -10%;
  left: -7%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
`;
export const User = styled.label`
  width: 100%;
  margin-bottom: 8%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;
  justify-content: space-between;
  svg {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    svg {
      width: 60px;
      height: 60px;
    }
  }
`;
export const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
export const Username = styled.span`
  font-weight: 600;
  font-size: 16px;
  margin-right: auto;
`;
export const Setting = styled.div`
  svg {
    opacity: 0.3;
    width: 30px;
    height: 30px;
  }
  &:hover {
    cursor: pointer;
    color: dimgray;
  }
`;
export const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TextArea = styled.textarea`
  border: 1px solid gray;
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &:focus {
    outline: none;
    border-color: black;
  }
`;
export const AttachFileLabel = styled.label`
  text-align: center;
  padding: 5px 10px;
  color: black;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export const AttachFileInput = styled.input`
  display: none;
`;
export const SubmitBtn = styled.input`
  background-color: black;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export const CancelBtn = styled.button`
  background-color: gray;
  color: white;
  border: 0;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;
export const Details = styled.div`
  position: absolute;
  width: calc(100% + 100%);
  font-size: 12px;
  left: 100%;
  top: 0;
  background-color: #f4f6f9;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
    position: absolute;
    top: 15%;
    left: -15px;
    transform: rotate(-90deg);
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