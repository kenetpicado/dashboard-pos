<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\PaymentRequest;
use App\Models\Payment;
use App\Repositories\PaymentRepository;
use App\Repositories\TransactionRepository;

class PaymentController extends Controller
{
    public function __construct(
        private readonly TransactionRepository $transactionRepository,
        private readonly PaymentRepository $paymentRepository
    ) {
    }

    public function store(PaymentRequest $request)
    {
        $payment = $this->paymentRepository->store($request->validated());

        $isCompleted = $this->transactionRepository->updateStatus($payment);

        if ($isCompleted) {
            return redirect()->route('dashboard.transactions.index');
        }

        return back();
    }

    public function destroy(Payment $payment)
    {
        $this->transactionRepository->decrementTotal($payment);
        $payment->delete();

        return back();
    }
}
