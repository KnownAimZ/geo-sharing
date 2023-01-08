<?php


use App\Http\Controllers\FriendController;
use App\Http\Controllers\FriendRequestController;

Route::group(['as' => 'api.friends', 'prefix' => 'friends', 'middleware' => 'auth:sanctum'], function () {
    Route::get('friends', [FriendController::class, '__invoke'])
        ->name('friends');

    Route::post('find-friend', [FriendController::class, 'show'])
        ->name('find-friend');

    Route::post('add-friend', [FriendController::class, 'store'])
        ->name('add-friend');

    Route::delete('delete-friend', [FriendController::class, 'delete'])
        ->name('delete-friend');

    Route::get('friend-request', [FriendRequestController::class, 'show'])
        ->name('friend-request');
});