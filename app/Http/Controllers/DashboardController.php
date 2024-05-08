<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PurchaseOrder;
use App\Models\Product;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $purchaseCount = PurchaseOrder::count();
        $productCount = Product::count();
        $totalSales = PurchaseOrder::sum('total');

        return Inertia::render('Dashboard', [
            'purchaseCount' => $purchaseCount,
            'productCount' => $productCount,
            'totalSales' => $totalSales,
        ]);
    }
}
