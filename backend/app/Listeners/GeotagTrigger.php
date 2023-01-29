<?php

namespace App\Listeners;

use App\Events\GeotagCreated;
use App\Models\UserSubscription;
use App\Notifications\GeotagNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class GeotagTrigger implements ShouldQueue
{
    /**
     * Handle the event.
     *
     * @param  \App\Events\GeotagCreated  $event
     * @return void
     */
    public function handle(GeotagCreated $event)
    {
        $user = $event->geotag->user();

        $subscribedUsers = UserSubscription::where('subscribed_id', $user->id)->get();

        if ($subscribedUsers->isEmpty()) {
            return;
        }

        $location = json_decode($event->geotag->location);
        foreach ($subscribedUsers as $item) {
            Notification::route('mail', $item->email)->notify(new GeotagNotification([
                'user_name' => $item->first_name.' '.$item->last_name,
                'posted_user' => $user->first_name.' '.$user->last_name,
                'geotag_name' => $event->geotag->name,
                'geotag_desc' => $event->geotag->description,
                'geotag_lon' => $location->lon,
                'geotag_lat' => $location->lat,
            ]));
        }
    }
}
