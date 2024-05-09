<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class RedemptionController extends Controller
{

    public function show(): Response
    {
        return Inertia::render('Redeem/RedemptionPage');
    }
    public function redeem(Request $request)
    {
        // Retrieve purchase order ID and product ID from the request
        $purchaseOrderId = $request->input('purchaseOrderId');
        $productId = $request->input('productId');

        // Retrieve the purchase order and product
        $purchaseOrder = PurchaseOrder::findOrFail($purchaseOrderId);
        $product = Product::findOrFail($productId);

        // Perform the redemption process here, e.g., mark the product as redeemed in the database

        // Return a response indicating success
        return response()->json([
            'success' => true,
            'message' => 'Redemption successful.',
        ]);
    }
}
