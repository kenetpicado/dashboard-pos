<?php

use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Dashboard\ProfileController;
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
    });
