<?php

use App\Notifications\GeotagNotification;
use Illuminate\Support\Facades\Notification;

Route::get('test', function () {
    Notification::route('mail', 'danilshahov@gmail.com')->notify(new GeotagNotification([
        'user_name' => 'test',
        'posted_user' => 'test',
        'geotag_name' => 'test',
        'geotag_desc' => 'test',
        'geotag_lon' => 'test',
        'geotag_lat' => 'test',
    ]));
});


Route::get('hui', function () {
   dd(124);
});