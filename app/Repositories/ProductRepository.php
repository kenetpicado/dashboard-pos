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

    public function search($request)
    {
        if (is_null($request->search) && is_null($request->category_id)) {
            return [];
        }

        return Product::query()
            ->when(isset($request->category_id), function ($query) use ($request) {
                $query->where('category_id', $request->category_id);
            })
            ->when(isset($request->search), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request->search}%")
                        ->orWhere('sku', 'like', "%{$request->search}%");
                });
            })
            ->when($request->type == 'sell', function ($query) {
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

    public function getCatalogue()
    {
        return Product::query()
            ->select('id', 'name', 'sku', 'image', 'discount', 'created_at')
            // ->whereHas('inventory', function ($query) {
            //     $query->where('quantity', '>', 0);
            // })
            ->with(['inventory' => function ($query) {
                $query->where('quantity', '>', 0)->orderBy('unit_price');
            }])
            ->orderBy('name')
            ->paginate();
    }
}
