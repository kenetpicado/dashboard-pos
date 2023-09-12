<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Category/Index', [
            'categories' => Category::whereNull('parent_id')->with('childrens')->get()
        ]);
    }

    public function store(CategoryRequest $request)
    {
        Category::create($request->validated());

        return back();
    }

    public function update(CategoryRequest $request, $category)
    {
        Category::where('id', $category)->update($request->validated());

        return back();
    }

    public function destroy($category)
    {
        Category::where('id', $category)->delete();

        return back();
    }
}
