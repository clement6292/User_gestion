<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

// Route de la page d'accueil
Route::get('/', function () {
    return view('welcome');
});

// Routes protégées par session (web)
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Ajoutez d'autres routes protégées ici, si nécessaire.
});