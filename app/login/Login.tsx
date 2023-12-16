'use client'

import {Card, CardHeader, CardBody, CardFooter, Input, Button} from "@nextui-org/react";
import {EyeFilledIcon, EyeSlashFilledIcon, MailIcon} from "@nextui-org/shared-icons";
import {useState} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {ValidationState} from "@react-types/shared";
import {zodResolver} from '@hookform/resolvers/zod';
import {getAuth, GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {auth} from "@/firebase/firebase";
import {FirebaseError} from "@firebase/util";
export default function Login() {
    const mySchema = z.object({
        email: z.string().email({message: "Must be a valid email"}).min(1, {message: "Email is required"}),
        password: z.string().min(8).max(50).min(6, {message: "Password must be at least 6 characters long"})
    });

    type mySchemaType = z.infer<typeof mySchema>;

    const {register, handleSubmit, watch, formState: {errors}} = useForm<mySchemaType>({
        resolver: zodResolver(mySchema)
    });
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();


    const onSubmit: SubmitHandler<mySchemaType> = (data: any) => {
        console.log(data);
        router.push("/dashboard");
    }

    const toggleVisibility = () => setIsVisible(!isVisible);

    const provider = new GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    provider.setCustomParameters({
        login_hint: "user@gmail.com",
    });

    function signIn() {

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                if (credential !== null) {
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                }
                router.push("/dashboard");

            })
            .catch((error: FirebaseError) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // @ts-ignore
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (<>
        <Card className={"w-3/4 m-auto"}>
            <CardHeader className={"justify-center"}> Login </CardHeader>
            <CardBody className={"flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"}>
                    <Input variant={"flat"} radius={"md"} type={"email"} label={"Email"} fullWidth={true}
                           labelPlacement={'outside'} isRequired={true}
                           endContent={<MailIcon
                               className={"text-2xl text-default-400 pointer-events-none"}/>} {...register("email")}/>
                    {errors.email && <span className={"text-red-500"}>{errors.email.message}</span>}
                    <Input variant={"flat"} radius={"md"} label={"Password"} fullWidth={true}
                           labelPlacement={"outside"} isRequired={true} endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                            )}
                        </button>
                    }
                           type={isVisible ? "text" : "password"} {...register("password")}/>
                    {errors.password && <span className={"text-red-500"}>{errors.password.message}</span>}
                    <Button color={"primary"} radius={"md"} type={"submit"} fullWidth={true} onClick={handleSubmit(onSubmit)}>Login</Button>
                    <Button color={"primary"} radius={"md"} fullWidth={true} type={"submit"} onClick={signIn}
                            endContent={<Image alt={"Google Logo"} width={30}
                                               height={30} src={"/web_dark_rd_na.svg"}/>}>Login with Google </Button>
            </CardBody>
        </Card>
    </>)
}