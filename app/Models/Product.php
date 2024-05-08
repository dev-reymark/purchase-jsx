<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'price', 'description', 'quantity', 'image_url', 'is_consumable', 'product_type', 'redemption_instructions', 'unique_code', 'is_vat_exempt', 'vat_rate'
    ];

    public function validityPeriod()
    {
        return $this->hasOne(ProductValidityPeriod::class);
    }

    public function isExpired()
    {
        if ($this->validityPeriod) {
            return Carbon::now()->gt($this->validityPeriod->end_date);
        }
        return false;
    }

    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    public function purchaseOrders()
    {
        return $this->belongsToMany(PurchaseOrder::class);
    }
}
