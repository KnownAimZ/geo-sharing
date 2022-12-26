<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class FriendRequestsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function toArray($request): array
    {
        $user = User::find($this->user_id);

        return [
            'id' => $user?->id,
            'first_name' => $user?->first_name,
            'last_name' => $user?->last_name,
            'status' => $this->status,
        ];
    }
}
