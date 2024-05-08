import Header from "@/Components/Header";
import { Link, Head } from "@inertiajs/react";
import { Button } from "@nextui-org/react";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <Header auth={auth} />

            <div className="relative min-h-screen flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                    <main>
                        <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-[1] before:transform before:-translate-x-1/2 dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')]">
                            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                                <div className="flex justify-center">
                                    <a
                                        className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
                                        href="#"
                                    >
                                        Explore the Capital Product
                                    </a>
                                </div>

                                <div className="mt-5 max-w-xl text-center mx-auto">
                                    <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
                                        Resupply faster and never run out of
                                        stock
                                    </h1>
                                </div>

                                <div className="mt-5 max-w-3xl text-center mx-auto">
                                    <p className="text-lg text-gray-600 dark:text-gray-400">
                                        Manage your purchase orders efficiently
                                        with our intuitive system.
                                    </p>
                                </div>

                                <div className="mt-8 gap-3 flex justify-center">
                                    <Button
                                        className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4 dark:focus:ring-offset-gray-800"
                                        href="#"
                                    >
                                        Start now - It's free
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden">
                            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
                                <div className="max-w-2xl text-center mx-auto">
                                    <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl dark:text-white">
                                        Designed for you to get more{" "}
                                        <span className="text-blue-600">
                                            simple
                                        </span>
                                    </h1>
                                    <p className="mt-3 text-lg text-gray-800 dark:text-gray-400">
                                        Buy your next purchase here. Take it
                                        anywhere.
                                    </p>
                                </div>

                                <div className="mt-10 relative max-w-5xl mx-auto">
                                    <div className="w-full object-cover h-96 sm:h-[480px] bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

                                    <div className="absolute inset-0 size-full">
                                        <div className="flex flex-col justify-center items-center size-full"></div>
                                    </div>

                                    <div className="absolute bottom-12 -start-20 -z-[1] size-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
                                        <div className="bg-white size-48 rounded-lg dark:bg-slate-900"></div>
                                    </div>

                                    <div className="absolute -top-12 -end-20 -z-[1] size-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
                                        <div className="bg-white size-48 rounded-full dark:bg-slate-900"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
                        <FooterComponent />
                    </footer> */}
                </div>
            </div>
        </>
    );
}
