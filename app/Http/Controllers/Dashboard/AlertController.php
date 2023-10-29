<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\AlertRepository;

class AlertController extends Controller
{
    public function __construct(
        private readonly AlertRepository $alertRepository
    ) {
    }

    public function index()
    {
        return inertia('Dashboard/Alert/Index', [
            'alerts' => $this->alertRepository->getAll(),
        ]);
    }

    public function destroy($alert)
    {
        $this->alertRepository->destroy($alert);

        return back();
    }
}
