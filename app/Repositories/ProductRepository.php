<?php

namespace App\Repositories;

use App\Models\Product;
use App\Traits\BasicRepositoryTrait;
use Illuminate\Support\Facades\DB;

class ProductRepository
{
    use BasicRepositoryTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Product();
    }

    public function getAll($request = [])
    {
        return Product::query()
            ->select('id', 'name', 'sku', 'image', 'discount')
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where('name', 'like', "%{$request['search']}%")
                    ->orWhere('sku', 'like', "%{$request['search']}%");
            })
            ->orderBy('name')
            ->paginate();
    }

    public function search($term, $hasInventory)
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
        return $product->inventory()->where('quantity', '>', 0)->orderByDesc('quantity')->paginate();
    }

    public function getInventoryStatus($product_id)
    {
        return DB::table('inventories')
            ->where('product_id', $product_id)
            ->where('quantity', '>', 0)
            ->selectRaw('COALESCE(sum(quantity * unit_cost), 0) as total, COALESCE(sum(quantity), 0) as quantity')
            ->first();
    }
}
