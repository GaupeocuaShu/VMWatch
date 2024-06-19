<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchGallery extends Model
{
    use HasFactory; 
    protected $fillables = [
        'banner','watch_id','type',
    ];
}
