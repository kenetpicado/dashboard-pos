<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class TransactionExport implements FromView
{

    public function __construct(private readonly object $transaction)
    {
        //
    }

    public function view(): View
    {
        return view('exports.transaction', [
            'transaction' => $this->transaction,
        ]);
    }
}
