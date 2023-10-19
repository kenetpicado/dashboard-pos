<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PaymentRequest;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(PaymentRequest $request)
    {
        Payment::create($request->validated());

        return back();
    }

    public function update(PaymentRequest $request, $payment)
    {
        Payment::where('id', $payment)->update($request->validated());

        return back();
    }

    public function destroy($payment)
    {
        Payment::destroy($payment);

        return back();
    }
}
