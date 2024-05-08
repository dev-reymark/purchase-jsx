import React, { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Chip,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Select,
    SelectItem,
} from "@nextui-org/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaPlus } from "react-icons/fa";
import { EyeIcon, DeleteIcon, SearchIcon } from "@/Components/Icons";
import { RiSecurePaymentFill } from "react-icons/ri";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

const statusColorMap = {
    cancelled: "danger",
    pending: "warning",
    completed: "success",
};

const rowsPerPageOptions = [
    {
        label: "5 per page",
        value: "5",
    },
    {
        label: "10 per page",
        value: "10",
    },
    {
        label: "15 per page",
        value: "15",
    },
];

const PurchaseOrders = ({ purchases, auth }) => {
    const [filterValue, setFilterValue] = useState("");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredPurchases = useMemo(() => {
        return purchases.filter((purchase) =>
            purchase.reference.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [purchases, filterValue]);

    const totalPages = Math.ceil(filteredPurchases.length / rowsPerPage);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(1);
    };

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = Math.min(
        startIndex + rowsPerPage,
        filteredPurchases.length
    );

    const paginatedPurchases = filteredPurchases.slice(startIndex, endIndex);
    const [selectedPurchase, setSelectedPurchase] = useState(null);

    const handleEyeClick = (purchase) => {
        setSelectedPurchase(purchase);
    };

    const handleModalClose = () => {
        setSelectedPurchase(null);
    };

    const handlePaymentClick = (purchase) => {
        if (purchase.status === "pending") {
            const paymentRoute = route("payments.create", {
                total: purchase.total,
                reference: purchase.reference,
            });
            Inertia.visit(paymentRoute);
        }
    };

    const handleDelete = async (purchaseId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            });

            if (result.isConfirmed) {
                await Inertia.delete(route("purchases.destroy", purchaseId));
                Swal.fire(
                    "Deleted!",
                    "Your purchase order has been deleted.",
                    "success"
                );
            }
        } catch (error) {
            console.error("Error deleting purchase order:", error);
            Swal.fire(
                "Error!",
                "An error occurred while deleting the purchase order.",
                "error"
            );
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Purchase Orders
                    </h2>
                </div>
            }
        >
            <Head title="Purchase Orders" />
            <div className="py-8 px-4">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-3 items-end">
                            <Button
                                as={Link}
                                href={route("purchases.create")}
                                color="primary"
                                endContent={<FaPlus />}
                            >
                                Create
                            </Button>
                            <Input
                                color="primary"
                                variant="bordered"
                                className="w-full sm:max-w-[35%]"
                                value={filterValue}
                                onChange={(e) => setFilterValue(e.target.value)}
                                placeholder="Search by reference..."
                                startContent={
                                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                                }
                            />
                        </div>
                    </div>

                    <div className="flex justify-between gap-3 items-end py-5">
                        <p>Total {filteredPurchases.length} records</p>
                        <Select
                            value={rowsPerPage.toString()}
                            onChange={handleRowsPerPageChange}
                            className="max-w-[200px]"
                            aria-label="Rows per page"
                            size="sm"
                            label="Rows per page"
                        >
                            {rowsPerPageOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value.toString()}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>

                    <Table
                        aria-label="Purchase Orders Table"
                        selectionMode="single"
                    >
                        <TableHeader>
                            <TableColumn>REFERENCE</TableColumn>
                            <TableColumn>BUYER</TableColumn>
                            <TableColumn>DATE</TableColumn>
                            <TableColumn>TOTAL</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No purchase orders found."}>
                            {paginatedPurchases.map((purchase) => (
                                <TableRow
                                    key={purchase.id}
                                    onDoubleClick={() => {
                                        Inertia.visit(
                                            route("purchases.show", purchase.id)
                                        );
                                    }}
                                >
                                    <TableCell>{purchase.reference}</TableCell>
                                    <TableCell>{purchase.buyer}</TableCell>
                                    <TableCell>
                                        {new Date(
                                            purchase.created_at
                                        ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        {"₱" +
                                            " " +
                                            purchase.total.toLocaleString()}{" "}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            size="sm"
                                            color={
                                                statusColorMap[
                                                    purchase.status
                                                ]
                                            }
                                            className="capitalize font-bold"
                                        >
                                            {purchase.status}
                                        </Chip>
                                    </TableCell>
                                    <TableCell>
                                        <div className="relative flex items-center gap-2">
                                            {purchase.status === "pending" ? (
                                                <RiSecurePaymentFill
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        handlePaymentClick(
                                                            purchase
                                                        )
                                                    }
                                                />
                                            ) : (
                                                <RiSecurePaymentFill
                                                    style={{
                                                        opacity: 0.5,
                                                        cursor: "not-allowed",
                                                    }}
                                                />
                                            )}
                                            <EyeIcon
                                                className="cursor-pointer"
                                                onClick={() =>
                                                    handleEyeClick(purchase)
                                                }
                                            />

                                            <DeleteIcon
                                                className="text-danger cursor-pointer"
                                                onClick={() =>
                                                    handleDelete(purchase.id)
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="py-5 px-2 flex justify-center items-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            total={totalPages}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
            {selectedPurchase && (
                <PurchaseOrderModal
                    isOpen={true}
                    onClose={handleModalClose}
                    purchase={selectedPurchase}
                />
            )}
        </Authenticated>
    );
};

export default PurchaseOrders;

const PurchaseOrderModal = ({ isOpen, onClose, purchase }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">
                    Purchase Order Details
                </ModalHeader>
                <ModalBody>
                    <Input
                        readOnly
                        label="Reference"
                        value={purchase.reference}
                        variant="bordered"
                    />
                    <Input
                        readOnly
                        label="Buyer"
                        value={purchase.buyer}
                        variant="bordered"
                    />
                    <Input
                        readOnly
                        label="Date"
                        value={new Date(purchase.created_at).toLocaleString()}
                        variant="bordered"
                    />
                    <Input
                        readOnly
                        label="Total"
                        value={"₱" + " " + purchase.total.toLocaleString()}
                        variant="bordered"
                    />
                    <Input
                        readOnly
                        label="Status"
                        value={purchase.status}
                        variant="bordered"
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
