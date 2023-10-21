<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Repositories\ClientRepository;
use App\Repositories\TransactionRepository;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function __construct(
        private readonly ClientRepository $clientRepository,
        private readonly TransactionRepository $transactionRepository,
    ) {
    }

    public function index(Request $request)
    {
        return inertia('Dashboard/Client/Index', [
            'clients' => $this->clientRepository->getAll($request->all()),
        ]);
    }

    public function show(Client $client)
    {
        return inertia('Dashboard/Client/Show', [
            'client' => $client,
            'transactions' => $this->transactionRepository->byClient($client->name),
        ]);
    }
}
