<?php

namespace App\Repositories;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionRepository
{
    public function getAll($user_id)
    {
        return Transaction::with('user:id,name')
            ->withCount('products')
            ->when($user_id, function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->latest('id')
            ->paginate();
    }

    public function getMonthlyTotal($type = 'sell', $user_id = null)
    {
        return DB::table('transactions')
            ->whereMonth('created_at', Carbon::now()->month)
            ->where('type', $type)
            ->when($user_id, function ($query, $user_id) {
                $query->where('user_id', $user_id);
            })
            ->sum('total');
    }
}
