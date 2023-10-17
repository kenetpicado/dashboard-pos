<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryRequest;
use App\Models\Inventory;
use App\Repositories\InventoryRepository;

class InventoryController extends Controller
{
    public function __construct(
        private readonly InventoryRepository $inventoryRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Inventory/Index', [
            'inventory' => $this->inventoryRepository->getAllAvailable(),
            'total' => $this->inventoryRepository->getTotalAmount(),
            'total_quantity' => $this->inventoryRepository->getTotalQuantity(),
        ]);
    }

    public function update(InventoryRequest $request, $inventory)
    {
        Inventory::where('id', $inventory)->update($request->validated());

        return back();
    }

    public function destroy($inventory)
    {
        Inventory::where('id', $inventory)->delete();

        return back();
    }
}
