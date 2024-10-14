import React, {useState} from "react";
import {addDoc, collection, updateDoc} from "firebase/firestore";
import {auth, db, storage} from "../firebase.ts";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {Form, TextArea, AttachFileButton, AttachFileInput, SubmitBtn} from "../styles/post-form-components.ts";

const FILE_SIZE_UNIT = 1024;

export default function PostForm() {
    const [isLoading, setLoading] = useState(false);
    const [post, setPost] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPost(e.target.value);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.target;
        const maxFileSize = (FILE_SIZE_UNIT * FILE_SIZE_UNIT);
        if (files && files.length === 1 && files[0].size < maxFileSize) {
            setFile(files[0]);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user === null || isLoading || post === "" || post.length > 180) return;

        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "posts"), {
                userId: user.uid,
                username: user.displayName || "(이름없음)",
                post,
                createdAt: Date.now(),
            });

            if (file) {
                const locationRef = ref(storage, `posts/${user.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }

            setPost("");
            setFile(null);
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <TextArea rows={5} maxLength={180} onChange={onChange} value={post} placeholder="문구를 추가하세요." required />
            <AttachFileButton htmlFor="file">{ file ? "업로드 완료" : "사진 업로드" }</AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
            <SubmitBtn type="submit" value={ isLoading ? "작성 중..." : "작성" } />
        </Form>
    );
}