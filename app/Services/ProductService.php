<?php

namespace App\Services;

use App\Models\Transaction;
use App\Repositories\InventoryRepository;
use App\Repositories\ProductTransactionRepository;

class ProductService
{
    private $inventoryRepository;

    private $productTransactionRepository;

    public function __construct()
    {
        $this->inventoryRepository = new InventoryRepository();
        $this->productTransactionRepository = new ProductTransactionRepository();
    }

    public function storeItems($product, array $request, $total)
    {
        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'type' => 'buy',
            'total' => $total,
            'status' => 'COMPLETADO',
        ]);

        $pivotData = [];

        foreach ($request as $inventory) {
            $inventory['product_id'] = $product->id;
            $this->inventoryRepository->store($inventory, $transaction->user_id);

            $pivotData[] = $this->productTransactionRepository->buildBuyType($inventory, $transaction->id);
        }

        $this->productTransactionRepository->insert($pivotData);
    }
}
