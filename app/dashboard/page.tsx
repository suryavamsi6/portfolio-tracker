'use client'

import {useContext} from "react";
import {LoginContext} from "@/app/store/login-context";
import NavBar from "@/app/components/navbar/NavBar";

export default function Dashboard(){
    const loginContext = useContext(LoginContext);

    return <>
        <NavBar></NavBar>
        <div>This is Dashboard</div>
        <div>{loginContext.user?.email},{loginContext.user?.displayName},{loginContext.isLoggedIn.toString()}</div>
    </>
}