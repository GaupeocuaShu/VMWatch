<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DialShape; 
use App\Http\Resources\DialShapeResource;
use Illuminate\Support\Str;
class DialShapeController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $dialShapes = DialShape::orderBy('id','asc')->get(); 
       return DialShapeResource::collection($dialShapes);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $dialShape = DialShape::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new DialShapeResource($dialShape);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $dialShape =DialShape::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new DialShapeResource($dialShape);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $dialShape = DialShape::findOrFail($id); 
       $dialShape->delete();
       return response(['status' => 'Delete Dial Shape Successfully']);
   }
}
