'use client'
import {
    Avatar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Link,
    Navbar,
    NavbarBrand,
    NavbarContent, NavbarItem
} from "@nextui-org/react";
import {LoginContext} from "@/app/store/login-context";
import {useContext} from "react";
import {auth} from "@/firebase/firebase";
import {useRouter} from "next/navigation";

export default function NavBar() {

    const loginContext = useContext(LoginContext);

    const router = useRouter();

    function signOut(){
        auth.signOut().then(r => {
            console.log("Signed Out");
            loginContext.setLogout();
            router.push("/");
        });

    }

    return <>
    <Navbar  position={"static"}>
        <NavbarBrand>Portfolio Tracker</NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
                <Link color="foreground" href="#">
                    Features
                </Link>
            </NavbarItem>
            <NavbarItem isActive>
                <Link href="#" aria-current="page" color="secondary">
                    Customers
                </Link>
            </NavbarItem>
            <NavbarItem>
                <Link color="foreground" href="#">
                    Integrations
                </Link>
            </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
            <Dropdown placement="bottom-end">
                <DropdownTrigger>
                    <Avatar
                        isBordered
                        as="button"
                        className="transition-transform"
                        color="secondary"
                        name={loginContext.user?.displayName!}
                        size="sm"
                        src={loginContext.user?.photoURL!}
                    />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{loginContext.user?.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings">My Settings</DropdownItem>
                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                    <DropdownItem key="logout" color="danger" onClick={signOut}>
                        Log Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </NavbarContent>
    </Navbar>
</> }