<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\InventoryRequest;
use App\Repositories\InventoryRepository;
use App\Repositories\MeasureRepository;
use App\Repositories\SettingRepository;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function __construct(
        private readonly InventoryRepository $inventoryRepository,
        private readonly UserRepository $userRepository,
        private readonly MeasureRepository $measureRepository,
        private readonly SettingRepository $settingRepository,
    ) {
    }

    public function index(Request $request)
    {
        $array = $request->all();

        return inertia('Dashboard/Inventory/Index', [
            'inventory' => $this->inventoryRepository->getAllAvailable($request->all()),
            'total' => $this->inventoryRepository->getTotalAmount($array),
            'total_quantity' => $this->inventoryRepository->getTotalQuantity($array),
            'users' => $this->userRepository->getSimpleList(),
            'measures' => $this->measureRepository->getNames(),
            'manage_colors' => $this->settingRepository->manageColors(),
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
