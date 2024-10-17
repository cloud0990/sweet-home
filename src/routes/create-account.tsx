import * as React from "react";
import {useState} from "react";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {FirebaseError} from "firebase/app";
import {auth, db} from "../firebase.ts";
import {Link, useNavigate} from "react-router-dom";
import {Error, Form, Input, Switcher, Title, Wrapper} from "../styles/auth-components.ts";
import GoogleButton from "../components/google-btn.tsx";
import {doc, setDoc} from "firebase/firestore";

export default function CreateAccount() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value}
        } = e;

        if (name === "name") {
            setName(value);
        }else if (name === "email") {
            setEmail(value);
        }else if (name === "password") {
            setPassword(value);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      if (isLoading || name === "" || email === "" || password === "") {
          return;
      }

      try {
          setLoading(true);
          const credentials = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(credentials.user, {
              displayName: name,
          });

          const user = auth.currentUser;
          if (user) {
              await setDoc(doc(db, "users", user?.uid), {
                  userId: user?.uid,
                  userName: user?.displayName,
                  email: user?.email,
                  avatarURL: user?.photoURL,
                  phoneNumber: user?.phoneNumber,
                  providerId: user?.providerId,
              });
          }

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
        <Wrapper>
            <Title>Join</Title>
            <Form onSubmit={onSubmit}>
                <Input onChange={onChange} name="name" value={name} placeholder="Name" type="text" />
                <Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
                <Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" />
                <Input type="submit" value={ isLoading ? "Loading..." : "Create Account" } />
            </Form>
            { error !== "" ? <Error>{ error }</Error> : null }
            <Switcher>
            이미 계정이 있으십니까? {" "}
                <Link to="/login">로그인</Link>
            </Switcher>
            <GoogleButton />
        </Wrapper>
    );
}