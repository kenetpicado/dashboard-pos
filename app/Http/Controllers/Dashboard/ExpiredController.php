<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\InventoryRepository;

class ExpiredController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Expired/Index', [
            'inventory' => (new InventoryRepository)->soonToExpire(),
        ]);
    }
}
