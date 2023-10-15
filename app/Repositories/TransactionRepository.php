<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository
{
    public function getAll()
    {
        return Transaction::with('user:id,name')
            ->withCount('products')
            ->latest()
            ->paginate();
    }
}
