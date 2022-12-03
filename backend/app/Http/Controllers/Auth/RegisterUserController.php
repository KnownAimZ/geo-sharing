<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Api\ApiController;
use App\Http\Resources\UserProfileRecourse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterUserController extends ApiController
{
    /**
     * Register user.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'first_name' => 'required|string|min:3|max:30',
            'last_name' => 'required|string|min:3|max:30',
            'email' => 'required|string|email:rfc,dns|max:60|unique:users,email',
            'password' => 'required|string|max:255|min:6|confirmed',
            'password_confirmation' => 'required|min:6|max:255',
        ]);

        /** @var User $user */
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        /** @var array $response */
        $response = (new UserProfileRecourse($user))->resolve();

        return $this->response(array_merge($response, [
            'token' => $user->createToken($user->email)->plainTextToken,
            'message' => __('api.successfully_registered'),
        ]));
    }
}
