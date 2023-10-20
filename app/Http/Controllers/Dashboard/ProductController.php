<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProductRequest;
use App\Models\Inventory;
use App\Models\Product;
use App\Repositories\InventoryRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly InventoryRepository $inventoryRepository
    ) {
    }

    public function index(Request $request)
    {
        return inertia('Dashboard/Product/Index', [
            'products' => $this->productRepository->getAll($request->all()),
        ]);
    }

    public function create()
    {
        return inertia('Dashboard/Product/Create');
    }

    public function edit(Product $product)
    {
        return inertia('Dashboard/Product/Create', [
            'product' => $product,
            'isNew' => false,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $product = $this->productRepository->store($request->validated());

        //TODO: Crear transacción como corresponde
        foreach ($request->inventory as $inventory) {
            $inventory['product_id'] = $product->id;
            $this->inventoryRepository->store($inventory, auth()->id());
        }

        return redirect()->route('dashboard.products.index');
    }

    public function show(Product $product)
    {
        return inertia('Dashboard/Product/Show', [
            'product' => $product,
            'inventory' => $this->productRepository->getInventory($product),
            'inventoryStatus' => $this->productRepository->getInventoryStatus($product),
        ]);
    }

    public function update(ProductRequest $request, $product)
    {
        $this->productRepository->update($product, $request->validated());

        return redirect()->route('dashboard.products.index');
    }

    public function destroy($product)
    {
        $this->productRepository->destroy($product);

        return back();
    }
}
