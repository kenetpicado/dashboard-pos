<?php

namespace App\Repositories;

use App\Models\Inventory;
use App\Traits\BasicRepositoryTrait;
use Carbon\Carbon;
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
            ->orderByDesc('created_at')
            ->orderByDesc('quantity')
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->whereHas('product', function ($query) use ($request) {
                        $query->where('name', 'like', '%'.$request['search'].'%')
                            ->orWhere('sku', 'like', '%'.$request['search'].'%');
                    })
                        ->orWhere('measure', 'like', '%'.$request['search'].'%');
                });
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
            ->selectRaw('COALESCE(sum(quantity * unit_cost), 0) as total')
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

    public function updateColors($inventory_id, $colors)
    {
        $data = count($colors) > 0 ? $colors : null;
        DB::table('inventories')->where('id', $inventory_id)->update(['colors' => $data]);
    }

    public function store(array $request, $transaction)
    {
        $colors = null;

        if (count($request['colors']) > 0) {
            $colors = $request['colors'];
        }

        return Inventory::create([
            'product_id' => $request['product_id'],
            'initial_quantity' => $request['quantity'],
            'quantity' => $request['quantity'],
            'unit_cost' => $request['cost'],
            'total_cost' => $request['cost'] * $request['quantity'],
            'unit_price' => $request['price'],
            'measure' => $request['measure'],
            'user_id' => $transaction->user_id,
            'transaction_id' => $transaction->id,
            'expired_at' => $request['expired_at'] ?? null,
            'colors' => $colors,
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
        $colors = null;

        if (count($request['colors']) > 0) {
            $colors = $request['colors'];
        }

        DB::table('inventories')
            ->where('id', $inventory)
            ->update([
                'quantity' => $request['quantity'],
                'unit_price' => $request['unit_price'],
                'measure' => $request['measure'],
                'colors' => $colors,
            ]);
    }

    public function soonToExpire()
    {
        return DB::table('inventories')
            ->where('quantity', '>', 0)
            ->whereNotNull('expired_at')
            ->where('expired_at', '>=', Carbon::now()->format('Y-m-d 00:00:00'))
            ->orderBy('expired_at', 'asc')
            ->join('products', 'products.id', '=', 'inventories.product_id')
            ->select('inventories.id', 'quantity', 'expired_at', 'measure', 'products.name', 'products.sku')
            ->paginate();
    }
}
