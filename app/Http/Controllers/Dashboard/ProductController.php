<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProductRequest;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return inertia("Dashboard/Product/Index", [
            'products' => Product::with('supplier')->get(),
            'suppliers' => Supplier::all(),
        ]);
    }

    public function create()
    {
        return inertia("Dashboard/Product/Create", [
            'suppliers' => Supplier::all(),
        ]);
    }

    public function store(ProductRequest $request)
    {
        Product::create($request->validated());

        return back();
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
