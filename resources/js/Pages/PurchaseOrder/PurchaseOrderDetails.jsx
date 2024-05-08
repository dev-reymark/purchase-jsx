import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Button, Input, Textarea } from "@nextui-org/react";
import { Inertia } from "@inertiajs/inertia";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import QRCode from "react-qr-code";

const PurchaseOrderDetails = () => {
    const { purchaseOrder } = usePage().props;

    const getStatusColor = () => {
        switch (purchaseOrder.status) {
            case "cancelled":
                return "danger";
            case "pending":
                return "warning";
            case "completed":
                return "success";
            default:
                return "";
        }
    };

    const statusColor = getStatusColor();

    return (
        <Authenticated
            user={{}}
            header={
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Purchase Order Details
                    </h2>
                </div>
            }
        >
            <Head title="Purchase Order Details" />
            <div className="py-12">
                <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
                    <div className="mb-4">
                        <Input
                            readOnly
                            label="Reference"
                            value={purchaseOrder.reference}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            readOnly
                            label="Buyer"
                            value={purchaseOrder.buyer}
                        />
                    </div>

                    <div className="mb-4">
                        <Input
                            readOnly
                            label="Total Amount Paid"
                            value={"₱" + purchaseOrder.total}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            readOnly
                            label="Order Date"
                            value={new Date(
                                purchaseOrder.created_at
                            ).toLocaleString()}
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            readOnly
                            label="Status"
                            value={purchaseOrder.status}
                            color={statusColor}
                        />
                    </div>
                    <div className="mb-4">
                        <Table aria-label="Purchase Order Products">
                            <TableHeader>
                                <TableColumn>Products</TableColumn>
                                <TableColumn>Price</TableColumn>
                                <TableColumn>Quantity</TableColumn>
                                <TableColumn>QR Code</TableColumn>
                            </TableHeader>
                            <TableBody emptyContent="No products associated with this purchase order.">
                                {purchaseOrder.products.map((product) => (
                                    <TableRow key={product.id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>₱{product.price}</TableCell>
                                        <TableCell>
                                            {product.pivot.quantity}
                                        </TableCell>
                                        <TableCell>
                                            <QRCode
                                                value={product.id}
                                                size={40}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-10">
                            <Textarea
                                isReadOnly
                                label="Redemption Instructions"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Scan the QR code above to redeem your purchase. Thank you for your patronage."
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button
                            color="primary"
                            onClick={() =>
                                Inertia.visit(route("purchases.index"))
                            }
                        >
                            Close
                        </Button>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default PurchaseOrderDetails;
