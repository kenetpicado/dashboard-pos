<?php

namespace App\Http\Controllers\Dashboard;

use App\Exports\TransactionExport;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Maatwebsite\Excel\Facades\Excel;

class DownloadTransactionController extends Controller
{
    public function __invoke(Transaction $transaction)
    {
        $transaction->load('user:id,name', 'products:id,name,sku');

        return Excel::download(new TransactionExport($transaction), "Transaccion_{$transaction->id}.xlsx");
    }
}
