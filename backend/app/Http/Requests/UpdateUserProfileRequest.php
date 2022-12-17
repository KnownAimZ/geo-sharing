<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:60|regex:/^[A-Za-z -.]+$/',
            'last_name' => 'required|string|max:60|regex:/^[A-Za-z -.]+$/',
            'email' => ['required','email','string','max:60','unique:users,email'.optional($this->user()->id)],
            'password' => 'required|string|max:255|min:6',
        ];
    }
}
