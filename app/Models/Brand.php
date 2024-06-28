<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    use HasFactory; 
    protected $fillable = [ 
        'name','slug','description','title','banner','type','meta_title','meta_description','meta_keywords',
    ]; 

    public function brandGalleries(){
        return $this->hasMany(BrandGallery::class);
    }
    public function watchCollections(){
        return $this->hasMany(WatchCollection::class);
    }
}
