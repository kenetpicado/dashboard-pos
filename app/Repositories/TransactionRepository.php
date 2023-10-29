<?php

namespace App\Repositories;

use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

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
        $total = $request['total'];
        $status = 'COMPLETADO';
        $goal = null;

        if (isset($request['payment']) && $request['payment'] >= 0) {
            $status = 'PENDIENTE';
            $total = $request['payment'];
            $goal = $request['total'];
        }

        return Transaction::create([
            'user_id' => auth()->id(),
            'type' => $request['type'],
            'total' => $total,
            'note' => $request['note'],
            'client' => $request['client'],
            'discount' => $request['discount'],
            'goal' => $goal,
            'status' => $status,
        ]);
    }

    public function getPending()
    {
        return Transaction::query()
            ->withCount('products')
            ->where('status', 'PENDIENTE')
            ->select('id', 'type', 'client', 'total', 'created_at')
            ->latest('id')
            ->paginate();
    }

    public function updateStatus($payment)
    {
        $transaction = Transaction::find($payment->transaction_id);

        $transaction->total = $transaction->total + $payment->value;

        if ($transaction->total >= $transaction->goal) {
            $transaction->goal = null;
            $transaction->status = 'COMPLETADO';
        }

        $transaction->save();

        return $transaction->status == 'COMPLETADO';
    }

    public function decrementTotal($payment): void
    {
        DB::table('transactions')->where('id', $payment->transaction_id)->decrement('total', $payment->value);
    }

    public function byClient($client_name)
    {
        return DB::table('transactions')
            ->where('client', 'like', '%'.$client_name.'%')
            ->latest('id')
            ->paginate();
    }
}
