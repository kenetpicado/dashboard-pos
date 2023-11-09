<?php

namespace App\Repositories;

use App\Models\Measure;
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

        return DB::table('products')
            ->join('inventories', 'products.id', '=', 'inventories.product_id')
            ->where('products.category_id', $category_id)
            ->where('inventories.quantity', '>', 0)
            ->select('inventories.measure as name')
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
