<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return inertia('Dashboard/Index', [
            'users_count' => User::count(),
        ]);
    }
}
