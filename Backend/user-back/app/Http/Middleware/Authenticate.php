<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next, ...$guards)
    {
        if (Auth::guard($guards)->guest()) {
            throw new AuthenticationException;
        }

        return $next($request);
    }

    /**
     * Récupère le message d'erreur pour une exception d'authentification.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function unauthenticated($request, array $guards)
    {
        return response()->json(['error' => 'Unauthenticated.'], 401);
    }
}
