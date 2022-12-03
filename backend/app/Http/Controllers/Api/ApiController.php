<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

abstract class ApiController extends Controller
{
    private const STATUS_SUCCESS = 'Success';

    private const STATUS_FAILED = 'Failed';

    /**
     * The api response
     *
     * @param  array  $body
     * @param  int  $code
     * @return JsonResponse
     */
    protected function response(array $body = [], int $code = Response::HTTP_OK): JsonResponse
    {
        $body['status'] = $this->getResponseStatus($code);

        return response()->json($body, $code);
    }

    /**
     * The api error response
     *
     * @param  string  $error
     * @param  int  $code
     * @return JsonResponse
     */
    protected function responseError(string $error = '', int $code = Response::HTTP_UNPROCESSABLE_ENTITY): JsonResponse
    {
        return $this->response(['error' => $error], $code);
    }

    /**
     * Response status.
     *
     * @param $code
     * @return string
     */
    private function getResponseStatus($code): string
    {
        return in_array($code, [Response::HTTP_OK, Response::HTTP_CREATED])
            ? self::STATUS_SUCCESS
            : self::STATUS_FAILED;
    }
}
