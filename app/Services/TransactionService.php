<?php

namespace App\Services;

use App\Models\Client;
use App\Models\Measure;
use App\Models\Setting;
use App\Repositories\AlertRepository;
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

            if ($request['type'] == 'buy') {
                $inventoryRepository->store($product, $transaction);
                Measure::updateOrCreate(['name' => $product['measure']]);
            } else {
                $productMinQuantity = Setting::where('key', 'product_min')->value('value');

                $inventoryRepository->decrement($product['inventory_id'], $product['quantity']);

                if (! is_null($product['colors'])) {
                    $inventoryRepository->updateColors($product['inventory_id'], $product['colors']);
                }

                if ($transaction->client) {
                    Client::updateOrCreate(['name' => $transaction->client]);
                }

                $updatedQuantity = $inventoryRepository->getTotalQuantityByProduct($product['product_id']);

                if (isset($productMinQuantity)) {
                    if ($updatedQuantity == 0) {
                        (new AlertRepository())->storeEmptyStock($product['product_id']);
                    } elseif ($updatedQuantity <= $productMinQuantity) {
                        (new AlertRepository())->storeFewStock($product['product_id'], $updatedQuantity);
                    }
                }
            }

            $pivotData[] = $productTransactionRepository->build($transaction->id, $product, $request['type']);
        }

        $productTransactionRepository->insert($pivotData);
    }
}
