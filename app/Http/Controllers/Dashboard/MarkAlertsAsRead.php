<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\AlertRepository;

class MarkAlertsAsRead extends Controller
{
    public function __invoke()
    {
        (new AlertRepository)->markAsRead();

        return back();
    }
}
