<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->text('description');
            $table->integer('quantity')->default(0);
            $table->string('image_url')->nullable();
            $table->boolean('is_consumable')->default(false);
            $table->string('product_type')->nullable();
            $table->text('redemption_instructions')->nullable();
            $table->string('unique_code')->nullable();
            $table->boolean('is_vat_exempt')->default(false);
            $table->decimal('vat_rate', 8, 2)->default(12);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
