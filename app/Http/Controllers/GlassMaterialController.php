<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GlassMaterial;
use App\Http\Resources\GlassMaterialResource; 
use Illuminate\Support\Str;
class GlassMaterialController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $glassMaterials = GlassMaterial::orderBy('id','asc')->get(); 
       return GlassMaterialResource::collection($glassMaterials);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $glassMaterial = GlassMaterial::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new GlassMaterialResource($glassMaterial);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $glassMaterial = GlassMaterial::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new GlassMaterialResource($glassMaterial);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $glassMaterial = GlassMaterial::findOrFail($id); 
       $glassMaterial->delete();
       return response(['status' => 'Delete Glass Material Successfully']);
   }
}