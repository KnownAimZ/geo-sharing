<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\UpdateUserProfileRequest;
use App\Http\Resources\UserProfileRecourse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends ApiController
{
    /**
     * Get user profile.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $response = (new UserProfileRecourse($request->user()))->resolve();

        return $this->response(array_merge($response, [
            'token' => $request->bearerToken(),
        ]));
    }

    public function update(UpdateUserProfileRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $data = $request->only(['first_name', 'last_name']);

        if (! empty($request->password)) {
            $data['password'] = Hash::make($request->password);
        }

        $user->update($data);

        if (strtolower($user->email) !== $request->email) {
            $user->update(['email' => strtolower($request->email)]);
        }

        $response = (new UserProfileRecourse($request->user()))->resolve();

        return $this->response(array_merge($response, [
            'token' => $request->bearerToken(),
        ]));
    }
}
