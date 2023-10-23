<?php

namespace App\Repositories;

use App\Models\Category;
use App\Traits\BasicRepositoryTrait;

class CategoryRepository
{
    use BasicRepositoryTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Category();
    }

    public function getSimpleList()
    {
        return Category::all(['name', 'id']);
    }

    public function getWithChildrens()
    {
        return Category::whereNull('parent_id')->with('childrens')->get();
    }
}
