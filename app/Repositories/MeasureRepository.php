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
            ->paginate();
    }

    public function getNames()
    {
        return DB::table('measures')
            ->orderBy('name')
            ->pluck('name')
            ->toArray();
    }
}
