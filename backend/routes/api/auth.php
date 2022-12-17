<?php

use App\Http\Controllers\Auth\AuthUserController;
use App\Http\Controllers\Auth\RegisterUserController;

Route::group(['as' => 'api.auth.users.', 'prefix' => 'users'], function () {
    Route::post('login', [AuthUserController::class, 'store'])
        ->middleware('guest:api')
        ->name('login');

    Route::post('logout', [AuthUserController::class, 'destroy'])
        ->name('logout');

    Route::post('sign-up', [RegisterUserController::class, '__invoke'])
        ->name('sign-up');

    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::get('profile', [Auth\UserProfileController::class, 'show'])
            ->name('profile');

        Route::put('update-profile', [Auth\UserProfileController::class, 'update'])
            ->name('update-profile');
    });
});