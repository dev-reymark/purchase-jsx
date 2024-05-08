import React, { useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Link,
    Textarea,
    Select,
    SelectItem,
    Checkbox,
} from "@nextui-org/react";
import { FaPlus } from "react-icons/fa";
import { useForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Inertia } from "@inertiajs/inertia";

const productTypes = ["Gift Card", "Coupon", "E-Voucher"];

export default function CreateProductModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, setData, post, errors } = useForm({
        name: "",
        price: "",
        description: "",
        product_type: "",
        unique_code: "",
        is_consumable: false,
        validity_start_date: "",
        validity_end_date: "",
        redemption_instructions: "",
        image_url: "https://img.icons8.com/parakeet-line/48/image.png",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;
        setData({ ...data, [name]: val });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await post(route("products.store"), data);
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Product created successfully.",
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    Inertia.visit(route("products.index"));
                }
            });
            setData({
                name: "",
                price: "",
                description: "",
                product_type: "",
                unique_code: "",
                is_consumable: false,
                validity_start_date: "",
                validity_end_date: "",
                redemption_instructions: "",
            });
            onClose();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    const generateUniqueCode = () => {
        // Generate a random alphanumeric code
        const uniqueCode = Math.random()
            .toString(36)
            .substr(2, 10)
            .toUpperCase(); // Example code generation
        setData({ ...data, unique_code: uniqueCode });
    };

    useEffect(() => {
        generateUniqueCode();
    }, []);

    return (
        <>
            <Button
                as={Link}
                onPress={onOpen}
                color="primary"
                endContent={<FaPlus />}
            >
                Add New
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                placement="top-center"
                isDismissable={false}
                hideCloseButton={true}
                size="xl"
                scrollBehavior="outside"
                backdrop="blur"
            >
                <ModalContent>
                    <form onSubmit={handleSubmit}>
                        <ModalHeader className="flex flex-col gap-1">
                            Create Product
                        </ModalHeader>
                        <ModalBody>
                            <div className="mb-4">
                                <Input
                                    autoFocus
                                    type="text"
                                    name="name"
                                    label="Name"
                                    value={data.name}
                                    onChange={handleChange}
                                    className="mt-1"
                                    placeholder="Product Name"
                                />
                                {errors.name && (
                                    <div className="text-red-500 mt-1">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    name="price"
                                    label="Sale Price"
                                    value={data.price}
                                    onChange={handleChange}
                                    className="mt-1"
                                    placeholder="Product Price"
                                />
                                {errors.price && (
                                    <div className="text-red-500 mt-1">
                                        {errors.price}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <Textarea
                                    name="description"
                                    value={data.description}
                                    label="Description"
                                    onChange={handleChange}
                                    placeholder="Product Description"
                                />
                                {errors.description && (
                                    <div className="text-red-500 mt-1">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="url"
                                    name="image_url"
                                    label="Image URL"
                                    value={data.image_url}
                                    onChange={handleChange}
                                    className="mt-1"
                                    placeholder="Product Image URL"
                                />
                            </div>
                            <div className="mb-4">
                                <Checkbox
                                    name="is_vat_exempt"
                                    checked={data.is_vat_exempt}
                                    onChange={handleChange}
                                >
                                    Is VAT Exempt
                                </Checkbox>
                            </div>
                            {!data.is_vat_exempt && (
                                <div className="mb-4">
                                    <Input
                                        type="number"
                                        name="vat_rate"
                                        label="VAT Rate (%)"
                                        value={data.vat_rate || 12}
                                        onChange={handleChange}
                                        className="mt-1"
                                        placeholder="VAT Rate"
                                    />
                                </div>
                            )}
                            <div className="mb-4">
                                <Checkbox
                                    name="is_consumable"
                                    checked={data.is_consumable}
                                    onChange={handleChange}
                                >
                                    Is Consumable
                                </Checkbox>
                            </div>
                            {data.is_consumable ? (
                                <div className="mb-4">
                                    <Select
                                        name="product_type"
                                        label="Product Type"
                                        value={data.product_type}
                                        onChange={handleChange}
                                        className="mt-1"
                                    >
                                        {productTypes.map((type) => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    {errors.product_type && (
                                        <div className="text-red-500 mt-1">
                                            {errors.product_type}
                                        </div>
                                    )}

                                    <div className="flex space-x-5 mt-4 mb-4">
                                        <p className="mt-1 text-sm">
                                            Validity Dates{" "}
                                        </p>
                                        <Input
                                            type="date"
                                            name="validity_start_date"
                                            value={data.validity_start_date}
                                            onChange={handleChange}
                                            className="mt-1"
                                            placeholder="Start Date"
                                        />
                                        <Input
                                            type="date"
                                            name="validity_end_date"
                                            value={data.validity_end_date}
                                            onChange={handleChange}
                                            className="mt-1"
                                            placeholder="End Date"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <Input
                                            type="number"
                                            name="quantity"
                                            label="Quantity"
                                            value={data.quantity}
                                            onChange={handleChange}
                                            className="mt-1"
                                            placeholder="Product Quantity"
                                        />
                                        {errors.quantity && (
                                            <div className="text-red-500 mt-1">
                                                {errors.quantity}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4">
                                        <Textarea
                                            name="redemption_instructions"
                                            value={data.redemption_instructions}
                                            label="Redemption Instructions"
                                            onChange={handleChange}
                                            placeholder="Redemption Instructions"
                                        ></Textarea>
                                    </div>
                                </div>
                            ) : null}
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    name="unique_code"
                                    label="Unique Code"
                                    value={data.unique_code}
                                    onChange={handleChange}
                                    className="mt-1"
                                    placeholder="Unique Code"
                                    readOnly
                                />
                                {errors.unique_code && (
                                    <div className="text-red-500 mt-1">
                                        {errors.unique_code}
                                    </div>
                                )}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" type="submit">
                                Create
                            </Button>
                            <Button
                                color="danger"
                                onClick={() =>
                                    Inertia.visit(route("products.index"))
                                }
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}
