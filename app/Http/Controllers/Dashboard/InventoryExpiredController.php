<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\InventoryRepository;

class InventoryExpiredController extends Controller
{
    public function __construct(
        private readonly InventoryRepository $inventoryRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Expired/Index', [
            'inventory' => $this->inventoryRepository->soonToExpire(),
        ]);
    }
}
