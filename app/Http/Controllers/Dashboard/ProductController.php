<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\ProductRequest;
use App\Models\Product;
use App\Repositories\CategoryRepository;
use App\Repositories\InventoryRepository;
use App\Repositories\MeasureRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SettingRepository;
use App\Services\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductRepository $productRepository,
        private readonly InventoryRepository $inventoryRepository,
        private readonly MeasureRepository $measureRepository,
        private readonly CategoryRepository $categoryRepository,
        private readonly SettingRepository $settingRepository,
    ) {
    }

    public function index(Request $request)
    {
        return inertia('Dashboard/Product/Index', [
            'products' => $this->productRepository->getAll($request->all()),
        ]);
    }

    public function create()
    {
        return inertia('Dashboard/Product/Create', [
            'measures' => $this->measureRepository->getNames(),
            'manage_colors' => $this->settingRepository->manageColors(),
            'categories' => $this->categoryRepository->getSimpleList(),
        ]);
    }

    public function edit(Product $product)
    {
        return inertia('Dashboard/Product/Create', [
            'product' => $product,
            'categories' => $this->categoryRepository->getSimpleList(),
            'isNew' => false,
        ]);
    }

    public function store(ProductRequest $request)
    {
        $product = $this->productRepository->store($request->validated());

        if (count($request->inventory) > 0) {
            (new ProductService)->storeItems($product, $request->inventory, $request->total);
        }

        return redirect()->route('dashboard.products.index');
    }

    public function show(Product $product)
    {
        return inertia('Dashboard/Product/Show', [
            'product' => $product,
            'measures' => $this->measureRepository->getNames(),
            'inventory' => $this->productRepository->getInventory($product),
            'inventoryStatus' => $this->productRepository->getInventoryStatus($product->id),
            'manage_colors' => $this->settingRepository->manageColors(),
        ]);
    }

    public function update(ProductRequest $request, $product)
    {
        Product::where('id', $product)->update($request->validated());

        return redirect()->route('dashboard.products.index');
    }

    public function destroy($product)
    {
        $this->productRepository->destroy($product);

        return back();
    }
}
