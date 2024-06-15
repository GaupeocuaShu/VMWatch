<?php

namespace App\Http\Controllers;

use App\Http\Resources\StrapResource;
use App\Models\Strap;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class StrapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $straps = Strap::all();
        return StrapResource::collection($straps);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $strap = Strap::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);
        return new StrapResource($strap);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $strap = Strap::findOrFail($id); 
        $strap->updateOrCreate(['name' => $request->name],['id' => $request->id]);
        return new StrapResource($strap);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $strap = Strap::findOrFail($id); 
        $strap->delete();
        return response(['status' => 'Delete Strap Successfully']);
    }
}
