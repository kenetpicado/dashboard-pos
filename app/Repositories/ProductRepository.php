<?php

namespace App\Repositories;

use App\Models\Product;
use App\Traits\BasicRepositoryTrait;

class ProductRepository
{
    use BasicRepositoryTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Product();
    }

    public function getAll()
    {
        return Product::select('id', 'name', 'sku', 'image')->paginate();
    }

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

    public function getInventory($product)
    {
        return $product->inventory()->where('quantity', '>', 0)->latest()->paginate();
    }
}
