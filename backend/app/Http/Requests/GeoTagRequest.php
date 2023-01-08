<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GeoTagRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => ['required','string','min:5'],
            'description' => ['nullable','string'],
            'location' => ['required', 'object'],
        ];
    }
}
