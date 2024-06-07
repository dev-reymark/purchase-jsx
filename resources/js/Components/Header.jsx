import React from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Spacer,
} from "@nextui-org/react";
import ApplicationLogo from "./ApplicationLogo";
import { Inertia } from "@inertiajs/inertia";

export default function Header({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        { label: "Profile", url: "/profile" },
        { label: "Help & Feedback", url: "/help" },
        { label: "Log Out", action: "logout" },
    ];

    const handleLogout = () => {
        Inertia.post(route("logout"));
    };

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <ApplicationLogo />
                    {/* <p className="font-bold text-inherit">Datalogic Systems Corporation</p> */}
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="primary" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/contactus">
                        Contact Us
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    {auth.user ? (
                        <Button
                            as={Link}
                            color="primary"
                            href={route("dashboard")}
                        >
                            Dashboard
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                as={Link}
                                color="primary"
                                href={route("login")}
                            >
                                Log in
                            </Button>
                            <Button
                                as={Link}
                                color="default"
                                href={route("register")}
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {auth.user ? (
                    <>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item.label}-${index}`}>
                                {item.action === "logout" ? (
                                    <Link
                                        color="danger"
                                        size="lg"
                                        onClick={handleLogout}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <Link
                                        color="foreground"
                                        className="w-full"
                                        href={item.url}
                                        size="lg"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </NavbarMenuItem>
                        ))}
                    </>
                ) : (
                    <NavbarMenuItem>
                        <Link color="foreground" className="w-full" size="lg">
                            Help & Feedback
                        </Link>
                        <Link
                            color="foreground"
                            className="w-full"
                            href="/contactus"
                            size="lg"
                        >
                            Contact Us
                        </Link>
                    </NavbarMenuItem>
                )}
            </NavbarMenu>
        </Navbar>
    );
}
