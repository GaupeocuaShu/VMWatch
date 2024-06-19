<?php
namespace App\Traits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
trait ImageHandle{ 


    public function uploadImage(Request $request,$pathName,$inputName,$isClear = true)
    { 
        if($isClear) $this->clearPreviewsImage();
        if($request->hasFile($inputName)){ 
            $image = $request->$inputName;
            $imageName = date('Y-m-d')."_".$image->getClientOriginalName();
            $path = $pathName."/".$imageName;
            $image->move(public_path($pathName),$imageName); 
            if(!$isClear) return $path;
            return asset($path);
        }
    }

    public function updateImage(Request $request,$oldAvatar,$pathName,$inputName){ 
        $this->clearPreviewsImage();
        $rootPath = url('').'/';
        $oldPath = Str::replaceFirst($rootPath, '', $oldAvatar); 
        if($request->hasFile($inputName)){ 
            if(File::exists(public_path($oldPath))) File::delete(public_path($oldPath)); 
            $image = $request->$inputName;
            $imageName = date('Y-m-d')."_".$image->getClientOriginalName();
            $path = $pathName."/".$imageName;
            $image->move(public_path($pathName),$imageName);
            return asset($path);
        }
    }
    public function uploadMultiImage(Request $request, $name, $pathName)
    {
        $paths = array();
        $images = $request->$name;
        foreach ($images as $image) {
            $imageName = date("Y-m-d") . "_" . $image->getClientOriginalName();
            $image->move(public_path($pathName), $imageName);
            $path = $pathName . "/" . $imageName;
            $paths[] = $path;
        }
        return $paths;
    }
    public function deleteImage(string $path)
    {
        $rootPath = url('').'/';
        $oldPath = Str::replaceFirst($rootPath, '', $path); 
        if (File::exists(public_path($oldPath))) File::delete(public_path($oldPath));
    } 

    
    public function clearPreviewsImage()
    {
        $files = File::allFiles('previews'); 
        foreach ($files as $file) {
            File::delete($file);
        }
    }
    
    public function moveAllFileFromPreviewsToUploads(){
        $files = File::allFiles('previews'); 
  
        foreach ($files as $file) { 
            $fromPath = public_path('previews/'.$file->getFilename()); 
            $toPath = public_path('uploads/'.$file->getFilename()); 
            File::move($fromPath,$toPath);
        }
    }
}