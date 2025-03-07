import {Link, Outlet, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {auth, db} from "../firebase.ts";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, Unsubscribe, where} from "firebase/firestore";
import {AvatarImg} from "../styles/common/common-components.ts"

const Wrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 4fr;
  height: 100%;
  padding: 50px 0px;
  width: 100%;
  max-width: 860px;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid black;
  height: 50px;
  width: 50px;
  margin-bottom: 10px;
  border-radius: 50%;
  svg {
    width: 30px;
    fill: black;
  }
  &.log-out {
    border-color: gray;
    svg {
      fill: gray;
    }
  }
  &:hover {
    opacity: 0.7;
  }
`;
export default function Layout() {
    const user = auth.currentUser;
    const navigate = useNavigate();
    const onLogout = async () => {
        const ok = confirm("로그아웃 하시겠습니까?");
        if (ok) {
            await auth.signOut();
            navigate("/login");
        }
    };

    const [avatarURL, setAvatarURL] = useState<string | null>(null);
    useEffect(() => {
        let unsubscribe : Unsubscribe | null = null;

        (async () => {
            const postQuery = query(
                collection(db, "users"),
                where("userId", "==", user?.uid),
            );

            unsubscribe = onSnapshot(postQuery, (snapshot) => {
                setAvatarURL(snapshot.docs[0].data().avatarURL)
            });
        })();

        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);

    return (
        <Wrapper>
            <Menu>
                <Link to="/">
                    <MenuItem>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" />
                        </svg>
                    </MenuItem>
                </Link>
                <Link to="/profile">
                    <MenuItem>
                        { avatarURL
                            ? <AvatarImg src={ avatarURL } />
                            : <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                              </svg>
                        }
                    </MenuItem>
                </Link>
                    <MenuItem onClick={ onLogout } className="log-out">
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" />
                            <path clipRule="evenodd" fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" />
                        </svg>
                    </MenuItem>
            </Menu>
            <Outlet />
        </Wrapper>
    );
}