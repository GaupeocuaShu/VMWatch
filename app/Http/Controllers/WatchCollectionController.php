<?php

namespace App\Http\Controllers;

use App\Http\Resources\WatchCollectionResource;
use App\Models\WatchCollection;
use App\Traits\ImageHandle;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class WatchCollectionController extends Controller
{
    use ImageHandle;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $watchCollections = WatchCollection::all(); 
        return  WatchCollectionResource::collection($watchCollections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $path = $this->uploadImage($request,'uploads','banner'); 
        $banner = WatchCollection::create([
            'name' => $request->name, 
            'banner' => $path, 
            'title' => $request->title, 
            'slug' => Str::slug($request->name),
            'brand_id' => $request->brand_id,
            'description' => $request->description, 
        ]);
        return new WatchCollectionResource($banner);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $watchCollection = WatchCollection::findOrFail($id); 
        return new WatchCollectionResource($watchCollection);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $watchCollection = WatchCollection::findOrFail($id);  
        $path = null;
        if($request->watchCollection) {
            $path = $this->updateImage($request,$watchCollection->banner,'uploads','banner'); 
        }
        $watchCollection->update([
            'name' => $request->name, 
            'title' => $request->title, 
            'description' => $request->description,  
            'slug' => Str::slug($request->name),
            'banner' =>  $path ? $path : $watchCollection->banner,
            'brand_id' => $request->brand_id,

        ]);
        return new WatchCollectionResource($watchCollection);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $watchCollection = WatchCollection::findOrFail($id); 
        $this->deleteImage($watchCollection->banner);
        $watchCollection->delete(); 
        return response(['status' => 'Delete Watch Collection Successfully']);
    }
}
