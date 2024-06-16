<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature; 
use App\Http\Resources\FeatureResource;  
use Illuminate\Support\Str;
class FeatureController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $features = Feature::orderBy('id','asc')->get(); 
       return FeatureResource::collection($features);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $feature = Feature::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new FeatureResource($feature);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $feature =Feature::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new FeatureResource($feature);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $feature = Feature::findOrFail($id); 
       $feature->delete();
       return response(['status' => 'Delete Feature Successfully']);
   }
}
