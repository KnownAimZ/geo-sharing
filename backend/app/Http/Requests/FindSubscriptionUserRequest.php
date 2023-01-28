<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FindSubscriptionUserRequest extends FormRequest
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
            'first_name' => 'sometimes|string|nullable',
            'last_name' => 'sometimes|string|nullable',
            'email' => 'sometimes|email|nullable',
        ];
    }
}
