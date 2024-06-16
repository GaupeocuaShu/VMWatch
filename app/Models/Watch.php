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
        'price',
        'slug',
        'origin',
        'strap_id',
        'water_resistance_level_id',
        'case_color_id',
        'dial_color_id',
        'dial_size_id',
        'dial_shape_id',
        'glass_material_id',
        'energy',
        'sku',
        'stock_quantity',
        'description',
        'weight',
        'warranty',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'release_date'
    ];

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
            'brands' => Brand::all(['id', 'name']),
            'straps' => Strap::all(['id', 'name']),
            'waterResistanceLevels' => WaterResistanceLevel::all(['id', 'name']),
            'caseColors' => CaseColor::all(['id', 'name']),
            'dialColors' => DialColor::all(['id', 'name']),
            'dialSizes' => DialSize::all(['id', 'name']),
            'dialShapes' => DialShape::all(['id', 'name']),
            'glassMaterials' => GlassMaterial::all(['id', 'name']),
            'energies' => Energy::all(['id', 'name']),
        ];
    }
}
