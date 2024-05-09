import React, { useState } from "react";
import { usePage, Head } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Button, Card, Input } from "@nextui-org/react";

const Redemption = () => {
    const { redemptionUrl } = usePage().props;
    const [redeemed, setRedeemed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uniqueCode, setUniqueCode] = useState("");

    const handleRedeem = async () => {
        if (!uniqueCode) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter the unique code!",
            });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Make an API request to validate the unique code
            const response = await fetch(
                `${redemptionUrl}?uniqueCode=${uniqueCode}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        // Add any necessary headers, such as authentication token
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // Make an API request to redeem the product
            const redeemResponse = await fetch(redemptionUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any necessary headers, such as authentication token
                },
                // Add any request body if needed
            });

            if (!redeemResponse.ok) {
                throw new Error("Redemption failed");
            }

            setRedeemed(true);
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Redemption successful!",
            });
        } catch (error) {
            setError(error.message);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="Redeem" />
            <div className="py-12 p-4">
                {/* <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg"> */}
                <Card className="w-full mx-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Redemption Page</h1>
                    <div className="mb-4">
                        <Input
                            label="Unique Code"
                            labelPlacement="outside"
                            placeholder="Enter unique code"
                            type="text"
                            value={uniqueCode}
                            onChange={(e) => setUniqueCode(e.target.value)}
                        />
                    </div>
                    {redeemed ? (
                        <p>Redeemed</p>
                    ) : (
                        <Button
                            color="primary"
                            onClick={handleRedeem}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Redeem"}
                        </Button>
                    )}
                    {error && <p>{error}</p>}
                </Card>
                {/* </div> */}
            </div>
        </>
    );
};

export default Redemption;
