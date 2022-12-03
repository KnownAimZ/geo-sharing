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
});