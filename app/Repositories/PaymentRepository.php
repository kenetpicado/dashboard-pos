<?php

namespace App\Repositories;

use App\Models\Payment;
use App\Traits\BasicRepositoryTrait;

class PaymentRepository
{
    use BasicRepositoryTrait;

    public $model;

    public function __construct()
    {
        $this->model = new Payment();
    }
}
