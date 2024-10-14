import {useEffect, useState} from "react";
import styled from "styled-components";
import {collection, limit, onSnapshot, orderBy, query, Unsubscribe} from "firebase/firestore";
import {db} from "../firebase.ts";
import Post from "./post.tsx";

export interface IPost {
    id: string,
    photo?: string;
    post: string;
    userId: string;
    createdAt: number;
    username: string;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: auto;
  scrollbar-width: thin; /* Firefox */
  &::-webkit-scrollbar {
    width: 8px; /* Scrollbar width for WebKit browsers */
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightgray; /* Color of the scrollbar thumb */
    border-radius: 10px; /* Rounded corners for the scrollbar thumb */
  }
  &::-webkit-scrollbar-track {
    background: #f0f0f0; /* Color of the scrollbar track */
  }
`;

export default function Timeline() {
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        let unsubscribe : Unsubscribe | null = null;

        const fetchPosts = async () => {
            const postQuery = query(
                collection(db, "posts"),
                orderBy("createdAt", "desc"),
                limit(25),
            );
            unsubscribe = await onSnapshot(postQuery, (snapshot) => {
                const posts = snapshot.docs.map((doc) => {
                    const { post, createdAt, userId, photo, username } = doc.data();
                    return {
                        post,
                        createdAt,
                        userId,
                        photo,
                        username,
                        id: doc.id,
                    }
                });
                setPosts(posts);
            });
        };
        fetchPosts();

        return () => {
            unsubscribe && unsubscribe();
        }
    }, []);

    return (
        <Wrapper>
            {posts.map(post => (
                <Post key={post.id} {...post} />
            ))}
        </Wrapper>
    );
}