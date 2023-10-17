<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProductRequest;
use App\Models\Product;
use App\Repositories\ProductRepository;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductRepository $productRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Product/Index', [
            'products' => $this->productRepository->getAll(),
        ]);
    }

    public function store(ProductRequest $request)
    {
        $this->productRepository->store($request->validated());

        return back();
    }

    public function show(Product $product)
    {
        return inertia('Dashboard/Product/Show', [
            'product' => $product,
            'inventory' => $product->inventory()->latest()->paginate(),
        ]);
    }

    public function update(ProductRequest $request, $product)
    {
        $this->productRepository->update($product, $request->validated());

        return back();
    }

    public function destroy($product)
    {
        $this->productRepository->destroy($product);

        return back();
    }
}
