<?php


use App\Http\Controllers\SubscriptionController;

Route::group(['as' => 'api.subscription', 'prefix' => 'subscription', 'middleware' => 'auth:sanctum'], function () {
    Route::get('subscriptions', [SubscriptionController::class, '__invoke'])
        ->name('subscriptions');

    Route::post('find-user', [SubscriptionController::class, 'show'])
        ->name('find-user');

    Route::post('subscribe-user', [SubscriptionController::class, 'store'])
        ->name('subscribe-user');

    Route::delete('unsubscribe-user', [SubscriptionController::class, 'delete'])
        ->name('unsubscribe-user');
});