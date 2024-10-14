import styled from "styled-components";
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../firebase";
import {useNavigate} from "react-router-dom";
import {FirebaseError} from "firebase/app";

const Button = styled.span`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 50px;
  margin-top: 50px;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 40px;
  font-size: 16px;
  &:hover {
    border-color: #b0c4de;
    box-shadow: 0 0px 8px rgba(176, 196, 222, 0.4);
    outline: none;
  }
`;

const Logo = styled.img`
`;

export default function GoogleButton() {
    const navigate = useNavigate();

    const onClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                alert(e)
                // setError(e.message);
            }
        }
    }

    return (
        <Button onClick={onClick}>
            <Logo src="google-logo.svg" />
            구글 로 계속하기
        </Button>
    );
};