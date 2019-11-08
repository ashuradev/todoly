<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->isMethod('OPTIONS')) $response = response()->json(
            ['method' => 'OPTIONS'], 
            200
        );
        else $response = $next($request);

        return $response
            ->header('Access-Control-Allow-Origin', $_SERVER['HTTP_ORIGIN'])
            ->header('Access-Control-Allow-Methods', 'PUT, POST, DELETE')
            ->header('Access-Control-Allow-Headers', 'Accept, Content-Type,X-CSRF-TOKEN')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}