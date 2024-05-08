import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Card,
} from "@nextui-org/react";
import { Inertia, PageProps } from "@inertiajs/inertia";
import Swal from "sweetalert2";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CreateProductModal from "./CreateProductModal";

const Index = ({ products, onDelete, auth }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProduct, setEditedProduct] = useState(null);

    const handleProductClick = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const confirmDelete = () => {
        if (!selectedProduct) return;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Inertia.delete(
                        route("products.destroy", selectedProduct.id)
                    );
                    onDelete(selectedProduct.id);
                    onClose();
                    Swal.fire(
                        "Deleted!",
                        "Your product has been deleted.",
                        "success"
                    );
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire(
                        "Error!",
                        "An error occurred while deleting the product.",
                        "error"
                    );
                }
            }
        });
    };

    const handleDelete = () => {
        confirmDelete();
    };

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProduct(selectedProduct);
    };

    const handleUpdate = async () => {
        if (editedProduct) {
            try {
                const { id, ...updatedFields } = editedProduct;
                await Inertia.put(
                    route("products.update", editedProduct.id),
                    updatedFields
                );
                onClose();
                Swal.fire(
                    "Updated!",
                    "Your product has been updated.",
                    "success"
                );
            } catch (error) {
                console.error("Error updating product:", error);
                Swal.fire(
                    "Error!",
                    "An error occurred while updating the product.",
                    "error"
                );
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editedProduct) {
            setEditedProduct({
                ...editedProduct,
                [name]: value,
            });
        }
    };

    return (
        <>
            <Authenticated
                user={auth.user}
                header={
                    <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                            Products
                        </h2>
                    </div>
                }
            >
                <Head title="Products" />
                <div className="py-8 px-4">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <CreateProductModal />

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
                            {products.map((product) => (
                                <Card>
                                    <div
                                        key={product.id}
                                        className="border border-gray-200 rounded p-4 cursor-pointer flex"
                                        onClick={() =>
                                            handleProductClick(product)
                                        }
                                    >
                                        <div className="flex-grow">
                                            <h3 className="text-lg font-bold mb-1">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-600 mb-1">
                                                <strong>Price:</strong> ₱
                                                {product.price}
                                            </p>
                                            <p className="text-gray-600">
                                                <strong>Description:</strong>{" "}
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="ml-4">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="h-20 w-20 object-cover rounded"
                                            />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
                {selectedProduct && (
                    <Modal isOpen={isOpen} onOpenChange={onClose}>
                        <ModalContent>
                            <ModalHeader className="flex flex-col gap-1">
                                {isEditing
                                    ? "Edit Product"
                                    : selectedProduct.name}
                            </ModalHeader>
                            <ModalBody>
                                {isEditing ? (
                                    <form>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedProduct?.name || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2 mb-4"
                                            placeholder="Name"
                                        />
                                        <input
                                            type="number"
                                            name="price"
                                            value={editedProduct?.price || ""}
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2 mb-4"
                                            placeholder="Price"
                                        />
                                        <textarea
                                            name="description"
                                            value={
                                                editedProduct?.description || ""
                                            }
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2 mb-4"
                                            placeholder="Description"
                                        />
                                        <input
                                            type="text"
                                            name="image_url"
                                            value={
                                                editedProduct?.image_url || ""
                                            }
                                            onChange={handleChange}
                                            className="w-full border rounded-md p-2 mb-4"
                                            placeholder="Image URL"
                                        />
                                    </form>
                                ) : (
                                    <>
                                        <img
                                            src={selectedProduct.image_url}
                                            alt={selectedProduct.name}
                                            className="w-full mb-4"
                                        />
                                        <p>{selectedProduct.description}</p>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="solid"
                                    onPress={handleDelete}
                                >
                                    Delete
                                </Button>
                                {isEditing ? (
                                    <Button
                                        color="primary"
                                        onPress={handleUpdate}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        color="primary"
                                        onPress={handleEdit}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </Authenticated>
        </>
    );
};

export default Index;
