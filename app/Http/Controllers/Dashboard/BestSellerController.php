<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\ProductTransactionRepository;
use Illuminate\Http\Request;

class BestSellerController extends Controller
{
    public function __construct(
        private readonly ProductTransactionRepository $productTransactionRepository
    ) {
    }

    public function __invoke()
    {
        return inertia('Dashboard/BestSeller/Index', [
            'products' => $this->productTransactionRepository->getBestSellers(),
        ]);
    }
}
