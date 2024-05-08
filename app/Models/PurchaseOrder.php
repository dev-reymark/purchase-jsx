<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrder extends Model
{
    use HasFactory;

    protected $fillable = ['reference', 'buyer', 'total', 'status'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'purchase_order_product', 'purchase_order_id', 'product_id')
            ->withPivot('quantity'); // Ensure to include the pivot quantity
    }
}
