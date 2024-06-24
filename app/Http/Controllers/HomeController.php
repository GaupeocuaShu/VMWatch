<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner; 
use App\Http\Resources\BannerResource; 
use App\Models\Brand;
use App\Http\Resources\BrandResource;
use App\Http\Resources\DisplayWatchResource;
use App\Models\Watch;

class HomeController extends Controller
{
    public function getBanners() {
        $banners = Banner::all(); 
        return BannerResource::collection($banners);  
    }

    public function getBrands() {
        $brands = Brand::all(); 
        return  BrandResource::collection($brands);
    }

    public function getDisplayWatches() {
        $watches = Watch::with(['energy','dialSize','glassMaterial','watchGalleries'])->get(); 
        return  DisplayWatchResource::collection($watches);
    }
}
