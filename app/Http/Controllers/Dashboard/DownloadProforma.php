<?php

namespace App\Http\Controllers\Dashboard;

use App\Exports\TransactionExport;
use App\Http\Controllers\Controller;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DownloadProforma extends Controller
{
    public function __invoke(Request $request)
    {
        $transaction = Transaction::with(['user:id,name', 'products:id,name,sku'])->find(1);

        return Excel::download(new TransactionExport($transaction), "Transaccion_{$transaction->id}.xlsx");
    }
}
