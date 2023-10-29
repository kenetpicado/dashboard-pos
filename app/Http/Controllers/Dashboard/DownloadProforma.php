<?php

namespace App\Http\Controllers\Dashboard;

use App\Exports\ProformaExport;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class DownloadProforma extends Controller
{
    public function __invoke(Request $request)
    {
        return Excel::download(new ProformaExport($request->all()), 'Proforma.xlsx');
    }
}
