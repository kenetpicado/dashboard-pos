<?php

use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\InventoryController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\SupplierController;
use App\Http\Controllers\Dashboard\TransactionController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::redirect('/', '/dashboard');

Route::middleware(['auth:sanctum'])
    ->prefix('dashboard')
    ->name('dashboard.')
    ->group(function () {
        Route::get('/', DashboardController::class)->name('index');

        Route::resource('profile', ProfileController::class)
            ->only(['index', 'update']);

        Route::resource('users', UserController::class)
            ->except(['show', 'edit']);

        Route::resource('categories', CategoryController::class)
            ->except(['create', 'edit', 'show']);

        Route::resource('suppliers', SupplierController::class)
            ->except(['create', 'edit', 'show']);

        Route::get('transactions', [TransactionController::class, 'index'])
            ->name('transactions.index');

        Route::get('transactions/{type}', [TransactionController::class, 'create'])
            ->name('transactions.create');

        Route::post('transactions/{type}', [TransactionController::class, 'store'])
            ->name('transactions.store');

        Route::resource('products', ProductController::class)
            ->except('show');

        Route::get('inventory', [InventoryController::class, 'index'])
            ->name('inventory.index');
    });
