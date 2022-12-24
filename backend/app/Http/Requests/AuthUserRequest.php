<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthUserRequest extends FormRequest
{
    /**
     * @var string
     */
    public string $userToken;

    /**
     * @var User
     */
    public User $user;
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'email' => ['required', 'string', 'email', 'max:250'],
            'password' => ['required', 'string', 'min:4'],
        ];
    }

    public function authenticateUser(): void
    {
        $user = User::where('email', $this->get('email'))->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'error' => 'User does not exists.',
            ]);
        }

        if (! Hash::check($this->get('password'), $user->password)) {
            throw ValidationException::withMessages([
                'error' => 'Wrong email or password.',
            ]);
        }

        $this->user = $user;

        $this->userToken = $user->createToken($user->email)->plainTextToken;
    }
}
