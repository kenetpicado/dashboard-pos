<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Repositories\CategoryRepository;
use App\Repositories\MeasureRepository;
use App\Repositories\ProductRepository;
use Illuminate\Http\Request;

class CatalogueController extends Controller
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly CategoryRepository $categoryRepository,
        private readonly MeasureRepository $measureRepository,
    ) {
    }

    public function index()
    {
        return inertia('Home/Catalogue/Index', [
            'products' => $this->productRepository->getCatalogue(),
            'categories' => $this->categoryRepository->getSimpleList(),
            'measures' => $this->measureRepository->getSimpleList(),
        ]);
    }

    public function show(Product $product)
    {
        return inertia('Home/Catalogue/Show', [
            'product' => $product,
            'inventory' => $product->inventory()->get(['id', 'unit_price', 'measure', 'colors']),
            'related' => $this->productRepository->getRelated($product->category_id, $product->id),
        ]);
    }
}
