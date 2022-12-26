<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\GeoTagRequest;
use App\Http\Resources\GeoTagResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeotagController extends ApiController
{
    public function show(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $geotags = $user->geoTags()->get();

        return $this->response([
            'geotags' => GeoTagResource::collection($geotags),
        ]);
    }

    /**
     * @param  GeoTagRequest  $request
     * @return JsonResponse
     */
    public function store(GeoTagRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->geoTags()->create([
            'name' => $request->name,
            'description' => $request->description,
            'location' => $request->location
        ]);

        return $this->response([
            'message' => __('Geotag was created successfully.'),
        ]);
    }
}
