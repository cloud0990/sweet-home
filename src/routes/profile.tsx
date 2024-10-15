import {auth, db, storage} from "../firebase.ts";
import React, {useEffect, useRef, useState} from "react";
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {updateProfile} from "firebase/auth";
import {collection, limit, onSnapshot, orderBy, query, Unsubscribe, where, updateDoc, doc} from "firebase/firestore";
import {IPost} from '../components/timeline.tsx';
import Post from "../components/post.tsx";
import {
    Wrapper,
    Details,
    Detail,
    Column,
    Button,
    Input,
    AvatarImg,
    AvatarInput,
    Username,
    Error,
} from "../styles/profile-components.ts";

export default function Profile() {
    const user = auth.currentUser;
    const avatarRef = useRef<HTMLInputElement>(null);
    const [avatar, setAvatar] = useState(user?.photoURL || "");
    const [posts, setPosts] = useState<IPost[]>([]);
    const [username, setUsername] = useState(user?.displayName);
    const [error, setError] = useState("");
    const [isEditing, setEditing] = useState(false);
    const [isDetails, setDetails] = useState(false);

    useEffect(() => {
        let unsubscribe : Unsubscribe | null = null;

        (async () => {
            const postQuery = query(
                collection(db, "posts"),
                where("userId", "==", user?.uid),
                orderBy("createdAt", "desc"),
                limit(25),
            );

            unsubscribe = onSnapshot(postQuery, (snapshot) => {
                const posts = snapshot.docs.map((doc) => {
                    const { post, createdAt, userId, username, photo } = doc.data();
                    return {
                        post,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    };
                });
                setPosts(posts);
            });
        })();

        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    const onContextMenuToggle = () => {
        setDetails(!isDetails);
    };
    const onCancelClick = () => {
        setUsername(user?.displayName);
        setEditing(false);
        setDetails(false);
    };
    const onInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if (name === "username") {
            setUsername(value.trim());
            setError("");
        }
    };
    const onAvatarClick = () => {
        if (avatarRef.current) {
            avatarRef.current.click();
        }
    }
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!user) return;
        const {files} = e.target;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            await updateProfile(user, {
                photoURL: avatarUrl,
            });
            setAvatar(avatarUrl);

            await updateDoc(doc(db, "users", user?.uid), {
                avatarURL: avatarUrl,
            });

            onContextMenuToggle();
        }
    };
    const onAvatarDelete = async () => {
        if (!user) return;
        if (!confirm("삭제 하시겠습니까?")) return;
        try {
            const deleteRef = ref(storage, `avatars/${user?.uid}`);
            await deleteObject(deleteRef);
        } catch (e) {
            console.log(e)
        } finally {
            await updateProfile(user, {
                photoURL: "",
            });
            setAvatar("");

            await updateDoc(doc(db, "users", user?.uid), {
                avatarURL: "",
            });
        }
        setDetails(false);
    };
    const onSaveClick = async () => {
        if (!user) return;
        if (!username) {
            setError("이름을 입력해주세요.");
            return;
        }
        if (username === user?.displayName) {
            return;
        }
        await updateProfile(user, {
            displayName: username,
        });
        posts.map(post => {
            const docRef = doc(db,"posts", post.id);
            updateDoc(docRef, {
                username: username,
            });
        });
        onCancelClick();
    };
    return (
        <Wrapper>
            <Column className="avatar">
                { avatar
                    ? <AvatarImg src={ avatar } />
                    : <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                    </svg>
                }
            </Column>
            { isEditing
                ? (
                    <>
                        <Column className="profile">
                            <Button onClick={ onContextMenuToggle } className="photo">
                                <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                </svg>
                                <span>편집</span>
                            </Button>
                            { isDetails &&
                                ( <Details>
                                      <Detail onClick={ onAvatarClick }>사진 업로드</Detail>
                                      <AvatarInput ref={ avatarRef } onChange={ onAvatarChange } id="avatar" type="file" accept="image/*" />
                                      { avatar
                                          ? <Detail onClick={ onAvatarDelete }>사진 삭제</Detail>
                                          : null
                                      }
                                  </Details>
                                )
                            }
                        </Column>
                        <Input type="text" onChange={ onInputChange } name="username" placeholder="이름" value={ username || "" } required />
                        { error !== "" ? <Error>{ error }</Error> : null }
                        <Column>
                            <Button onClick={ onSaveClick } className="save">완료</Button>
                            <Button onClick={ onCancelClick } className="cancel">취소</Button>
                        </Column>
                    </>
                )
                : (
                    <>
                        <Username>{ user?.displayName }</Username>
                        <Button onClick={ () => setEditing(true) } className="edit">프로필 편집</Button>
                    </>
                )
            }
            <Column className="posts">
                { posts.map(post => (
                    <Post key={post.id} {...post} />
                ))}
            </Column>
        </Wrapper>
    );
}