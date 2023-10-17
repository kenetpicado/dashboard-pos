<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryRequest;
use App\Repositories\InventoryRepository;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function __construct(
        private readonly InventoryRepository $inventoryRepository
    ) {
    }

    public function index(Request $request)
    {
        return inertia('Dashboard/Inventory/Index', [
            'inventory' => $this->inventoryRepository->getAllAvailable($request->all()),
            'total' => $this->inventoryRepository->getTotalAmount(),
            'total_quantity' => $this->inventoryRepository->getTotalQuantity(),
        ]);
    }

    public function update(InventoryRequest $request, $inventory)
    {
        $this->inventoryRepository->update($inventory, $request->validated());

        return back();
    }

    public function destroy($inventory)
    {
        $this->inventoryRepository->destroy($inventory);

        return back();
    }
}
