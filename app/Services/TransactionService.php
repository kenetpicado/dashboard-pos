<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Transaction;

class TransactionService
{
    public function store()
    {
        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'type' => $type,
            'total' => $request->total,
            'note' => $request->note,
            'client' => $request->client,
            'currency' => 'NIO',
        ]);

        $product_transaction = [];

        foreach ($request->products as $product) {

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

            $product_transaction[] = [
                'created_at' => now(),
                'transaction_id' => $transaction->id,
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'measure' => $product['measure'],
                'value' => $product['cost'],
            ];
        }

        DB::table('product_transaction')->insert($product_transaction);
    }
}
