import React, { useRef, useState } from "react";
import { Button, Checkbox, Input, Textarea } from "@nextui-org/react";
import { FaViber } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import Swal from "sweetalert2";
import { BsTextareaResize } from "react-icons/bs";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineMailLock } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Header from "@/Components/Header";
import { Head } from "@inertiajs/react";

export default function ContactPage({ auth }) {
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [subjectError, setSubjectError] = useState("");
    const [messageError, setMessageError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const formRef = useRef(null);

    const validateInput = (
        value,
        setter,
        setError
    ) => {
        setter(value);
        const errorMessage = value.trim() ? "" : "This field is required";
        setError(errorMessage);
        return errorMessage;
    };

    const validatePhone = (value) =>
        /^(\+|\d|$)[\d\s+()-]*$/.test(value);

    const validateEmail = (value) =>
        value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        formData.append("access_key", "b9776990-2966-4aac-b586-80fd1b12ebb3");

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {
            setIsLoading(true);
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });

            if (response.ok) {
                Swal.fire(
                    "Thank you!",
                    "Your message has been received. We'll get back to you shortly.",
                    "success"
                );

                if (formRef.current) {
                    formRef.current.reset();
                    setName("");
                    setPhone("");
                    setEmail("");
                    setSubject("");
                    setMessage("");
                    setAgreed(false);
                }
            } else {
                Swal.fire(
                    "Error!",
                    "An error occurred during form submission. Please try again later.",
                    "error"
                );
            }
        } catch (error) {
            Swal.fire(
                "Error!",
                "An error occurred. Please check your internet connection and try again.",
                "error"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Head title="Contact Us" />
            <Header auth={auth} />
            <main className="px-3 py-10 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
                        <div className="py-10 px-4 mx-auto max-w-screen-md">
                            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary relative">
                                    Get in Touch
                                    <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 h-[3px] w-16 bg-[#2aefe6]"></span>
                                </span>
                            </h2>
                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                                Let me know what&apos;s on your mind and
                                I&apos;ll get back to you as soon as possible.
                            </p>

                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="space-y-10"
                            >
                                <div>
                                    <Input
                                        isRequired
                                        type="text"
                                        name="name"
                                        value={name}
                                        id="name"
                                        onChange={(e) =>
                                            validateInput(
                                                e.target.value,
                                                setName,
                                                setNameError
                                            )
                                        }
                                        isInvalid={Boolean(nameError)}
                                        color={
                                            nameError
                                                ? "danger"
                                                : name && !nameError
                                                ? "success"
                                                : undefined
                                        }
                                        errorMessage={nameError}
                                        label="Full Name"
                                        placeholder="Your Name"
                                        labelPlacement="outside"
                                        startContent={
                                            <CgProfile className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        onClear={() => {
                                            setName("");
                                            setNameError(
                                                "This field is required"
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        name="phone"
                                        value={phone}
                                        id="phone"
                                        isInvalid={Boolean(phoneError)}
                                        color={
                                            phoneError
                                                ? "danger"
                                                : phone && !phoneError
                                                ? "success"
                                                : undefined
                                        }
                                        errorMessage={phoneError}
                                        label="Phone Number"
                                        placeholder="+63"
                                        description="Please input your country dialing code if you are not in the Philippines. (e.g., +1 (123) 456-7890 for US)"
                                        labelPlacement="outside"
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (validatePhone(inputValue)) {
                                                setPhone(inputValue);
                                                setPhoneError("");
                                            } else {
                                                setPhoneError(
                                                    "Only digits, plus sign (+), hyphen (-), parentheses (), and whitespace are allowed."
                                                );
                                            }
                                        }}
                                        startContent={
                                            <FaViber className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        onClear={() => {
                                            setPhone("");
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        isRequired
                                        type="email"
                                        name="email"
                                        value={email}
                                        id="email"
                                        onChange={(e) =>
                                            validateInput(
                                                e.target.value,
                                                setEmail,
                                                setEmailError
                                            )
                                        }
                                        onBlur={() => {
                                            setEmailError(
                                                validateEmail(email)
                                                    ? ""
                                                    : "Please enter a valid email"
                                            );
                                        }}
                                        isInvalid={Boolean(emailError)}
                                        color={
                                            emailError
                                                ? "danger"
                                                : email && validateEmail(email)
                                                ? "success"
                                                : undefined
                                        }
                                        errorMessage={emailError}
                                        label="Email"
                                        placeholder="sample@mail.com"
                                        labelPlacement="outside"
                                        description="I'll never share your email with anyone else."
                                        startContent={
                                            <MdOutlineMailLock className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        onClear={() => {
                                            setEmail("");
                                            setEmailError(
                                                "This field is required"
                                            );
                                        }}
                                    ></Input>
                                </div>
                                <div>
                                    <Input
                                        isRequired
                                        type="text"
                                        name="subject"
                                        value={subject}
                                        id="subject"
                                        onChange={(e) =>
                                            validateInput(
                                                e.target.value,
                                                setSubject,
                                                setSubjectError
                                            )
                                        }
                                        isInvalid={Boolean(subjectError)}
                                        color={
                                            subjectError
                                                ? "danger"
                                                : subject && !subjectError
                                                ? "success"
                                                : undefined
                                        }
                                        errorMessage={subjectError}
                                        label="Subject"
                                        placeholder="Briefly describe the purpose of your message"
                                        labelPlacement="outside"
                                        startContent={
                                            <HiOutlinePencilSquare className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                        onClear={() => {
                                            setSubject("");
                                            setSubjectError(
                                                "This field is required"
                                            );
                                        }}
                                    />
                                </div>

                                <div>
                                    <Textarea
                                        isRequired
                                        name="message"
                                        id="message"
                                        value={message}
                                        onChange={(e) =>
                                            validateInput(
                                                e.target.value,
                                                setMessage,
                                                setMessageError
                                            )
                                        }
                                        isInvalid={Boolean(messageError)}
                                        color={
                                            messageError
                                                ? "danger"
                                                : message && !messageError
                                                ? "success"
                                                : undefined
                                        }
                                        errorMessage={messageError}
                                        label="Message"
                                        placeholder="Write your message here..."
                                        labelPlacement="outside"
                                        endContent={
                                            <BsTextareaResize className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                                        }
                                    />
                                </div>

                                <div className="flex gap-x-2 sm:col-span-2 items-center">
                                    <Checkbox
                                        size="md"
                                        checked={agreed}
                                        onChange={() => setAgreed(!agreed)}
                                    ></Checkbox>
                                    <div className="text-sm leading-6 text-gray-600">
                                        <label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                                            By selecting this, you agree to
                                            terms.
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    {isLoading ? (
                                        <div className="flex items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                                        </div>
                                    ) : agreed ? (
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="shadow"
                                            size="md"
                                            startContent={<FiSend />}
                                            onClick={() => {
                                                validateInput(
                                                    name,
                                                    setName,
                                                    setNameError
                                                );
                                                validateInput(
                                                    email,
                                                    setEmail,
                                                    setEmailError
                                                );
                                                validateInput(
                                                    subject,
                                                    setSubject,
                                                    setSubjectError
                                                );
                                                validateInput(
                                                    message,
                                                    setMessage,
                                                    setMessageError
                                                );

                                                if (
                                                    !name ||
                                                    !email ||
                                                    !subject ||
                                                    !message
                                                ) {
                                                    Swal.fire(
                                                        "Please fill in all required fields.",
                                                        "",
                                                        "warning"
                                                    );
                                                }
                                            }}
                                        >
                                            Send message
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            color="primary"
                                            variant="shadow"
                                            size="md"
                                            startContent={<FiSend />}
                                            onClick={() => {
                                                Swal.fire(
                                                    "Please agree to the terms first.",
                                                    "",
                                                    "warning"
                                                );
                                            }}
                                        >
                                            Send message
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
