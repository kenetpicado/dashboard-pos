<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TransactionRequest;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public $transactionTypes = ['buy', 'sell'];

    public function index()
    {
        $transactions = Transaction::query()
            ->with('user:id,name')
            ->withCount('products')
            ->latest()
            ->paginate();

        return inertia('Dashboard/Transaction/Index', [
            'transactions' => $transactions,
        ]);
    }

    public function create(Request $request, $type)
    {
        if (! in_array($type, $this->transactionTypes)) {
            return back();
        }

        $products = [];

        if ($request->search) {
            $products = Product::query()
                ->where('name', 'like', "%{$request->search}%")
                ->orWhere('sku', 'like', "%{$request->search}%")
                ->select('id', 'name', 'sku', 'image')
                ->limit(5)
                ->get();
        }

        return inertia('Dashboard/Transaction/Create', [
            'products' => $products,
            'type' => $type,
        ]);
    }

    public function store(TransactionRequest $request, $type)
    {
        if (! in_array($type, $this->transactionTypes)) {
            return back();
        }

        $transaction = Transaction::create([
            'user_id' => auth()->id(),
            'type' => $type,
            'total' => $request->total,
            'note' => $request->note,
            'client' => $request->client,
            'currency' => 'NIO',
        ]);

        $product_transaction = [];

        foreach ($request->products as $product) {

            $alreadyExists = Inventory::query()
                ->where('product_id', $product['product_id'])
                ->where('measure', $product['measure'])
                ->where('unit_cost', $product['cost'])
                ->where('unit_price', $product['price'])
                ->first();

            if ($alreadyExists != null) {
                $alreadyExists->increment('quantity', $product['quantity']);
            } else {
                Inventory::create([
                    'product_id' => $product['product_id'],
                    'quantity' => $product['quantity'],
                    'unit_cost' => $product['cost'],
                    'unit_price' => $product['price'],
                    'measure' => $product['measure'],
                ]);
            }

            $product_transaction[] = [
                'created_at' => now(),
                'transaction_id' => $transaction->id,
                'product_id' => $product['product_id'],
                'quantity' => $product['quantity'],
                'measure' => $product['measure'],
                'value' => $product['cost'],
            ];
        }

        DB::table('product_transaction')->insert($product_transaction);

        return redirect()->route('dashboard.transactions.index');
    }
}
