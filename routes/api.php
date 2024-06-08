<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/ 



Route::middleware('auth:sanctum')->group(function () {
    Route::get("is-admin", function (Request $request) {
        $isAdmin = $request->user()->role === 'admin';
        return response()->json(['isAdmin' => $isAdmin]);
    }); 


    // User API 
    //  ------- FETCH USER--------------- 
    Route::apiResource("users",UserController::class);
});
