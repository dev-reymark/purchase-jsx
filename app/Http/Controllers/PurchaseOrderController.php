<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PurchaseOrderController extends Controller
{
    public function create()
    {
        $user = Auth::user();
        $products = Product::all();

        // Generate reference
        $latestPurchaseOrder = PurchaseOrder::latest()->first();
        $latestReferenceNumber = $latestPurchaseOrder ? (int) substr($latestPurchaseOrder->reference, 1) : 0;
        $reference = 'P' . str_pad($latestReferenceNumber + 1, 2, '0', STR_PAD_LEFT);

        return Inertia::render('PurchaseOrder/CreatePurchaseOrder', ['products' => $products, 'reference' => $reference, 'currentUser' => ['name' => $user->name, 'email' => $user->email,]]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'buyer' => 'required|in:' . Auth::user()->name,
            'total' => 'required|numeric',
            'products' => 'required|array',
            'products.*.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1',
        ]);

        // Automatically generate reference
        $latestPurchaseOrder = PurchaseOrder::latest()->first();
        $latestReferenceNumber = $latestPurchaseOrder ? (int) substr($latestPurchaseOrder->reference, 1) : 0;
        $validatedData['reference'] = 'P' . str_pad($latestReferenceNumber + 1, 2, '0', STR_PAD_LEFT);

        $purchaseOrder = PurchaseOrder::create($validatedData);
        // Associate products with the purchase order and save the relationship data
        foreach ($validatedData['products'] as $productData) {
            $purchaseOrder->products()->attach($productData['id'], ['quantity' => $productData['quantity']]);
        }

        return redirect()->route('payments.create', [
            'total' => $purchaseOrder->total,
            'reference' => $purchaseOrder->reference,
            'products' => $purchaseOrder->products,
        ])->with('success', 'Purchase order created successfully.');
    }

    public function index()
    {
        $purchases = PurchaseOrder::all();

        return Inertia::render('PurchaseOrder/Index', ['purchases' => $purchases]);
    }

    public function destroy(PurchaseOrder $purchaseOrder)
    {
        $purchaseOrder->delete();
        return redirect()->route('purchases.index')->with('success', 'Purchase order deleted successfully.');
    }

    public function show($id)
    {
        // Fetch the purchase order details from the database along with associated products
        $purchaseOrder = PurchaseOrder::with('products')->findOrFail($id);
        // dd($purchaseOrder->products);
        // Pass the purchase order data to the view
        return Inertia::render('PurchaseOrder/PurchaseOrderDetails', ['purchaseOrder' => $purchaseOrder]);
    }
}
