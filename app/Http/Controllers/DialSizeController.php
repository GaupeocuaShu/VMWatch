<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DialSize;
use App\Http\Resources\DialResource; 
use Illuminate\Support\Str;
class DialSizeController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dialSizes = DialSize::orderBy('id','asc')->get(); 
        return DialResource::collection($dialSizes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dialSize = DialSize::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);
        return new DialResource($dialSize);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $strap =DialSize::updateOrCreate(['name' => $request->name,'slug' => Str::slug($request->name)],['id' => $id]);
        return new DialResource($strap);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $dialSize = DialSize::findOrFail($id); 
        $dialSize->delete();
        return response(['status' => 'Delete Dial Size Successfully']);
    }
}
