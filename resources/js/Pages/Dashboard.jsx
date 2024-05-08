import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, Tooltip } from "@nextui-org/react";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { AiOutlineAppstore, AiOutlineQuestionCircle } from "react-icons/ai";

export default function Dashboard({
    auth,
    purchaseCount,
    productCount,
    totalSales,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto p-6 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card as={Link} isPressable href={route("purchases.index")}>
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                                <FaShoppingCart className="text-primary" />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Total Purchases
                                    </p>
                                    <Tooltip
                                        showArrow
                                        size="sm"
                                        placement="right"
                                        content="Total number of purchases by all clients"
                                    >
                                        <div className="hs-tooltip-toggle">
                                            <AiOutlineQuestionCircle />
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                        {purchaseCount}
                                    </h3>
                                    <span className="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100">
                                        <svg
                                            className="inline-block size-4 self-center"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                                            <polyline points="16 7 22 7 22 13" />
                                        </svg>
                                        <span className="inline-block text-xs font-medium">
                                            12.5%
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card as={Link} isPressable href={route("products.index")}>
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                                <AiOutlineAppstore className="text-secondary" />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Products
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl font-medium text-gray-800 dark:text-neutral-200">
                                        {productCount}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="p-4 md:p-5 flex gap-x-4">
                            <div className="flex-shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
                                <FaDollarSign className="text-success" />
                            </div>

                            <div className="grow">
                                <div className="flex items-center gap-x-2">
                                    <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500">
                                        Total Sales
                                    </p>
                                </div>
                                <div className="mt-1 flex items-center gap-x-2">
                                    <h3 className="text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200">
                                        {"₱" + totalSales}
                                    </h3>
                                    <span className="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100">
                                        <svg
                                            className="inline-block size-4 self-center"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        >
                                            <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
                                            <polyline points="16 17 22 17 22 11" />
                                        </svg>
                                        <span className="inline-block text-xs font-medium">
                                            1.7%
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
