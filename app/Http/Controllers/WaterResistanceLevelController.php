<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WaterResistanceLevel;
use App\Http\Resources\WaterResistanceLevelResource; 
use Illuminate\Support\Str;
class WaterResistanceLevelController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $waterResistanceLevels = WaterResistanceLevel::orderBy('id','asc')->get(); 
       return WaterResistanceLevelResource::collection($waterResistanceLevels);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $waterResistanceLevel = WaterResistanceLevel::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new WaterResistanceLevelResource($waterResistanceLevel);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $waterResistanceLevels =WaterResistanceLevel::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new WaterResistanceLevelResource($waterResistanceLevels);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $waterResistanceLevels = WaterResistanceLevel::findOrFail($id); 
       $waterResistanceLevels->delete();
       return response(['status' => 'Delete Water Resistance Levek Successfully']);
   }
}
