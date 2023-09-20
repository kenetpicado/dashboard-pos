<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function create()
    {
        return inertia('Dashboard/Transaction/Create', [
            'products' => Product::all()
        ]);
    }
}
