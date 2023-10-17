<?php

namespace App\Repositories;

use App\Models\Transaction;

class TransactionRepository
{
    public function getAll($request = [])
    {
        return Transaction::with('user:id,name')
            ->withCount('products')
            ->whenUser($request)
            ->whenFromTo($request)
            ->latest('id')
            ->paginate();
    }

    public function getMonthlyTotal($type = 'sell', $request = [])
    {
        return Transaction::query()
            ->where('type', $type)
            ->whenUser($request)
            ->whenFromTo($request)
            ->sum('total');
    }
}
