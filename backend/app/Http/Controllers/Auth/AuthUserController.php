<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\AuthUserRequest;
use App\Http\Resources\UserProfileRecourse;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class AuthUserController extends ApiController
{
    /**
     * Login to user profile
     *
     * @param  AuthUserRequest  $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(AuthUserRequest $request): JsonResponse
    {
        $request->authenticateUser();

        \Log::info($request->user);
        $response = (new UserProfileRecourse($request->user))->resolve();

        return $this->response(array_merge($response, [
            'token' => $request->userToken,
            'message' => 'You have successfully logged in',
        ]));
    }

    /**
     * Logout from user profile
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function destroy(Request $request): JsonResponse
    {
        if ($token = $request->bearerToken()) {
            if ($personalAccessToken = PersonalAccessToken::findToken($token)) {
                $personalAccessToken->delete();
            }

            return $this->response([
                'message' => 'You are successfully logged out.',
            ]);
        }
    }
}
