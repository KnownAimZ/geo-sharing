<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\FindSubscriptionUserRequest;
use App\Http\Requests\SubscribeUserRequest;
use App\Http\Requests\UnsubscribeUserRequest;
use App\Http\Resources\SubscriptionResource;
use App\Http\Resources\UserProfileRecourse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriptionController extends ApiController
{
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        return $this->response([
            'subscriptions' => SubscriptionResource::collection($user->userSubscription()->get()),
        ]);
    }

    /**
     * Find a user to subscribe for his posts.
     *
     * @param  FindSubscriptionUserRequest  $request
     * @return JsonResponse
     */
    public function show(FindSubscriptionUserRequest $request): JsonResponse
    {
        $user = User::query()->where('id', '!=', $request->user()->id)->when($request->get('email'),
                fn ($q) => $q->where('email', 'like', '%'.$request->get('email').'%')
            )->when($request->get('first_name'),
                fn ($q) => $q->where('first_name', 'like', '%'.$request->get('first_name').'%')
            )->when($request->get('last_name'),
                fn ($q) => $q->where('last_name', 'like', '%'.$request->get('last_name').'%')
            )->get();

        return $user
            ? $this->response(['users' => UserProfileRecourse::collection($user)->resolve()])
            : $this->response(['message' => 'A user not found.']);
    }

    /**
     * Subscribe for user geotags.
     *
     * @param  SubscribeUserRequest  $request
     * @return JsonResponse
     */
    public function store(SubscribeUserRequest $request): JsonResponse
    {
        $user = $request->user();

        $user->userSubscription()->create([
            'subscribed_id' => $request->user_id,
        ]);

        return $this->response(['message' => 'Subscribed.']);
    }

    /**
     * Unsubscribe from user geotag posts.
     *
     * @param  UnsubscribeUserRequest  $request
     * @return JsonResponse
     */
    public function destroy(UnsubscribeUserRequest $request): JsonResponse
    {
        $user = $request->user();

        if (! $user->userSubscription()->where('subscribed_id', $request->user_id)->exists()) {
            return $this->response(['error' => 'You haven`t subscribed for this user.']);
        }

        $user->userSubscription()->where('subscribed_id', $request->user_id)->delete();

        return $this->response(['message' => 'Unsubscribed.']);
    }
}
