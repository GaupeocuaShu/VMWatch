<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\BrandResource;
use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index(Request $request)
    {
        $brands = Brand::with(['brandGalleries', 'watchCollections']);
        if ($request->has('type')) {
            $brands = $brands->where('type', $request->input('type'));
        }
        return  BrandResource::collection($brands->get());
    }
}
