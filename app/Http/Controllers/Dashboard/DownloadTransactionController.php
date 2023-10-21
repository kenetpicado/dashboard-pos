<?php

namespace App\Http\Controllers\Dashboard;

use App\Exports\TransactionExport;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DownloadTransactionController extends Controller
{
    public function __invoke($id)
    {
        $transaction = Transaction::with(['user:id,name', 'products:id,name,sku'])
            ->withCount('products')
            ->find($id);

        return Excel::download(new TransactionExport($transaction), "Transaccion_{$transaction->id}.xlsx");
    }
}