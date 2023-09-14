<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SupplierRequest;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{

    public function index()
    {
        return inertia('Dashboard/Supplier/Index', [
            'suppliers' => Supplier::all(),
        ]);
    }

    public function store(SupplierRequest $request)
    {
        Supplier::create($request->validated());

        return back();
    }

    public function update(SupplierRequest $request, $supplier)
    {
        Supplier::where('id', $supplier)->update($request->validated());

        return back();
    }

  
    public function destroy($supplier)
    {
        Supplier::where('id', $supplier)->delete();

        return back();
    }
}
