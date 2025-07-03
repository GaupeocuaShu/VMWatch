<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\DisplayWatchResource;
use App\Http\Resources\WatchResource;
use App\Models\Watch;
use Illuminate\Http\Request;

class WatchController extends Controller
{
    public function index(Request $request)
    {
        $watches = Watch::with(['energy', 'dialSize', 'glassMaterial', 'watchGalleries']);

        // Apply filters if any
        if ($request->has('type')) {
            $watches->where('gender', $request->input('type'));
        }

        return  DisplayWatchResource::collection($watches->get());
    }
}
