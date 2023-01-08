<?php

use App\Http\Controllers\GeotagController;

Route::group(['as' => 'api.users', 'prefix' => 'users', 'middleware' => 'auth:sanctum'], function () {
    Route::get('geotags', [GeotagController::class, 'show']);

    Route::post('create-geotag', [GeotagController::class, 'store'])
        ->name('create-geotag');

    Route::put('update-geotag', [GeotagController::class, 'update'])
        ->name('update-geotag');

    Route::delete('delete-geotag', [GeotagController::class, 'destroy'])
        ->name('delete-geotag');
});