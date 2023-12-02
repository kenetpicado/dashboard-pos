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
            ->select('id', 'name', 'sku', 'image', 'discount', 'category_id')
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where('name', 'like', "%{$request['search']}%")
                    ->orWhere('sku', 'like', "%{$request['search']}%");
            })
            ->with('category:id,name')
            ->orderBy('created_at', 'desc')
            ->paginate();
    }

    public function search($request)
    {
        if (is_null($request->search) && is_null($request->category_id)) {
            return [
                'data' => [],
                'links' => [],
                'meta' => [],
            ];
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
            ->latest('id')
            ->paginate(5);
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

    public function getCatalogue($request = [])
    {
        return Product::query()
            ->select('id', 'name', 'sku', 'image', 'discount', 'created_at')
            ->whereHas('inventory', function ($query) use ($request) {
                $query->where('quantity', '>', 0)
                    ->when(isset($request['measure']), function ($query) use ($request) {
                        $query->where('measure', $request['measure']);
                    });
            })
            ->with([
                'cheap_inventory' => function ($query) {
                    $query->select('id', 'inventories.product_id', 'unit_price');
                },
                'recent_inventory' => function ($query) {
                    $query->select('id', 'inventories.product_id', 'created_at');
                },
            ])
            ->when(isset($request['category_id']), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('category_id', $request['category_id'])
                        ->orWhereHas('category', function ($query) use ($request) {
                            $query->where('parent_id', $request['category_id']);
                        });
                });
            })
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('name', 'like', "%{$request['search']}%")
                        ->orWhere('sku', 'like', "%{$request['search']}%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate()
            ->onEachSide(1);
    }

    public function getRelated($category_id, $product_id)
    {
        return Product::query()
            ->select('id', 'name', 'sku', 'image', 'discount')
            ->whereHas('inventory', function ($query) {
                $query->where('quantity', '>', 0);
            })
            ->when(isset($category_id), function ($query) use ($category_id) {
                $query->where('category_id', $category_id);
            }, function ($query) {
                $query->orderByDesc('created_at');
            })
            ->with([
                'cheap_inventory' => function ($query) {
                    $query->select('id', 'inventories.product_id', 'unit_price');
                },
                'recent_inventory' => function ($query) {
                    $query->select('id', 'inventories.product_id', 'created_at');
                },
            ])
            ->where('id', '!=', $product_id)
            ->orderBy('name')
            ->limit(5)
            ->get();
    }
}
