'use client'
import Login from "@/app/components/login/Login";
import {Image} from "@nextui-org/react";
import "./globals.css"
import LoginContextProvider from "@/app/store/login-context";

export default function Home() {
    return (
        <div className={"w-screen h-screen flex bg-color-primary"}>
            <div className={"2xl:w-3/4 md:w-2/3 m-auto"}><Image src={"/morgan-housel-PcDGGex9-jA-unsplash.jpg"}
                                                                alt={"A Graph showing Increasing Money on Y axis and Time on X Axis"}
                                                                height={5000} width={5000}/></div>
            <div className={"2xl:w-1/4 md:w-1/3 bg-color-secondary flex justify-center"}>
                <Login></Login>
            </div>
        </div>

    )
}
