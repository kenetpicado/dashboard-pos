<?php

namespace App\Repositories;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionRepository
{
    public function getAll($request = [])
    {
        return Transaction::with('user:id,name')
            ->withCount('products')
            ->when(isset($request['type']), function ($query) use ($request) {
                $query->where('type', $request['type']);
            })
            ->whenUser($request)
            ->whenFromTo($request)
            ->addSelect([
                'payments_total' => DB::table('payments')
                ->select(DB::raw('SUM(value) as total'))
                ->whereColumn('transaction_id', 'transactions.id')
                ->limit(1)
            ])
            ->latest('id')
            ->paginate();
    }

    public function getMonthlyTotal($type = 'sell', $request = [])
    {
        $transactions = Transaction::query()
            ->where('type', $type)
            ->whenUser($request)
            ->when(isset($request['from']), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('created_at', '>=', Carbon::parse($request['from'])->format('Y-m-d 00:00:00'))
                        ->orWhereHas('payments', function ($query) use ($request) {
                            $query->where('created_at', '>=', Carbon::parse($request['from'])->format('Y-m-d 00:00:00'));
                        });
                });
            }, function ($query) {
                $query->where(function ($query) {
                    $query->where('created_at', '>=', Carbon::now()->startOfMonth()->format('Y-m-d 00:00:00'))
                        ->orWhereHas('payments', function ($query) {
                            $query->where('created_at', '>=', Carbon::now()->startOfMonth()->format('Y-m-d 00:00:00'));
                        });
                });
            })->when(isset($request['to']), function ($query) use ($request) {
                $query->where(function ($query) use ($request) {
                    $query->where('created_at', '<=', Carbon::parse($request['to'])->format('Y-m-d 23:59:59'))
                        ->orWhereHas('payments', function ($query) use ($request) {
                            $query->where('created_at', '<=', Carbon::parse($request['to'])->format('Y-m-d 23:59:59'));
                        });
                });
            })
            ->with(['payments' => function ($query) use ($request) {
                $query->when(isset($request['from']), function ($query) use ($request) {
                    $query->where('created_at', '>=', Carbon::parse($request['from'])->format('Y-m-d 00:00:00'));
                }, function ($query) {
                    $query->where('created_at', '>=', Carbon::now()->startOfMonth()->format('Y-m-d 00:00:00'));
                })->when(isset($request['to']), function ($query) use ($request) {
                    $query->where('created_at', '<=', Carbon::parse($request['to'])->format('Y-m-d 23:59:59'));
                });
            }])
            ->get(['id', 'total', 'created_at']);

        return $transactions->map(function ($transaction) {
            if ($transaction->payments->count() > 0) {
                $transaction->total = $transaction->payments->sum('value');
            }

            return $transaction;
        })->sum('total');
    }

    public function store(array $request)
    {
        $total = $request['total'];
        $status = 'COMPLETADO';
        $goal = null;

        if (isset($request['payment']) && $request['payment'] >= 0) {
            $status = 'PENDIENTE';
            $total = 0;
            $goal = $request['total'];
        }

        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'type' => $request['type'],
            'total' => $total,
            'note' => $request['note'],
            'client' => $request['client'],
            'discount' => $request['discount'],
            'goal' => $goal,
            'status' => $status,
        ]);

        if (isset($request['payment']) && $request['payment'] >= 0) {
            $transaction->payments()->create([
                'value' => $request['payment'],
            ]);
        }

        return $transaction;
    }

    public function getPending()
    {
        return Transaction::query()
            ->withCount('products')
            ->where('status', 'PENDIENTE')
            ->select('id', 'type', 'client', 'total', 'created_at')
            ->addSelect([
                'payments_total' => DB::table('payments')
                ->select(DB::raw('SUM(value) as total'))
                ->whereColumn('transaction_id', 'transactions.id')
                ->limit(1)
            ])
            ->latest('id')
            ->paginate();
    }

    public function updateStatus($payment)
    {
        $transaction = Transaction::find($payment->transaction_id);
        $payments_total = $transaction->payments->sum('value');

        if ($payments_total >= $transaction->goal) {
            $transaction->update([
                'status' => 'COMPLETADO',
            ]);
        }

        return $transaction->status == 'COMPLETADO';
    }

    public function decrementTotal($payment): void
    {
        DB::table('transactions')->where('id', $payment->transaction_id)->decrement('total', $payment->value);
    }

    public function byClient($client_name)
    {
        return DB::table('transactions')
            ->where('client', 'like', '%' . $client_name . '%')
            ->latest('id')
            ->paginate();
    }
}
