<?php

namespace App\Http\Controllers;

use App\Http\Resources\BannerResource;
use App\Models\Banner;
use Illuminate\Http\Request;
use App\Traits\ImageHandle;
class BannerController extends Controller
{
    use ImageHandle;
    /**
     * Display a listing of the resource.
     *
     */
    public function previewUpload(Request $request){ 
        
        $path = $this->uploadImage($request,'previews','banner');
        return response(["status" => "success","banner" => $path],200);
    }
    public function index()
    {
        $banners = Banner::all(); 
        return BannerResource::collection($banners);  
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $path = $this->uploadImage($request,'uploads','banner'); 
        $banner = Banner::create([
            'link' => $request->link, 
            'name' => $request->name, 
            'url' => $path, 
            'serial' => $request->serial, 
            'status' => $request->status, 
        ]);
        return new BannerResource($banner);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $banner = Banner::findOrFail($id); 
        return new BannerResource($banner);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $banner = Banner::findOrFail($id);  
        $path = null;
        if($request->banner) {
            $path = $this->updateImage($request,$banner->url,'uploads','banner'); 
        }
        $banner->update([
            'name' => $request->name, 
            'link' => $request->link, 
            'serial' => $request->serial, 
            'status' => $request->status,
            'url' =>  $path ? $path : $banner->url
        ]);
        return new BannerResource($banner);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $banner = Banner::findOrFail($id); 
        $this->deleteImage($banner->url);
        $banner->delete(); 
        return response(['status' => 'Delete Banner Successfully']);
    }
}
