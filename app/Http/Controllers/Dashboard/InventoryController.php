<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inventory;

class InventoryController extends Controller
{
    public function index()
    {
        return inertia("Dashboard/Inventory/Index", [
            "inventory" => Inventory::query()
                ->with("product:id,sku,name")
                ->paginate()
        ]);
    }
}
