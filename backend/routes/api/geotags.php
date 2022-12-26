<?php

use App\Http\Controllers\GeotagController;

Route::group(['as' => 'api.users', 'prefix' => 'users', 'middleware' => 'auth:sanctum'], function () {
    Route::get('geotags', [GeotagController::class, 'show']);

    Route::post('create-geotag', [GeotagController::class, 'store'])
        ->name('create-geotag');
});