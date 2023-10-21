<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\InventoryRepository;
use App\Repositories\TransactionRepository;

class DashboardController extends Controller
{
    public function __construct(
        private readonly TransactionRepository $transactionRepository,
        private readonly InventoryRepository $inventoryRepository
    ) {
    }

    public function __invoke()
    {
        return inertia('Dashboard/Index', [
            'sell_month' => $this->transactionRepository->getMonthlyTotal('sell'),
            'buy_month' => $this->transactionRepository->getMonthlyTotal('buy'),
            'total_inventory' => $this->inventoryRepository->getTotalAmount(),
            'total_quantity' => $this->inventoryRepository->getTotalQuantity(),
        ]);
    }
}
