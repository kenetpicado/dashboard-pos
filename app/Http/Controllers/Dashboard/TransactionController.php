<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function create(Request $request, $type)
    {
        $products = [];

        if ($request->search) {
            $products = Product::query()
                ->where('name', 'like', "%{$request->search}%")
                ->get(['id', 'name', 'sku', 'image']);
        }

        return inertia('Dashboard/Transaction/Create', [
            'products' => $products,
            'type' => $type
        ]);
    }
}
