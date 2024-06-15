<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CaseColorController;
use App\Http\Controllers\DialColorController;
use App\Http\Controllers\DialShapeController;
use App\Http\Controllers\DialSizeController;
use App\Http\Controllers\GlassMaterialController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StrapController;
use App\Http\Controllers\UserController;
use App\Models\User;
use App\Models\WaterResistanceLevel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get("/get-banners",[HomeController::class,'getBanners']); 

// Get current user / authenticated user 

Route::get("authenticated-user",function(){
    return response(["user" => auth()->user()]);
});


Route::middleware('auth:sanctum')->group(function () { 
    // Check Admin 
    Route::get("is-admin", function (Request $request) {
        $isAdmin = $request->user()->role === 'admin';
        return response()->json(['isAdmin' => $isAdmin]);
    }); 


    Route::middleware('role:admin')->group(function() {
        // User API 
        Route::apiResource("users",UserController::class); 


        // Banner API 
        Route::post("banners/preview-upload",[BannerController::class,"previewUpload"]);
        Route::apiResource("banners",BannerController::class); 


        // Brand API 
        Route::apiResource("brands",BrandController::class);  

        // Strap API 
        Route::apiResource("straps",StrapController::class); 

        // Dial Size API 
        Route::apiResource("dial-sizes",DialSizeController::class); 
        
        // Dial Shape API 
        Route::apiResource("dial-shapes",DialShapeController::class); 
        // Dial colors API 
        Route::apiResource("dial-colors",DialColorController::class); 

        // Dial materials API 
        Route::apiResource("glass-materials",GlassMaterialController::class); 
        // Case Color API 
        Route::apiResource("case-colors",CaseColorController::class); 
        // Water Resistance Level
        Route::apiResource("water-resistance-levels",WaterResistanceLevel::class); 
    });
});
