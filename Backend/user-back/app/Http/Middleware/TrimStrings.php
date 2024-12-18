<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrimStrings
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        $request->merge($this->trimStrings($request->all()));

        return $next($request);
    }

    /**
     * Trim all string values in the array.
     *
     * @param  array  $data
     * @return array
     */
    protected function trimStrings(array $data)
    {
        return array_map(function ($value) {
            return is_string($value) ? trim($value) : $value;
        }, $data);
    }
}
