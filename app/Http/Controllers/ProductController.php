<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Product/CreateProduct');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'quantity' => 'nullable|integer|min:1',
            'image_url' => 'nullable|url',
            'is_consumable' => 'nullable|boolean',
            'product_type' => 'nullable|string|max:255',
            'redemption_instructions' => 'nullable|string',
            'unique_code' => 'nullable|string|max:255',
            'validity_start_date' => 'nullable|date',
            'validity_end_date' => 'nullable|date|after_or_equal:validity_start_date',
        ]);

        $isVatExempt = $request->has('is_vat_exempt') && $request->is_vat_exempt;
        $vatRate = $isVatExempt ? 0 : ($request->filled('vat_rate') ? $request->input('vat_rate') : 12);
        $quantity = $request->filled('quantity') ? $request->quantity : 0;
        Log::info('Quantity Value:', ['quantity' => $quantity]);

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'quantity' => $quantity,
            'image_url' => $request->image_url,
            'is_consumable' => $request->is_consumable,
            'product_type' => $request->product_type,
            'redemption_instructions' => $request->redemption_instructions,
            'unique_code' => $request->unique_code,
            'is_vat_exempt' => $isVatExempt,
            'vat_rate' => $vatRate,
        ]);

        if ($request->filled('validity_start_date') && $request->filled('validity_end_date')) {
            $product->validityPeriod()->create([
                'start_date' => $request->validity_start_date,
                'end_date' => $request->validity_end_date,
            ]);
        }

        return redirect()->route('products.index')->with('success', 'Product created successfully');
    }

    public function index()
    {
        $products = Product::all();
        return Inertia::render('Product/Index', ['products' => $products]);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
        ]);

        $product->update($request->all());

        return redirect()->back()->with('success', 'Product updated successfully.');
    }

    public function show(Product $product)
    {
        if ($product->isExpired()) {
            // Handle the case where the product is expired
            return redirect()->route('expired-products.index');
        }

        return view('products.show', compact('product'));
    }
}
