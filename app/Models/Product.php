<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'name',
        'sku',
        'description',
        'image',
        'notes',
        'discount',
        'category_id',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function inventory()
    {
        return $this->hasMany(Inventory::class);
    }

    public function cheap_inventory()
    {
        return $this->hasOne(Inventory::class)
            ->where('quantity', '>', 0)
            ->orderByDesc('unit_price');
    }

    public function recent_inventory()
    {
        return $this->hasOne(Inventory::class)
            ->where('quantity', '>', 0)
            ->orderByDesc('created_at');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
