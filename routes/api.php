<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CaseColorController;
use App\Http\Controllers\DialColorController;
use App\Http\Controllers\DialShapeController;
use App\Http\Controllers\DialSizeController;
use App\Http\Controllers\EnergyController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\GlassMaterialController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StrapController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WatchCollectionController;
use App\Http\Controllers\WatchController;
use App\Http\Controllers\WaterResistanceLevelController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get("/get-banners",[HomeController::class,'getBanners']); 
Route::get("/get-brands",[HomeController::class,'getBrands']); 
Route::get("/get-display-watches",[HomeController::class,'getDisplayWatches']);
Route::get("/get-detail-watches/{slug}",[HomeController::class,'getDetailWatch']);

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
        // Water Resistance Level API
        Route::apiResource("water-resistance-levels",WaterResistanceLevelController::class); 

        // Energy API
        Route::apiResource("energies",EnergyController::class);         

        // Feature API
        Route::apiResource("features",FeatureController::class);    

        // Watch Collection API
        Route::apiResource("watch-collections",WatchCollectionController::class);   

        // Watch API   
        // Watch Gallery API 
        Route::get("watches/select-options",[WatchController::class,"selectOptions"]);  
        Route::post("watches/save-upload",[WatchController::class,"saveUpload"]);
        Route::get("watches/{watchID}/watch-gallery/{id}/edit",[WatchController::class,"watchGalleryEdit"]);
        Route::put("watches/{watchID}/watch-gallery/{id}/update",[WatchController::class,"watchGalleryUpdate"]);
        Route::delete("watches/{watchID}/watch-gallery/{id}/delete",[WatchController::class,"watchGalleryDelete"]);
        Route::get("watches/{watchID}/watch-gallery",[WatchController::class,"watchGalleryIndex"]);
        // Watch Gallery API 

        // Watch Feature API    
        Route::get("watches/{watchID}/feature-watch",[WatchController::class,"watchFeatureIndex"]);
        Route::put("watches/{watchID}/feature-watch/{id}",[WatchController::class,"watchFeatureUpdateOrCreate"]);
        Route::delete("watches/{watchID}/feature-watch/{id}",[WatchController::class,"watchFeatureDelete"]);
        
        // Watch Feature API   
        

        Route::apiResource("watches",WatchController::class);
        // Watch API   
   
    });
});
