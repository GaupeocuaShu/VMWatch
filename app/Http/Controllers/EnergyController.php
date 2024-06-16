<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\EnergyResource;
use App\Models\Energy; 
use Illuminate\Support\Str;
class EnergyController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $energies = Energy::orderBy('id','asc')->get(); 
       return EnergyResource::collection($energies);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $energy = Energy::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new EnergyResource($energy);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $energy =Energy::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new EnergyResource($energy);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $energy = Energy::findOrFail($id); 
       $energy->delete();
       return response(['status' => 'Delete Energy Successfully']);
   }
}
