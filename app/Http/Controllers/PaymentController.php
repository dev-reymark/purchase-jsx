<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use App\Models\Payment;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function create()
    {
        return Inertia::render('Payment/PaymentPage');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'cardNumber' => 'required|string',
            'expiry' => 'required|string',
            'cvc' => 'required|string',
            'amount' => 'required|numeric',
            'reference' => 'required|string',
        ]);

        // Create the initial payment record
        $payment = Payment::create([
            'card_number' => $validatedData['cardNumber'],
            'expiry' => $validatedData['expiry'],
            'cvc' => $validatedData['cvc'],
            'amount' => $validatedData['amount'],
            'status' => 'pending',
            'reference' => $validatedData['reference'],
        ]);

        // Check if the payment is cancelled
        if ($request->has('cancel')) {
            // Update status to 'cancelled'
            $payment->update(['status' => 'cancelled']);

            // Find the associated purchase order
            $purchaseOrder = PurchaseOrder::where('reference', $validatedData['reference'])->first();

            // Update the purchase order status to 'cancelled'
            if ($purchaseOrder) {
                $purchaseOrder->update(['status' => 'cancelled']);
            }
        } else {
            // Update status to 'paid'
            $payment->update(['status' => 'paid']);

            // Find the associated purchase order
            $purchaseOrder = PurchaseOrder::where('reference', $validatedData['reference'])->first();

            // Update the purchase order status to 'completed'
            if ($purchaseOrder) {
                $purchaseOrder->update(['status' => 'completed']);
            }
        }

        return response()->json($purchaseOrder->id);
    }
}
