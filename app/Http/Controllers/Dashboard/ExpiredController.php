<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\InventoryRepository;
use Illuminate\Http\Request;

class ExpiredController extends Controller
{
    public function index()
    {
        return inertia('Dashboard/Expired/Index', [
            'inventory' => (new InventoryRepository)->soonToExpire(),
        ]);
    }
}
