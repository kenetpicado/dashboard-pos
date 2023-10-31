<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public function __construct(
        private readonly ProductRepository $productRepository
    ) {
    }

    public function index()
    {
        return inertia('Home/Catalogue/Index', [
            'products' => $this->productRepository->getCatalogue()
        ]);
    }
}
