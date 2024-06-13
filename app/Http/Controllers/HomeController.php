<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner; 
use App\Http\Resources\BannerResource;
class HomeController extends Controller
{
    public function getBanners() {
        $banners = Banner::all(); 
        return BannerResource::collection($banners);  
    }
}
