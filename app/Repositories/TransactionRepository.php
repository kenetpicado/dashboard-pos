<?php

namespace App\Repositories;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionRepository
{
    public function getAll($request)
    {
        return Transaction::with('user:id,name')
            ->withCount('products')
            ->when($request->get('user_id'), function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->latest()
            ->paginate();
    }

    public function getMonthlyTotal($type = 'sell', $request)
    {
        return DB::table('transactions')
            ->whereMonth('created_at', Carbon::now()->month)
            ->where('type', $type)
            ->when($request->get('user_id'), function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->sum('total');
    }
}
