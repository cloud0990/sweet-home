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
  transition: transform 0.3s ease, opacity 0.3s ease;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;
export const Column = styled.div`
  &.photo-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &.setting-container {
    position: absolute;
    grid-row: 1;
    left: 64%;
    @media (max-width: 480px) {
      left: 87%;
    }
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
    margin-left: 10px;
    width: 100%;
    margin-top: 30px;
    //display: flex;
    //align-items: center;
    //justify-content: center;
    @media (max-width: 480px) {
      margin-top: 10px;
    }
  }
`;
export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  top: -6%;
  left: -6%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 480px) {
    width: 20px;
    height: 20px;
    top: -3%;
    left: -3%;
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
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;
export const Username = styled.span`
  font-weight: 600;
  font-size: 16px;
  margin-right: auto;
  @media (max-width: 480px) {
    font-size: 13px;
  }
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
  @media (max-width: 480px) {
    font-size: 15px;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
export const TextArea = styled.textarea`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #333;
  width: 100%;
  resize: none;
  &:focus {
    border-color: #b0c4de;
    box-shadow: 0 0px 8px rgba(176, 196, 222, 0.4);
    outline: none;
  }
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
export const AttachFileLabel = styled.label`
  background-color: #e9ecef;
  text-align: center;
  padding: 5px 10px;
  color: black;
  border-radius: 25px;
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    //opacity: 0.8;
    background-color: #ccc;
    transform: translateY(-3px);
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;
export const AttachFileInput = styled.input`
  display: none;
`;
export const SubmitBtn = styled.input`
  background-color: #b0c4de;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #a0b0c0;
    transform: translateY(-3px);
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;
export const CancelBtn = styled.button`
  background-color: gray;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 480px) {
    font-size: 11px;
  }
`;
export const Details = styled.div`
  position: absolute;
  font-size: 12px;
  top: 0;
  left: -150%;
  background-color: #f4f6f9;
  border: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &::before {
    content: "";
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #ddd;
    position: absolute;
    top: 15%;
    left: 90%;
    transform: rotate(-270deg);
  }
  @media (max-width: 480px) {
    font-size: 8px;
    left: -120%;
  }
`;
export const Detail = styled.div`
  width: 100%;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  @media (max-width: 480px) {
    padding: 8px;
  }
`;