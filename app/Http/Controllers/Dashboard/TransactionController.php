<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TransactionRequest;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public $transactionTypes = ['buy', 'sell'];

    public function index()
    {
        return inertia("Dashboard/Transaction/Index", [
            "transactions" => Transaction::with("user")->withCount("products")->latest()->paginate()
        ]);
    }

    public function create(Request $request, $type)
    {
        if (!in_array($type, $this->transactionTypes))
            return back();

        $products = [];

        if ($request->search) {
            $products = Product::query()
                ->where('name', 'like', "%{$request->search}%")
                ->select('id', 'name', 'sku', 'image')
                ->limit(5)
                ->get();
        }

        return inertia('Dashboard/Transaction/Create', [
            'products' => $products,
            'type' => $type
        ]);
    }

    public function store(TransactionRequest $request, $type)
    {
        if (!in_array($type, $this->transactionTypes))
            return back();

        $transaction = Transaction::create([
            "user_id" => auth()->id(),
            "type" => $type,
            "total" => $request->total,
            "note" => $request->note
        ]);

        $product_transaction = [];

        foreach ($request->products as $product) {
            Inventory::create([
                "product_id" => $product["product_id"],
                "quantity" => $product["quantity"],
                "unit_cost" => $product["value"],
                "unit_price" => $product["price"],
                "measure" => $product["measure"],
            ]);

            $product_transaction[] = [
                "transaction_id" => $transaction->id,
                "created_at" => now(),
                "product_id" => $product["product_id"],
                "quantity" => $product["quantity"],
                "measure" => $product["measure"],
                "value" => $product["value"],
            ];
        }

        DB::table("product_transaction")->insert($product_transaction);

        return redirect()->route("dashboard.transactions.index");
    }
}
