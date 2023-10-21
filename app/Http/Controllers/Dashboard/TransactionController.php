<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TransactionRequest;
use App\Http\Requests\Dashboard\TransactionTypeRequest;
use App\Models\Transaction;
use App\Repositories\MeasureRepository;
use App\Repositories\ProductRepository;
use App\Repositories\TransactionRepository;
use App\Repositories\UserRepository;
use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function __construct(
        private readonly TransactionRepository $transactionRepository,
        private readonly ProductRepository $productRepository,
        private readonly TransactionService $transactionService,
        private readonly UserRepository $userRepository,
        private readonly MeasureRepository $measureRespository
    ) {
    }

    public function index(Request $request)
    {
        return inertia('Dashboard/Transaction/Index', [
            'transactions' => $this->transactionRepository->getAll($request->all()),
            'sell_month' => $this->transactionRepository->getMonthlyTotal('sell', $request->all()),
            'buy_month' => $this->transactionRepository->getMonthlyTotal('buy', $request->all()),
            'users' => $this->userRepository->getSimpleList(),
        ]);
    }

    public function create(TransactionTypeRequest $request)
    {
        $measures = [];

        if ($request->type == 'buy') {
            $measures = $this->measureRespository->getNames();
        }

        return inertia('Dashboard/Transaction/Create', [
            'products' => $this->productRepository->search($request->search, $request->type == 'sell'),
            'type' => $request->type,
            'measures' => $measures
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
