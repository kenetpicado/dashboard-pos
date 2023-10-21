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

    public function getPending($request = [])
    {
        return Transaction::query()
            ->withCount('products')
            ->whenStatus('PENDIENTE')
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

    public function decrementPayment($payment)
    {
        $transaction = Transaction::find($payment->transaction_id);

        $transaction->decrement('total', $payment->value);
    }

    public function byClient($client_name)
    {
        return Transaction::query()
            ->where('client', 'like', '%'.$client_name.'%')
            ->latest('id')
            ->paginate();
    }
}
