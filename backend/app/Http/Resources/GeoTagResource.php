<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GeoTagResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     */
    public function toArray($request): array
    {
        return [
            'geotag_id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'location' => json_decode($this->location),
        ];
    }
}
