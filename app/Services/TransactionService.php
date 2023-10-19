<?php

namespace App\Services;

use App\Repositories\InventoryRepository;
use App\Repositories\ProductTransactionRepository;
use App\Repositories\TransactionRepository;

class TransactionService
{
    public function store(array $request)
    {
        $transactionRepository = new TransactionRepository();
        $inventoryRepository = new InventoryRepository();
        $productTransactionRepository = new ProductTransactionRepository();

        $transaction = $transactionRepository->store($request);

        $pivotData = [];

        foreach ($request['products'] as $product) {

            if ($request['type'] == 'buy')
                $inventoryRepository->store($product, $transaction->user_id);
            else
                $inventoryRepository->decrement($product['inventory_id'], $product['quantity']);

            $pivotData[] = $productTransactionRepository->build($transaction->id, $product, $request['type']);
        }

        $productTransactionRepository->insert($pivotData);
    }
}
