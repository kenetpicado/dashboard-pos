<?php

namespace App\Repositories;

use App\Models\User;
use App\Traits\BasicRepositoryTrait;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    use BasicRepositoryTrait;

    private $model;

    public function __construct()
    {
        $this->model = new User();
    }

    public function getAll()
    {
        return $this->model->orderBy('name')->get();
    }

    public function store(array $request)
    {
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'job_title' => 'ADMINISTRADOR',
        ]);
    }

    public function getSimpleList()
    {
        return DB::table('users')
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}
