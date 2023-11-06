<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\TransactionRequest;
use App\Http\Requests\Dashboard\TransactionTypeRequest;
use App\Models\Transaction;
use App\Repositories\CategoryRepository;
use App\Repositories\MeasureRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SettingRepository;
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
        private readonly MeasureRepository $measureRespository,
        private readonly CategoryRepository $categoryRepository,
        private readonly SettingRepository $settingRepository,
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
        return inertia('Dashboard/Transaction/Create', [
            'products' => $this->productRepository->search($request),
            'measures' => $request->type == 'buy' ? $this->measureRespository->getNames() : [],
            'type' => $request->type,
            'categories' => $this->categoryRepository->getWithChildrens(),
            'manage_colors' => $this->settingRepository->manageColors(),
        ]);
    }

    public function show(Transaction $transaction)
    {
        return inertia('Dashboard/Transaction/Show', [
            'transaction' => $transaction->load('user:id,name', 'products:id,name,sku'),
            'payments_total' => $transaction->payments->sum('value'),
        ]);
    }

    public function store(TransactionRequest $request)
    {
        $this->transactionService->store($request->validated());

        return redirect()->route('dashboard.transactions.index');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->forceDelete();

        return back();
    }
}
