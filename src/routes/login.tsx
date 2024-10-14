import * as React from "react";
import {useState} from "react";
import {FirebaseError} from "firebase/app";
import {Link, useNavigate} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase.ts";
import {Background, Error, Form, Input, Switcher, Title, Wrapper} from "../styles/auth-components.ts";
import GoogleButton from "../components/google-btn.tsx";

export default function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value}
        } = e;

        if (name === "email") {
            setEmail(value);
        }else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (isLoading ||email === "" || password === "") {
            return;
        }

        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Background>
        <Wrapper>
            <Title>Log in</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" />
                <Input type="submit" value={ isLoading ? "Loading..." : "Log in" } />
            </Form>
            { error !== "" ? <Error>{ error }</Error> : null }
            <Switcher>
                <Link to="/create-account">회원가입</Link>
            </Switcher>
            <GoogleButton />
        </Wrapper>
        </Background>

    );
}