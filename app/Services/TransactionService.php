<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Transaction;
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
            'currency' => 'NIO',
        ]);

        $product_transaction = [];

        foreach ($request['products'] as $product) {

            if ($request['type'] == 'buy') {
                $alreadyExists = Inventory::query()
                    ->where('product_id', $product['product_id'])
                    ->where('measure', $product['measure'])
                    ->where('unit_cost', $product['cost'])
                    ->where('unit_price', $product['price'])
                    ->first();

                if ($alreadyExists != null) {
                    $alreadyExists->increment('quantity', $product['quantity']);
                } else {
                    Inventory::create([
                        'product_id' => $product['product_id'],
                        'quantity' => $product['quantity'],
                        'unit_cost' => $product['cost'],
                        'unit_price' => $product['price'],
                        'measure' => $product['measure'],
                    ]);
                }
            } else {
                $inventory = Inventory::find($product['inventory_id']);

                $inventory->decrement('quantity', $product['quantity']);
            }

            $product_transaction[] = [
                'created_at' => now(),
                'transaction_id' => $transaction->id,
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'measure' => $product['measure'],
                'value' => $request['type'] == 'buy' ? $product['cost'] : $product['price'],
            ];
        }

        DB::table('product_transaction')->insert($product_transaction);
    }
}
