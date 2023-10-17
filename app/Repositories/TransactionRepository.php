<?php

namespace App\Repositories;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionRepository
{
    public function getAll()
    {
        return Transaction::with('user:id,name')
            ->withCount('products')
            ->latest()
            ->paginate();
    }

    public function getMonthlyTotal($type = 'sell')
    {
        return DB::table('transactions')
            ->whereMonth('created_at', Carbon::now()->month)
            ->where('type', $type)
            ->sum('total');
    }
}
