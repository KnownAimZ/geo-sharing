<?php

namespace App\Http\Controllers;

use App\Events\GeotagCreated;
use App\Http\Controllers\Api\ApiController;
use App\Http\Requests\DestroyGeoTagRequest;
use App\Http\Requests\GeoTagRequest;
use App\Http\Requests\UpdateGeoTagRequest;
use App\Http\Resources\GeoTagResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GeotagController extends ApiController
{
    public function __invoke(Request $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $geotags = $user->geoTags()->get();

        return $this->response([
            'geotags' => GeoTagResource::collection($geotags),
        ]);
    }

    /**
     * Show selected geotag.
     *
     * @param  DestroyGeoTagRequest  $request
     * @return JsonResponse
     */
    public function show(DestroyGeoTagRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $geotags = $user->geoTags()->where('id', $request->geotag_id)->get();
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

        $geotag = $user->geoTags()->create([
            'name' => $request->name,
            'description' => $request->description,
            'location' => json_encode($request->location, JSON_FORCE_OBJECT),
        ]);

        event(new GeotagCreated($geotag));
        return $this->response([
            'message' => __('Geotag was created successfully.'),
        ]);
    }

    /**
     * Update geotag.
     *
     * @param  UpdateGeoTagRequest  $request
     * @return JsonResponse
     */
    public function update(UpdateGeoTagRequest $request): JsonResponse
    {
        /** @var User $user */
        $user = $request->user();

        $user->geoTags()->where('id', $request->geotag_id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'location' => $request->location
        ]);

        return $this->response([
            'message' => __('Geotag was successfully updated.'),
        ]);
    }

    /**
     * Delete geotags.
     *
     * @param  DestroyGeoTagRequest  $request
     * @return JsonResponse
     */
    public function destroy(DestroyGeoTagRequest $request): JsonResponse
    {
        $request->user()->geoTags()->where('id', $request->geotag_id)->delete();

        return $this->response([
            'geotags' => GeoTagResource::collection($request->user()->geoTags()->get()),
            'message' => __('Geotag was successfully deleted.'),
        ]);
    }
}
