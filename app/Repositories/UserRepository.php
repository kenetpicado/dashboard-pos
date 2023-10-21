<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class UserRepository
{
    public function getSimpleList()
    {
        return DB::table('users')
            ->orderBy('name')
            ->get(['id', 'name']);
    }
}
