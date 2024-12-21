<?php
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    
    return response()->json(["hello"=>User::all()]); 
 });
// Routes publiques
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
   ;

    Route::middleware('role:admin')->group(function () {
        Route::get('/admin/dashboard', [AdminController::class, 'index']);
    });

    Route::middleware('role:super_admin')->group(function () {
        Route::get('/super-admin/dashboard', [SuperAdminController::class, 'index']);
    });

    
});Route::get('/simple-test', function () {
    return 'This is a simple test!';
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/create_user', [UserController::class, 'store']); // Ajoutez cette ligne
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::get('/super-admin/dashboard', [SuperAdminController::class, 'index']);
});