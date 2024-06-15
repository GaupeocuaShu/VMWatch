<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DialColor;
use App\Http\Resources\DialColorResource; 
use Illuminate\Support\Str;
class DialColorController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $dialColors = DialColor::orderBy('id','asc')->get(); 
       return DialColorResource::collection($dialColors);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $dialColor = DialColor::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new DialColorResource($dialColor);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $dialColor =DialColor::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new DialColorResource($dialColor);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $dialColor = DialColor::findOrFail($id); 
       $dialColor->delete();
       return response(['status' => 'Delete Dial Color Successfully']);
   }
}