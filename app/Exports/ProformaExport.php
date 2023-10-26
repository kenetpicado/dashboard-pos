<?php

namespace App\Exports;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class ProformaExport implements FromView
{
    public function __construct(
        private readonly array $request
    ) {
    }

    public function view(): View
    {
        return view('exports.proforma', [
            'request' => $this->request,
        ]);
    }
}
