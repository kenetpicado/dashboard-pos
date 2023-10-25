<?php

namespace App\Repositories;

use App\Models\Inventory;
use App\Traits\BasicRepositoryTrait;
use Illuminate\Support\Facades\DB;

class InventoryRepository
{
    use BasicRepositoryTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Inventory();
    }

    public function getAllAvailable($request = [])
    {
        return Inventory::query()
            ->where('quantity', '>', 0)
            ->orderBy('product_id')
            ->orderByDesc('quantity')
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->whereHas('product', function ($query) use ($request) {
                        $query->where('name', 'like', '%' . $request['search'] . '%')
                            ->orWhere('sku', 'like', '%' . $request['search'] . '%');
                    });
                })
                    ->orWhere('measure', 'like', '%' . $request['search'] . '%');
            })
            ->when(isset($request['user_id']), function ($query) use ($request) {
                $query->where('user_id', $request['user_id']);
            })
            ->with('product:id,sku,name')
            ->paginate();
    }

    public function getTotalAmount($request = [])
    {
        return DB::table('inventories')
            ->where('quantity', '>', 0)
            ->when(isset($request['user_id']), function ($query) use ($request) {
                $query->where('user_id', $request['user_id']);
            })
            ->selectRaw('sum(quantity * unit_cost) as total')
            ->value('total');
    }

    public function getTotalQuantity($request = [])
    {
        return (float) DB::table('inventories')
            ->where('quantity', '>', 0)
            ->when(isset($request['user_id']), function ($query) use ($request) {
                $query->where('user_id', $request['user_id']);
            })
            ->sum('quantity');
    }

    public function decrement($inventory_id, $quantity)
    {
        DB::table('inventories')->where('id', $inventory_id)->decrement('quantity', $quantity);
    }

    public function store(array $request, $user_id)
    {
        return Inventory::create([
            'product_id' => $request['product_id'],
            'initial_quantity' => $request['quantity'],
            'quantity' => $request['quantity'],
            'unit_cost' => $request['cost'],
            'total_cost' => $request['cost'] * $request['quantity'],
            'unit_price' => $request['price'],
            'measure' => $request['measure'],
            'user_id' => $user_id,
        ]);
    }

    public function getTotalQuantityByProduct($product_id)
    {
        return DB::table('inventories')
            ->where('product_id', $product_id)
            ->sum('quantity');
    }

    public function update($inventory, $request)
    {
        Inventory::where('id', $inventory)
            ->update([
                'quantity' => $request['quantity'],
                'unit_price' => $request['unit_price'],
                'measure' => $request['measure'],
            ]);
    }
}
