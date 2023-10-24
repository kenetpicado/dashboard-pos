<?php

use App\Http\Controllers\Dashboard\AlertController;
use App\Http\Controllers\Dashboard\BestSellerController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\ClientController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\DownloadProforma;
use App\Http\Controllers\Dashboard\DownloadTransactionController;
use App\Http\Controllers\Dashboard\InventoryController;
use App\Http\Controllers\Dashboard\MarkAlertsAsRead;
use App\Http\Controllers\Dashboard\MeasureController;
use App\Http\Controllers\Dashboard\PaymentController;
use App\Http\Controllers\Dashboard\PendingController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\TransactionController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/dashboard');

Route::middleware(['auth:sanctum'])
    ->prefix('dashboard')
    ->name('dashboard.')
    ->group(function () {
        Route::get('/', DashboardController::class)->name('index');

        Route::resource('profile', ProfileController::class)
            ->only(['index', 'update']);

        Route::resource('users', UserController::class)
            ->except(['show', 'edit', 'create']);

        Route::resource('categories', CategoryController::class)
            ->except(['create', 'edit', 'show']);

        Route::resource('transactions', TransactionController::class)
            ->except(['update', 'edit']);

        Route::resource('products', ProductController::class);

        Route::resource('inventory', InventoryController::class)
            ->only(['index', 'show', 'update', 'destroy']);

        Route::resource('pending', PendingController::class)
            ->only(['index', 'show']);

        Route::resource('payments', PaymentController::class)
            ->only(['store', 'update', 'destroy']);

        Route::resource('clients', ClientController::class)
            ->only(['index', 'show']);

        Route::get('download/transaction/{transaction}', DownloadTransactionController::class)
            ->name('download.transaction');

        Route::resource('measures', MeasureController::class)
            ->except(['create', 'edit', 'show']);

        Route::get('best-seller', BestSellerController::class)
            ->name('best-seller');

        Route::resource('alerts', AlertController::class)
            ->only(['index', 'destroy']);

        Route::put('alerts-mark-as-read', MarkAlertsAsRead::class)
            ->name('alerts.mark-as-read');

        Route::post('download/proforma', DownloadProforma::class)
            ->name('download.proforma');
    });
