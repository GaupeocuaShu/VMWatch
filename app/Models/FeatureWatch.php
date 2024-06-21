<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeatureWatch extends Model
{
    use HasFactory; 
    protected $fillable = [
        'watch_id','feature_id',
    ]; 


    public function feature(){
        return $this->belongsTo(Feature::class);
    }
}
