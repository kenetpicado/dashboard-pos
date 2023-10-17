<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProductRequest;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Product/Index', [
            'products' => Product::select('id', 'name', 'sku', 'image')->paginate(),
        ]);
    }

    public function store(ProductRequest $request)
    {
        Product::create($request->validated());

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
        Product::where('id', $product)->update($request->validated());

        return back();
    }

    public function destroy($product)
    {
        Product::where('id', $product)->delete();

        return back();
    }
}
