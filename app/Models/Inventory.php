<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'quantity', 'unit_cost', 'unit_price', 'measure', 'user_id', 'discount'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
