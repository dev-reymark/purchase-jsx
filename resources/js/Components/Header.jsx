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

export default function Header({ auth }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = ["Profile", "Help & Feedback", "Log Out"];

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
                    <Link color="foreground" href="/contactus">Contact Us</Link>
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
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                    ? "danger"
                                    : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
