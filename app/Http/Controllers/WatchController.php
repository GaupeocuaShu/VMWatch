<?php

namespace App\Http\Controllers;

use App\Http\Resources\EditWatchResource;
use App\Http\Resources\FeatureWatchResource;
use App\Http\Resources\WatchGalleryResource;
use App\Http\Resources\WatchResource;
use App\Models\Feature;
use App\Models\FeatureWatch;
use App\Models\Watch;
use App\Traits\ImageHandle;
use Illuminate\Http\Request;
use App\Models\WatchGallery;
use Illuminate\Support\Str;
use function Laravel\Prompts\error;

class WatchController extends Controller
{


    use ImageHandle; 


    public function selectOptions(){
        return response([Watch::selectOptions()],202);
    }

    // Watch Gallery -----------------------------------------------------
    public function saveUpload(Request $request){
            $path = $this->uploadImage($request,'uploads','banner');  
            WatchGallery::create([
                'serial' => $request->serial, 
                'watch_id' => $request->watch_id, 
                'type' => $request->type,
                'banner' => $path
            ]);
            return response(['status' => "success"],200);
    }
    public function watchGalleryEdit(string $watchID,string $id){
        return new WatchGalleryResource(WatchGallery::findOrFail($id));
    }
    public function watchGalleryUpdate(Request $request, string $watchID,string $id){
        $gallery = WatchGallery::findOrFail($id); 
        $path = null;
        if($request->banner) {
            $path = $this->updateImage($request,$gallery->banner,'uploads','banner'); 
        }
        $gallery->update([
            'serial' => $request->serial, 
            'type' => $request->type, 
            'banner' =>  $path ? $path : $gallery->banner
        ]);
        return new WatchGalleryResource($gallery);
    }
    public function watchGalleryIndex(string $watchID){
        $gallery = WatchGallery::where("watch_id",$watchID)->get(); 
        return WatchGalleryResource::collection($gallery);
    }

    public function watchGalleryDelete(string $watchID,string $id){
        $gallery = WatchGallery::findOrFail($id); 
        $this->deleteImage($gallery->banner);
        $gallery->delete(); 
        return response(['status' => 'Delete Gallery Successfully']);
    }

    // Watch Gallery -----------------------------------------------------

    // Watch Feature -----------------------------------------------------
    public function watchFeatureIndex(string $watchID){
        $featureWatch = FeatureWatch::with("feature")->where("watch_id",$watchID)->get(); 
        return FeatureWatchResource::collection($featureWatch);
    }

    public function watchFeatureUpdateOrCreate(Request $request, string $watchID, string $id) { 
        // Get the feature ID by name
        $feature = Feature::where("name", $request->feature_name)->firstOrFail();
        $featureID = $feature->id;
        // Update or create the feature watch
        $featureWatch = FeatureWatch::updateOrCreate(
            ['watch_id' => $watchID, 'feature_id' => $featureID],
            ['id' => $id]
        );
    
        return new FeatureWatchResource($featureWatch);
    }
    public function watchFeatureDelete(string $watchID,string $id){
        $featureWatch = FeatureWatch::findOrFail($id); 
        $featureWatch->delete(); 
        return response(['status' => 'Delete Feature Watch Successfully']);
    }
    // Watch Feature -----------------------------------------------------

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
        
        $watch = Watch::create([...$request->all(),'slug' =>Str::slug($request->name)]); 
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
        $watch->update([...$request->all(),'slug' => Str::slug($request->name)]);
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
