<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role): Response
    { // Vérifier si l'utilisateur est authentifié
        if (Auth::check()) {
            // Vérifier si le rôle de l'utilisateur correspond au rôle requis
            if (Auth::user()->role === $role) {
                return $next($request);
            }
        }

        // Si l'utilisateur n'a pas le rôle requis, renvoyer une réponse 403
        return response()->json(['error' => 'Unauthorized'], 403);
    }
    }

