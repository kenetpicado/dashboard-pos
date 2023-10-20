<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PaymentRequest;
use App\Models\Payment;
use App\Repositories\TransactionRepository;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function __construct(
        private readonly TransactionRepository $transactionRepository
    ) {
    }

    public function store(PaymentRequest $request)
    {
        $payment = Payment::create($request->validated());

        $isCompleted = $this->transactionRepository->updateStatus($payment);

        if ($isCompleted) {
            return redirect()->route('dashboard.transactions.index');
        }

        return back();
    }

    public function update(PaymentRequest $request, $payment)
    {
        $payment = Payment::where('id', $payment)->update($request->validated());

        $isCompleted = $this->transactionRepository->updateStatus($payment);

        if ($isCompleted) {
            return redirect()->route('dashboard.transactions.index');
        }

        return back();
    }

    public function destroy(Payment $payment)
    {
        $this->transactionRepository->decrementPayment($payment);

        Payment::destroy($payment->id);

        return back();
    }
}
