<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ClientRepository
{
    public function getAll(array $request)
    {
        return DB::table('clients')
            ->select('id', 'name', 'contact', 'created_at')
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where('name', 'like', "%{$request['search']}%")
                    ->orWhere('contact', 'like', "%{$request['search']}%");
            })
            ->paginate();
    }
}
