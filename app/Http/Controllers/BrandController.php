<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use Illuminate\Http\Request;
use App\Models\Brand;
use App\Traits\ImageHandle;
use Illuminate\Support\Str; 
use App\Models\BrandGallery; 
use App\Http\Resources\BrandGalleryResource;
class BrandController extends Controller
{
    use ImageHandle;
    // Brand Gallery -----------------------------------------------------
    public function saveUpload(Request $request){
        $path = $this->uploadImage($request,'uploads','banner');  
        BrandGallery::create([
            'serial' => $request->serial, 
            'brand_id' => $request->brand_id, 
            'type' => $request->type,
            'banner' => $path
        ]);
        return response(['status' => "success"],200);
}
    public function brandGalleryEdit(string $brandID,string $id){
        return new BrandGalleryResource(BrandGallery::findOrFail($id));
    }
    public function brandGalleryUpdate(Request $request, string $brandID,string $id){
        $gallery = BrandGallery::findOrFail($id); 
        $path = null;
        if($request->banner) {
            $path = $this->updateImage($request,$gallery->banner,'uploads','banner'); 
        }
        $gallery->update([
            'serial' => $request->serial, 
            'type' => $request->type, 
            'banner' =>  $path ? $path : $gallery->banner
        ]);
        return new BrandGalleryResource($gallery);
    }
    
    public function brandGalleryIndex(string $brandID){
        $gallery = BrandGallery::where("brand_id",$brandID)->get(); 
        return BrandGalleryResource::collection($gallery);
    }

    public function brandGalleryDelete(string $brandID,string $id){
        $gallery = BrandGallery::findOrFail($id); 
        $this->deleteImage($gallery->banner);
        $gallery->delete(); 
        return response(['status' => 'Delete Brand Gallery Successfully']);
    }

    // Brand Gallery -----------------------------------------------------
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brands = Brand::all(); 
        return  BrandResource::collection($brands);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $path = $this->uploadImage($request,'uploads','banner'); 
        $banner = Brand::create([
            'name' => $request->name, 
            'banner' => $path, 
            'type' => $request->type, 
            'title' => $request->title, 
            'slug' => Str::slug($request->name),
            'description' => $request->description, 
            'meta_title' => $request->meta_title, 
            'meta_description' => $request->meta_description, 
            'meta_keywords' => $request->meta_keywords, 

        ]);
        return new BrandResource($banner);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Brand::findOrFail($id); 
        return new BrandResource($brand);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brand = Brand::findOrFail($id);  
        $path = null;
        if($request->brand) {
            $path = $this->updateImage($request,$brand->banner,'uploads','banner'); 
        }
        $brand->update([
            'name' => $request->name, 
            'type' => $request->type, 
            'description' => $request->description, 
            'title' => $request->title, 
            'banner' =>  $path ? $path : $brand->banner,
            'meta_title' => $request->meta_title, 
            'meta_description' => $request->meta_description, 
            'meta_keywords' => $request->meta_keywords, 
            'slug' => Str::slug($request->name),
        ]);
        return new BrandResource($brand);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::findOrFail($id); 
        $this->deleteImage($brand->banner);
        $brand->delete(); 
        return response(['status' => 'Delete Brand Successfully']);
    }
}
