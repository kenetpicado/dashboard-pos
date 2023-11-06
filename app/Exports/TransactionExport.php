<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class TransactionExport implements FromView
{
    public function __construct(
        private readonly object $transaction,
        private readonly float $payments_total
    ) {
    }

    public function view(): View
    {
        return view('exports.transaction', [
            'transaction' => $this->transaction,
            'payments_total' => $this->payments_total,
        ]);
    }
}
