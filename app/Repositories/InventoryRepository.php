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

    public function getAllAvailable()
    {
        return Inventory::query()
            ->where('quantity', '>', 0)
            ->orderByDesc('quantity')
            ->with('product:id,sku,name')
            ->paginate();
    }

    public function getTotalAmount()
    {
        return DB::table('inventories')
            ->where('quantity', '>', 0)
            ->select(DB::raw('COALESCE(SUM(unit_cost * quantity), 0)as total'))
            ->value('total');
    }

    public function getTotalQuantity()
    {
        return DB::table('inventories')
            ->where('quantity', '>', 0)
            ->sum('quantity');
    }
}
