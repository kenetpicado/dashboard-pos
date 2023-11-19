<?php

namespace App\Repositories;

use App\Models\Measure;
use App\Models\Product;
use App\Traits\BasicRepositoryTrait;
use Illuminate\Support\Facades\DB;

class MeasureRepository
{
    use BasicRepositoryTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Measure();
    }

    public function getAll()
    {
        return DB::table('measures')
            ->select('id', 'name')
            ->orderBy('name')
            ->paginate(30);
    }

    public function getSimpleList()
    {
        return DB::table('measures')
            ->select('id', 'name')
            ->orderBy('name')
            ->get();
    }

    public function getMeasuresOf($category_id = null)
    {
        if (is_null($category_id)) {
            return [];
        }

        return Product::query()
            ->join('inventories', 'products.id', '=', 'inventories.product_id')
            ->where('inventories.quantity', '>', 0)
            ->where(function ($query) use ($category_id) {
                $query->where('category_id', $category_id)
                    ->orWhere(function ($query) use ($category_id) {
                        $query->whereHas('category', function ($query) use ($category_id) {
                            $query->where('parent_id', $category_id);
                        });
                    });
            })
            ->selectRaw('inventories.measure as name')
            ->distinct()
            ->get();
    }

    public function getNames()
    {
        return DB::table('measures')
            ->orderBy('name')
            ->pluck('name')
            ->toArray();
    }
}
