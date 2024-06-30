<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Watch extends Model
{
    use HasFactory; 

    protected $fillable = [
        "name",
        "brand_id",
        'gender',
        'type',
        'price',
        'slug',
        'origin',
        'strap_id',
        'water_resistance_level_id',
        'case_color_id',
        'dial_color_id',
        'dial_size_id',
        'dial_shape_id',
        'watch_collection_id',
        'glass_material_id',
        'energy_id',
        'sku',
        'stock_quantity',
        'description',
        'weight',
        'warranty',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'release_date', 
    ]; 
    public function features(){
        return $this->belongsToMany(Feature::class,'feature_watches');
    }
    public function watchCollection(){
        return $this->belongsTo(WatchCollection::class);
    }
    public function watchGalleries(){
        return $this->hasMany(WatchGallery::class);
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function strap()
    {
        return $this->belongsTo(Strap::class);
    }

    public function waterResistanceLevel()
    {
        return $this->belongsTo(WaterResistanceLevel::class);
    }

    public function caseColor()
    {
        return $this->belongsTo(CaseColor::class);
    }

    public function dialColor()
    {
        return $this->belongsTo(DialColor::class);
    }

    public function dialSize()
    {
        return $this->belongsTo(DialSize::class);
    }

    public function dialShape()
    {
        return $this->belongsTo(DialShape::class);
    }

    public function glassMaterial()
    {
        return $this->belongsTo(GlassMaterial::class);
    }

    public function energy()
    {
        return $this->belongsTo(Energy::class);
    }
    public static function selectOptions()
    {
        return [
            'brands' => Brand::all(['id', 'name','slug']),
            'straps' => Strap::all(['id', 'name','slug']),
            'waterResistanceLevels' => WaterResistanceLevel::all(['id', 'name','slug']),
            'caseColors' => CaseColor::all(['id', 'name','slug']),
            'dialColors' => DialColor::all(['id', 'name','slug']),
            'dialSizes' => DialSize::all(['id', 'name','slug']),
            'dialShapes' => DialShape::all(['id', 'name','slug']),
            'glassMaterials' => GlassMaterial::all(['id', 'name','slug']),
            'energies' => Energy::all(['id', 'name','slug']), 
            'watchCollections' => WatchCollection::all(['id','name','slug']),
        ];
    }
}
