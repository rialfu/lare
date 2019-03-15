<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;

class LogAfterRequest {

    public function handle($request, Closure $next)
    {
        Log::info($request->fullUrl());

        return $next($request);
    }

}
