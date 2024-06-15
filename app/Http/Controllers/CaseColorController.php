<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CaseColor;
use App\Http\Resources\CaseColorResource; 
use Illuminate\Support\Str;
class CaseColorController extends Controller
{
    /**
    * Display a listing of the resource.
    */
   public function index()
   {
       $caseColors = CaseColor::orderBy('id','asc')->get(); 
       return CaseColorResource::collection($caseColors);
   }

   /**
    * Store a newly created resource in storage.
    */
   public function store(Request $request)
   {
       $caseColor = CaseColor::create([
           'name' => $request->name,
           'slug' => Str::slug($request->name),
       ]);
       return new CaseColorResource($caseColor);
   }


   /**
    * Update the specified resource in storage.
    */
   public function update(Request $request, string $id)
   {
       $caseColor = CaseColor::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
       return new CaseColorResource($caseColor);
   }

   /**
    * Remove the specified resource from storage.
    */
   public function destroy(string $id)
   {
       $caseColor = CaseColor::findOrFail($id); 
       $caseColor->delete();
       return response(['status' => 'Delete Case Color Successfully']);
   }
}
