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

        if ($request->has('key')) {
            $watches->where(function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->input('key') . '%')
                    ->orWhere('slug', 'like', '%' . $request->input('key') . '%');
            });
        }

        return  DisplayWatchResource::collection($watches->paginate($request->input('limit', 8)));
    }
}
