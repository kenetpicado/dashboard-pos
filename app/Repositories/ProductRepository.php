<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function search($term = null, $hasInventory)
    {
        if (is_null($term)) {
            return [];
        }

        return Product::query()
            ->where(function ($query) use ($term) {
                $query->where('name', 'like', "%{$term}%")
                    ->orWhere('sku', 'like', "%{$term}%");
            })
            ->when($hasInventory, function ($query) {
                $query->whereHas('inventory', function ($query) {
                    $query->where('quantity', '>', 0);
                })->with(['inventory' => function ($query) {
                    $query->where('quantity', '>', 0);
                }]);
            })
            ->limit(5)
            ->get();
    }
}
