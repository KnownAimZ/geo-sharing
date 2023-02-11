<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function toArray($request): array
    {
        $user = User::find($this->subscribed_id);

        return [
            'user_id' => $user->id,
            'email' => $user->email,
            'first_name' => $user?->first_name,
            'last_name' => $user?->last_name,
        ];
    }
}
