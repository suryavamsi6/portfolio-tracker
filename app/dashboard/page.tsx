'use client'

import {useContext} from "react";
import {LoginContext} from "@/app/store/login-context";
import NavBar from "@/app/components/navbar/NavBar";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

export default function Dashboard(){
    const loginContext = useContext(LoginContext);
    const router = useRouter();
    const UPSTOX_URI = "https://api.upstox.com/v2/login/authorization/dialog?response_type=code";


    const loginUpstox = () => {
        const uri = createURI();
        router.push(uri);
    }

    const createURI = () => {
        const clientId = process.env.NEXT_PUBLIC_UPSTOX_CLIENT_ID;
        const redirectUri = process.env.NEXT_PUBLIC_UPSTOX_REDIRECT_URI;
        const state = process.env.NEXT_PUBLIC_UPSTOX_STATE;
        const uri = `${UPSTOX_URI}&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
        return uri;
    }

    return <>
        <NavBar></NavBar>
        <Button onClick={loginUpstox}>Login To Upstox</Button>
        <div>This is Dashboard</div>
        <div>{loginContext.user?.email},{loginContext.user?.displayName},{loginContext.isLoggedIn.toString()}</div>
    </>
}