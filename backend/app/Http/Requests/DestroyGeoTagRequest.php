<?php

namespace App\Http\Requests;

use App\Models\Geotags;
use Illuminate\Foundation\Http\FormRequest;

class DestroyGeoTagRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'geotag_id' => [
                'required',
                'int',
                function ($attribute, $value, $fail) {
                    $geotags = Geotags::where('id', $value)->first();

                    if (! $geotags) {
                        $fail(__('Geotag does not found.'));

                        return;
                    }

                    $userTag = $this->user()->geoTags()->where('id', $value)->first();

                    if (! $userTag) {
                        $fail(__('This geotag does not belong to user.'));

                        return;
                    }
                }
            ]
        ];
    }
}
