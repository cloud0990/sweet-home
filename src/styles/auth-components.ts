import styled from "styled-components";

export const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f4f6f9; /* 부드러운 회색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
`;

export const Wrapper = styled.div`
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 20px;
  background-color: #ffffff; /* 흰색 배경으로 변경하여 메인 색상 강조 */
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #2c3e50;

  @media (max-width: 768px) {
    width: 90%;
    padding: 40px 10px;
  }
  @media (max-width: 480px) {
    width: 95%;
    padding: 30px 10px;
  }
`;

export const Title = styled.h1`
  font-size: 42px;
  color: #333; /* 세련된 진한 회색 */
  text-align: center;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 36px;
  }
  @media (max-width: 480px) {
    font-size: 30px;
  }
`;

export const Form = styled.form`
  margin-top: 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

export const Input = styled.input`
  padding: 12px 24px;
  border-radius: 50px;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 16px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    border-color: #b0c4de;
    box-shadow: 0 0px 8px rgba(176, 196, 222, 0.4);
    outline: none;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
  @media (max-width: 480px) {
    font-size: 12px;
    padding: 10px 18px;
  }

  &[type="submit"] {
    background-color: #b0c4de;
    color: white;
    cursor: pointer;
    border: none;
    font-weight: bold;
    box-shadow: 0 4px 12px rgba(176, 196, 222, 0.4);
    transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    &:hover {
      background-color: #7a9ab7;
      transform: translateY(-3px);
      box-shadow: 0 6px 12px rgba(176, 196, 222, 0.4);
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: #ff6b6b; /* 세련된 빨간색 */
  font-size: 14px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Switcher = styled.span`
  margin-top: 20px;
  font-size: 16px;
  color: #555;
  a {
    color: gray;
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: dimgray;
    }
  }
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;