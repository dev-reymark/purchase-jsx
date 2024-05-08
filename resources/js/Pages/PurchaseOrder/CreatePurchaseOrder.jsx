import React, { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import axios from "axios";
import {
    Button,
    Chip,
    Divider,
    Input,
    Select,
    SelectItem,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { DeleteIcon } from "@/Components/Icons";

const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
        ? description.substring(0, maxLength) + "..."
        : description;
};

const PurchaseOrderForm = ({ reference, currentUser, products, auth }) => {
    const [formData, setFormData] = React.useState({
        reference: reference,
        buyer: currentUser.name,
        email: currentUser.email,
        total: 0,
        status: "pending",
        vendor: "Datalogic Systems Corporation",
        selectedProduct: [],
        products: [],
    });

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            reference: reference,
        }));
    }, [reference]);

    useEffect(() => {
        const total = formData.products.reduce(
            (acc, product) => acc + product.quantity * product.unitPrice,
            0
        );
        setFormData((prevState) => ({
            ...prevState,
            total: total,
        }));
    }, [formData.products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProductSelect = (e) => {
        const productId = parseInt(e.target.value);
        const selectedProduct = products.find(
            (product) => product.id === productId
        );
        if (selectedProduct) {
            const updatedProducts = [
                ...formData.products,
                {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    description: selectedProduct.description,
                    quantity: 1,
                    unitPrice: selectedProduct.price,
                    is_vat_exempt: selectedProduct.is_vat_exempt === "1",
                    vat_rate:
                        selectedProduct.is_vat_exempt === "0"
                            ? selectedProduct.vat_rate
                            : 0,
                },
            ];
            setFormData((prevState) => ({
                ...prevState,
                products: updatedProducts,
            }));
        }
    };

    const handleQuantityChange = (productId, quantity) => {
        const updatedProducts = formData.products.map((product) =>
            product.id === productId
                ? { ...product, quantity: quantity }
                : product
        );
        setFormData((prevState) => ({
            ...prevState,
            products: updatedProducts,
        }));
    };

    const handleRemoveProduct = (productId) => {
        const updatedProducts = formData.products.filter(
            (product) => product.id !== productId
        );
        setFormData((prevState) => ({
            ...prevState,
            products: updatedProducts,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/purchases", formData);
            const result = await Swal.fire({
                title: "Success!",
                text: "Purchase order created successfully",
                icon: "success",
                showCancelButton: true,
                confirmButtonText: "Pay Now",
                cancelButtonText: "Close",
            });

            const totalWithTax =
                formData.total +
                formData.products
                    .filter((product) => !product.is_vat_exempt)
                    .reduce(
                        (acc, product) =>
                            acc +
                            product.unitPrice *
                                product.quantity *
                                (product.vat_rate / 100),
                        0
                    );
            if (result.isConfirmed) {
                // Pass product data in URL parameters when redirecting to payment page
                const productData = JSON.stringify(formData.products);
                Inertia.visit(
                    route("payments.create", {
                        total: totalWithTax,
                        reference: formData.reference,
                        products: productData,
                    })
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Inertia.visit(route("purchases.index"));
            }
        } catch (error) {
            Swal.fire("Error!", "Failed to create purchase order", "error");
        }
    };

    return (
        <Authenticated
            user={auth.user}
            header={
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Create Purchase Order
                    </h2>
                </div>
            }
        >
            <Head title="Create Purchase Order" />
            <div className="py-12">
                <div className="sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg py-5">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Input
                                    label="Reference"
                                    type="text"
                                    name="reference"
                                    value={formData.reference}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    label="Buyer"
                                    type="text"
                                    name="buyer"
                                    value={formData.buyer}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    label="Email"
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    label="Vendor"
                                    type="text"
                                    name="vendor"
                                    value={formData.vendor}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>

                            <div className="mb-4">
                                <Select
                                    label="Select Product"
                                    name="selectedProduct"
                                    onChange={handleProductSelect}
                                >
                                    {products &&
                                        products.length > 0 &&
                                        products.map((product) => (
                                            <SelectItem
                                                key={product.id}
                                                value={product.id}
                                            >
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                </Select>
                            </div>
                            <div className="mb-8">
                                <Table aria-label="Selected Products">
                                    <TableHeader>
                                        <TableColumn>Product</TableColumn>
                                        <TableColumn>Price</TableColumn>
                                        <TableColumn>Description</TableColumn>
                                        <TableColumn>Quantity</TableColumn>
                                        <TableColumn>Taxes</TableColumn>
                                        <TableColumn>Subtotal</TableColumn>
                                        <TableColumn></TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {formData.products.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell>
                                                    ₱{product.price}
                                                </TableCell>
                                                <TableCell>
                                                    {truncateDescription(
                                                        product.description,
                                                        10
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Input
                                                        size="sm"
                                                        type="number"
                                                        value={product.quantity}
                                                        onChange={(e) =>
                                                            handleQuantityChange(
                                                                product.id,
                                                                parseInt(
                                                                    e.target
                                                                        .value
                                                                )
                                                            )
                                                        }
                                                        className="w-12"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        color="success"
                                                        size="sm"
                                                    >
                                                        {product.is_vat_exempt
                                                            ? "VAT Exempted"
                                                            : `${product.vat_rate}%`}
                                                    </Chip>
                                                </TableCell>
                                                <TableCell>
                                                    {product.is_vat_exempt
                                                        ? `₱${(
                                                              product.unitPrice *
                                                              product.quantity
                                                          ).toFixed(2)}`
                                                        : `₱${(
                                                              product.unitPrice *
                                                              product.quantity *
                                                              (1 +
                                                                  product.vat_rate /
                                                                      100)
                                                          ).toFixed(2)}`}
                                                </TableCell>
                                                <TableCell>
                                                    <DeleteIcon
                                                        onClick={() =>
                                                            handleRemoveProduct(
                                                                product.id
                                                            )
                                                        }
                                                        className="text-danger cursor-pointer"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <Divider className="my-4" />
                            <div className="mb-4">
                                <div>
                                    <span className="font-bold">
                                        Untaxed Amount:{" "}
                                    </span>
                                    <span>₱{formData.total.toFixed(2)}</span>
                                </div>
                                {formData.products.some(
                                    (product) => !product.is_vat_exempt
                                ) && (
                                    <div>
                                        <span className="font-bold">
                                            VAT % :{" "}
                                        </span>
                                        <span>
                                            ₱
                                            {formData.products
                                                .filter(
                                                    (product) =>
                                                        !product.is_vat_exempt
                                                )
                                                .reduce(
                                                    (acc, product) =>
                                                        acc +
                                                        product.unitPrice *
                                                            product.quantity *
                                                            (product.vat_rate /
                                                                100),
                                                    0
                                                )
                                                .toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                <div>
                                    <span className="font-bold">Total: </span>
                                    <span>
                                        ₱
                                        {formData.total +
                                            formData.products
                                                .filter(
                                                    (product) =>
                                                        !product.is_vat_exempt
                                                )
                                                .reduce(
                                                    (acc, product) =>
                                                        acc +
                                                        product.unitPrice *
                                                            product.quantity *
                                                            (product.vat_rate /
                                                                100),
                                                    0
                                                )}
                                        .00
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mb-4">
                                <Button type="submit" color="primary">
                                    Create
                                </Button>
                                <Button
                                    color="danger"
                                    onClick={() =>
                                        Inertia.visit(route("purchases.index"))
                                    }
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
};

export default PurchaseOrderForm;
