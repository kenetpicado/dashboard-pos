<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Repositories\ClientRepository;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function __construct(
        private readonly ClientRepository $clientRepository,
    ) {
    }

    public function index(Request $request)
    {
        return inertia('Dashboard/Client/Index', [
            'clients' => $this->clientRepository->getAll($request->all()),
        ]);
    }
}
