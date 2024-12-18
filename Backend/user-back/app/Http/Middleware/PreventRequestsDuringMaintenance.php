<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Exceptions\MaintenanceModeException;

class PreventRequestsDuringMaintenance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle($request, Closure $next)
    {
        if ($this->appIsDown()) {
            throw new MaintenanceModeException();
        }

        return $next($request);
    }

    protected function appIsDown()
    {
        return app()->isDownForMaintenance();
    }
}
