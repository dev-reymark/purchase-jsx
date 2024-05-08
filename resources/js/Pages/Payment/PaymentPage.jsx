import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
    Button,
    Card,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";

const PaymentPage = ({ auth }) => {
    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        expiry: "",
        cvc: "",
        amount: 0,
        status: "pending",
        reference: "",
        products: [],
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const total = parseFloat(urlParams.get("total") || "0");
        const reference = urlParams.get("reference") || "";
        const productData = urlParams.get("products") || "[]";
        const products = JSON.parse(productData);
        setPaymentData((prevData) => ({
            ...prevData,
            amount: total,
            reference: reference,
            products: products,
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/payments", paymentData);
            const purchaseOrderId = response.data;

            await Swal.fire({
                title: "Success!",
                text: "Payment successful!",
                icon: "success",
                confirmButtonText: "OK",
            });

            Inertia.visit(route("purchases.show", { id: purchaseOrderId }));
        } catch (error) {
            Swal.fire(
                "Error!",
                error.response.data.message || "Failed to process payment.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCancel = async () => {
        setLoading(true);
        try {
            await axios.post("/payments", {
                ...paymentData,
                cancel: true,
            });

            await Swal.fire({
                title: "Payment Cancelled!",
                text: "Your payment has been cancelled.",
                icon: "info",
                confirmButtonText: "OK",
            });

            Inertia.visit(route("purchases.index"));
        } catch (error) {
            Swal.fire(
                "Error!",
                error.response.data.message || "Failed to cancel payment.",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Authenticated
                user={auth}
                header={
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Payment
                        </h2>
                    </div>
                }
            >
                <Head title="Payment" />
                <div className="py-12">
                    <Card className="max-w-xl mx-auto mt-8 sm:px-6 lg:px-8 p-8">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                            Payment Confirmation
                        </h2>
                        <p className="mb-4">
                            Please review your order before proceeding with the
                            payment.
                        </p>

                        <div className="mb-8">
                            <h3 className="font-semibold text-lg mb-2">
                                Products ({paymentData.products.length})
                            </h3>

                            <Table aria-label="Purchase Order Products">
                                <TableHeader>
                                    <TableColumn>Products</TableColumn>
                                    <TableColumn>Unit Price</TableColumn>
                                    <TableColumn>Quantity</TableColumn>
                                </TableHeader>
                                <TableBody emptyContent="No products associated with this purchase order.">
                                    {paymentData.products.map(
                                        (product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>
                                                    ₱{product.price}
                                                </TableCell>
                                                <TableCell>
                                                    {product.quantity}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                type="text"
                                name="reference"
                                value={paymentData.reference}
                                onChange={handleChange}
                                placeholder="Reference"
                                label="Reference"
                                readOnly
                            />
                            <Input
                                type="number"
                                name="amount"
                                value={paymentData.amount}
                                onChange={handleChange}
                                placeholder="Amount"
                                readOnly
                                label="Amount to Pay (₱)"
                            />

                            <div className="space-y-4">
                                <h1 className="font-semibold">
                                    Credit/Debit Card
                                </h1>
                                <p className="text-sm">Enter your card details.</p>

                                <Input
                                    type="text"
                                    name="cardNumber"
                                    value={paymentData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="XXXXX-XXXX-XXXX-XXXX"
                                    isRequired
                                    label="Card Number"
                                />
                                <Input
                                    type="text"
                                    name="expiry"
                                    value={paymentData.expiry}
                                    onChange={handleChange}
                                    placeholder="MM/YY"
                                    isRequired
                                    label="Expiry Date"
                                />
                                <Input
                                    type="text"
                                    name="cvc"
                                    value={paymentData.cvc}
                                    onChange={handleChange}
                                    placeholder="XXX"
                                    isRequired
                                    label="CVC"
                                />
                            </div>

                            <div className="flex justify-end gap-2">
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? "Processing..." : "Pay"}
                                </Button>
                                <Button
                                    color="danger"
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={loading}
                                >
                                    {loading ? "Cancelling..." : "Cancel"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Authenticated>
        </>
    );
};

export default PaymentPage;
