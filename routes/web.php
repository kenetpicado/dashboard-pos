<?php

use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\InventoryController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\TransactionController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

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

        // Route::get('transactions', [TransactionController::class, 'index'])
        //     ->name('transactions.index');

        // Route::get('transactions', [TransactionController::class, 'create'])
        //     ->name('transactions.create');

        // Route::get('transactions/{transaction}/details', [TransactionController::class, 'show'])
        //     ->name('transactions.show');

        // Route::post('transactions/{type}', [TransactionController::class, 'store'])
        //     ->name('transactions.store');

        Route::resource('transactions', TransactionController::class);

        Route::resource('products', ProductController::class);

        Route::get('inventory', [InventoryController::class, 'index'])
            ->name('inventory.index');
    });
