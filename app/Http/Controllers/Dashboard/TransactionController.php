<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TransactionRequest;
use App\Http\Requests\Dashboard\TransactionTypeRequest;
use App\Models\Inventory;
use App\Models\Product;
use App\Models\Transaction;
use App\Repositories\ProductRepository;
use App\Repositories\TransactionRepository;
use App\Services\TransactionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public $transactionTypes = ['buy', 'sell'];

    public function __construct(
        private readonly TransactionRepository $transactionRepository,
        private readonly ProductRepository $productRepository,
        private readonly TransactionService $transactionService
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Transaction/Index', [
            'transactions' => $this->transactionRepository->getAll(),
        ]);
    }

    public function create(TransactionTypeRequest $request)
    {
        return inertia('Dashboard/Transaction/Create', [
            'products' => $this->productRepository->search($request->search, $request->type == 'sell'),
            'type' => $request->type,
        ]);
    }

    public function show(Transaction $transaction)
    {
        $transaction->load('user:id,name', 'products:id,name,sku');

        return inertia('Dashboard/Transaction/Show', [
            'transaction' => $transaction,
        ]);
    }

    public function store(TransactionRequest $request)
    {
        $this->transactionService->store($request->validated());

        return redirect()->route('dashboard.transactions.index');
    }
}
