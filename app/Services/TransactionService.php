<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionService
{
    public function store(array $request)
    {
        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'type' => $request['type'],
            'total' => $request['total'],
            'note' => $request['note'],
            'client' => $request['client'],
            'discount' => $request['discount'],
        ]);

        $product_transaction = [];

        foreach ($request['products'] as $product) {

            if ($request['type'] == 'buy') {
                Inventory::create([
                    'product_id' => $product['product_id'],
                    'initial_quantity' => $product['quantity'],
                    'quantity' => $product['quantity'],
                    'unit_cost' => $product['cost'],
                    'total_cost' => $product['cost'] * $product['quantity'],
                    'unit_price' => $product['price'],
                    'measure' => $product['measure'],
                    'user_id' => $transaction->user_id,
                ]);
            } else {
                $inventory = Inventory::find($product['inventory_id']);

                $inventory->decrement('quantity', $product['quantity']);
            }

            $product_transaction[] = [
                'created_at' => Carbon::now(),
                'transaction_id' => $transaction->id,
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'measure' => $product['measure'],
                'value' => $request['type'] == 'buy' ? $product['cost'] : $product['price'],
                'discount' => $product['discount'],
                'total' => $product['total']
            ];
        }

        DB::table('product_transaction')->insert($product_transaction);
    }
}
