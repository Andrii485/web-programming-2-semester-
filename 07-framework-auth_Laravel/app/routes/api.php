<?php
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Ендпоінти для ПЕРЕГЛЯДУ — роль ProductsApiViewer
Route::middleware(['auth:api', 'keycloak-can:ProductsApiViewer'])
    ->group(function () {
        Route::get('/products',      [ProductController::class, 'index']);
        Route::get('/products/{id}', [ProductController::class, 'show']);
    });

// Ендпоінти для РЕДАГУВАННЯ — роль ProductsApiWriter
Route::middleware(['auth:api', 'keycloak-can:ProductsApiWriter'])
    ->group(function () {
        Route::post('/products',         [ProductController::class, 'store']);
        Route::put('/products/{id}',     [ProductController::class, 'update']);
        Route::delete('/products/{id}',  [ProductController::class, 'destroy']);
    });