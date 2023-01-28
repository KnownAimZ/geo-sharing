<?php

use Illuminate\Support\Facades\Notification;

Route::get('test', function () {
    Notification::route('mail', 'daniilshakhovzp@gmail.com')->notify(new \App\Notifications\TestNotification());
});