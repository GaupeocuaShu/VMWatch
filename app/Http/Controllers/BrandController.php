<?php

namespace App\Http\Controllers;

use App\Http\Resources\BrandResource;
use Illuminate\Http\Request;
use App\Models\Brand;
use App\Traits\ImageHandle;
use Illuminate\Support\Str;
class BrandController extends Controller
{
    use ImageHandle;
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
            'slug' => Str::slug($request->name),
            'description' => $request->description, 
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
            'banner' =>  $path ? $path : $brand->url,
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
