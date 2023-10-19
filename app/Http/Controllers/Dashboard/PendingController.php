<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Transaction;
use App\Repositories\TransactionRepository;

class PendingController extends Controller
{
    public function __construct(
        private readonly TransactionRepository $transactionRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Pending/Index', [
            'transactions' => $this->transactionRepository->getPending()
        ]);
    }

    public function show(Transaction $pending)
    {
        return inertia('Dashboard/Pending/Show', [
            'transaction' => $pending,
            'payments' => $pending->payments,
        ]);
    }
}
