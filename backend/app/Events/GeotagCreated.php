<?php

namespace App\Events;

use App\Models\Geotags;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GeotagCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public Geotags $geotag;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Geotags $geotag)
    {
        $this->geotag = $geotag;
    }
}
