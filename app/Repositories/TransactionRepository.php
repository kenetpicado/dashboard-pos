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

    public function store(array $request)
    {
        return Transaction::create([
            'user_id' => auth()->id(),
            'type' => $request['type'],
            'total' => $request['total'],
            'note' => $request['note'],
            'client' => $request['client'],
            'discount' => $request['discount'],
        ]);
    }

    public function getPending($request = [])
    {
        return Transaction::query()
            ->withCount('products')
            ->whenStatus("PENDIENTE")
            ->paginate();
    }
}
