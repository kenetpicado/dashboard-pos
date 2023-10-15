<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Inventory;

class InventoryController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Inventory/Index', [
            'inventory' => Inventory::query()
                ->orderByDesc('quantity')
                ->with('product:id,sku,name')
                ->paginate(),
        ]);
    }
}
