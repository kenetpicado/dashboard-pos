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

    public function getBestSellers()
    {
        return DB::table('product_transaction')
            ->join('products', 'products.id', '=', 'product_transaction.product_id')
            ->select('product_id', DB::raw('SUM(quantity) as quantity'), 'products.name', 'products.image', 'products.sku')
            ->groupBy('product_id')
            ->orderBy('quantity', 'desc')
            ->limit(20)
            ->get();
    }
}
