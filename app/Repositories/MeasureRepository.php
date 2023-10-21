<?php

namespace App\Repositories;

use App\Models\Measure;
use App\Traits\BasicRepositoryTrait;

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
        return Measure::select('id', 'name')->paginate();
    }
}
