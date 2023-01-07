<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\FriendRequestsResource;
use App\Models\FriendRequests;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FriendRequestController extends ApiController
{
    public function show(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $friendRequests = FriendRequests::where('friend_id', $user->id)->get();

        return $this->response([
            'friend_requests' => FriendRequestsResource::collection($friendRequests),
        ]);
    }
}
