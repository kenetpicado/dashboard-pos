<?php

namespace App\Repositories;

use App\Models\Client;

class ClientRepository
{
    public function getAll(array $request)
    {
        return Client::query()
            ->select('id', 'name', 'contact', 'created_at')
            ->when(isset($request['search']), function ($query) use ($request) {
                $query->where('name', 'like', "%{$request['search']}%")
                    ->orWhere('contact', 'like', "%{$request['search']}%");
            })
            ->paginate();
    }
}
