import PostForm from "../components/post-form.tsx";
import Timeline from "../components/timeline.tsx";
import {Wrapper} from "../styles/home-components.ts";

export default function Home() {
    return (
        <Wrapper>
            <PostForm />
            <Timeline />
        </Wrapper>
    );
}