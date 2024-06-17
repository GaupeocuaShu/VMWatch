<?php

namespace App\Http\Controllers;

use App\Http\Resources\EditWatchResource;
use App\Http\Resources\WatchResource;
use App\Models\Watch;
use App\Traits\ImageHandle;
use Illuminate\Http\Request;
use App\Models\WatchGallery;
class WatchController extends Controller
{


    use ImageHandle; 


// Get Select Options 
    public function selectOptions(){
        return response([Watch::selectOptions()],202);
    }

    /**
     * Display a listing of the resource.
     *
     */
    public function previewUpload(Request $request){ 
        

        $path = $this->uploadImage($request,'previews','banner',false);
        return response(["status" => "success","banner" => $path],200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $watches = Watch::with(['brand','energy'])->get(); 
        return WatchResource::collection($watches); 
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $watch = Watch::create($request->all());
        return new WatchResource($watch);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $watch = Watch::findOrFail($id); 
        return new EditWatchResource($watch);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $watch = Watch::findOrFail($id); 
        $watch->update($request->all());
        return new EditWatchResource($watch);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
