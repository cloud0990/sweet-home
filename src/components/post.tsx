import {IPost} from "./timeline.tsx";
import {auth, db, storage} from "../firebase.ts";
import {deleteDoc, deleteField, doc, updateDoc} from "firebase/firestore"
import {deleteObject, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import React, {useState} from "react";
import {
    AttachFileInput,
    AttachFileLabel,
    AvatarImg,
    CancelBtn,
    Column,
    DeletePhoto,
    Form,
    Payload,
    Photo,
    Section, Setting,
    SubmitBtn,
    TextArea,
    User,
    Username,
    Wrapper,
    Details,
    Detail,
} from "../styles/post-components.ts";
import {Link} from "react-router-dom";

const FILE_SIZE_UNIT = 1024;

export default function Post({ username, photo, post, userId, id }:IPost) {
    const user = auth.currentUser;

    const [isLoading, setLoading] = useState(false);
    const [isFormVisible, setFormVisible] = useState(false);

    const [dPhoto, setDPhoto ] = useState(false);

    const [uPost, setUPost] = useState(post || "");
    const [uFile, setUFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isDetails, setDetails] = useState(false);

    const onPostUpdateClick = () => {
        setFormVisible(!isFormVisible);
        setUPost(post || "");
        setUFile(null);
        setDPhoto(false);
        setPreviewUrl(photo || "");
    };
    const onPostDeleteClick = async () => {
        if (user?.uid !== userId) return;
        if (!confirm("삭제 하시겠습니까?")) return;
        try {
            await deleteDoc(doc(db, "posts", id));
            if (photo) {
                const photoRef = ref(storage, `posts/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
        }
    };
    const onPostChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUPost(e.target.value);
    }
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (user?.uid !== userId) return;

        try {
            setLoading(true);
            const docRef = doc(db, "posts", id);
            if (uFile) {
                const fileRef = ref(storage, `posts/${user.uid}/${id}`);
                const result = await uploadBytes(fileRef, uFile);
                const url = await getDownloadURL(result.ref);
                await updateDoc(docRef, {
                    photo: url,
                });
            }
            if (uPost) {
                await updateDoc(docRef, {
                    post: uPost,
                    updatedAt: Date.now(),
                });
            }
            if (dPhoto) {
                await deleteObject( ref(storage, `posts/${user.uid}/${id}`) );
                await updateDoc(docRef, {
                    photo: deleteField(),
                });
            }
            onPostUpdateClick();
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    };
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        const maxFileSize = (FILE_SIZE_UNIT * FILE_SIZE_UNIT);
        if (files && files.length === 1 && files[0].size < maxFileSize) {
            setUFile(files[0]);

            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        }
    };
    const onDeletePhoto = async () => {
        setDPhoto(true);
    }
    const onSettingClick = () => {
        setDetails(!isDetails);
    }

    return (
        <Wrapper>
            <Column>
                <User>
                    {/*<Link to={`/profile/${user?.uid}`}>*/}
                    <Link to={`/profile`} style={{ textDecoration: 'none', color: 'inherit'}}>
                        { user?.photoURL && user?.uid === userId
                            ? <AvatarImg src={ user?.photoURL } />
                            : <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                              </svg>
                        }
                    </Link>
                    <Username>{ user?.uid === userId ? user?.displayName : username }</Username>
                </User>
                { isFormVisible
                    ? ( <Form onSubmit={ onSubmit }>
                            <Section className="left-section">
                                <TextArea onChange={ onPostChange } rows={3} maxLength={180} required value={ uPost } />
                                <AttachFileLabel htmlFor="fileUpdate">{ uFile ? "업로드 완료" : "사진 업로드" }</AttachFileLabel>
                                <AttachFileInput onChange={ onFileChange } type="file" id="fileUpdate" accept="image/*"/>
                                <SubmitBtn type="submit" value={ isLoading ? "수정 중..." : "수정" }/>
                                <CancelBtn onClick={ onPostUpdateClick }>취소</CancelBtn>
                            </Section>
                        </Form>
                    ) : (
                    <Payload>{ post }</Payload>
                    )
                }
            </Column>
            <Column className="photo-container">
                { photo && !isFormVisible ? <Photo src={ photo } /> : null }
                { (photo || previewUrl) && isFormVisible && !dPhoto
                    ?
                    <Section className="right-section">
                        <DeletePhoto onClick={ onDeletePhoto }>X</DeletePhoto>
                        <Photo src={ previewUrl || "" } />
                    </Section>
                    : null
                }
            </Column>
            { user?.uid === userId
                ? <Column className="setting-container">
                    <Setting onClick={ onSettingClick }>
                        <svg fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </Setting>
                    { isDetails &&
                        ( <Details>
                              <Detail onClick={ onPostUpdateClick }>수정</Detail>
                              <Detail onClick={ onPostDeleteClick }>삭제</Detail>
                          </Details>
                        )
                    }
                </Column>
                : null
            }
        </Wrapper>
    );
}