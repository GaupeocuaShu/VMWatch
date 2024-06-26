<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchCollection extends Model
{
    use HasFactory; 
    protected $fillable = [
        'banner','name','title','description','slug','brand_id'
    ];
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
}
