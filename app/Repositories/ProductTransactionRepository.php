<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProductTransactionRepository
{
    public function build($transaction_id, $request, $type)
    {
        $value = $type == 'buy' ? $request['cost'] : $request['price'];

        return [
            'created_at' => Carbon::now(),
            'transaction_id' => $transaction_id,
            'product_id' => $request['product_id'],
            'quantity' => $request['quantity'],
            'measure' => $request['measure'],
            'value' => $value,
            'discount' => $request['discount'],
            'total' => $value * $request['quantity'] - $request['discount'],
        ];
    }

    public function buildBuyType($request, $transaction_id)
    {
        return [
            'created_at' => Carbon::now(),
            'transaction_id' => $transaction_id,
            'product_id' => $request['product_id'],
            'quantity' => $request['quantity'],
            'measure' => $request['measure'],
            'value' => $request['cost'],
            'total' => $request['cost'] * $request['quantity'],
        ];
    }

    public function insert($data)
    {
        DB::table('product_transaction')->insert($data);
    }
}
