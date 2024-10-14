import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TextArea = styled.textarea`
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: #333;
  background-color: #f8f9fa;
  width: 100%;
  resize: none;
  &::placeholder {
    color: #aaa;
    font-size: 16px;
  }
  &:focus {
    border-color: #b0c4de;
    box-shadow: 0 0px 8px rgba(176, 196, 222, 0.4);
    outline: none;
  }
`;
export const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #333;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #ccc;
  background-color: #e9ecef;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #ccc;
    transform: translateY(-3px);
  }
`;
export const AttachFileInput = styled.input`
  display: none;
`;

export const SubmitBtn = styled.input`
  background-color: #b0c4de;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  &:hover {
    background-color: #a0b0c0;
    transform: translateY(-3px);
  }
`;
