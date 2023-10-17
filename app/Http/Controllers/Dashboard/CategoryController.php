<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CategoryRequest;
use App\Repositories\CategoryRepository;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryRepository $categoryRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Category/Index', [
            'categories' => $this->categoryRepository->getWithChildrens(),
        ]);
    }

    public function store(CategoryRequest $request)
    {
        $this->categoryRepository->store($request->validated());

        return back();
    }

    public function update(CategoryRequest $request, $category)
    {
        $this->categoryRepository->update($category, $request->validated());

        return back();
    }

    public function destroy($category)
    {
        $this->categoryRepository->destroy($category);

        return back();
    }
}
