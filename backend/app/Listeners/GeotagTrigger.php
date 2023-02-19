<?php

namespace App\Listeners;

use App\Events\GeotagCreated;
use App\Models\User;
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
        $user = $event->geotag->user()->first();

        $subscribedUsers = UserSubscription::where('subscribed_id', $user->id)->get();

        if ($subscribedUsers->isEmpty()) {
            return;
        }

        $location = json_decode($event->geotag->location);
        foreach ($subscribedUsers as $item) {
            $subscribedUser = User::find($item->user_id);

            if (!$subscribedUser) {
                continue;
            }

            Notification::route('mail', $subscribedUser->email)->notify(new GeotagNotification([
                'user_name' => $subscribedUser->first_name.' '.$subscribedUser->last_name,
                'posted_user' => $subscribedUser->first_name.' '.$subscribedUser->last_name,
                'geotag_name' => $event->geotag->name,
                'geotag_desc' => $event->geotag->description,
                'geotag_lon' => $location->lng,
                'geotag_lat' => $location->lat,
            ]));
        }
    }
}
