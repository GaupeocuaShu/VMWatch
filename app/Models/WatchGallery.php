<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchGallery extends Model
{
    use HasFactory;
    protected $fillable = [
        'banner',
        'watch_id',
        'type',
        'serial'
    ];
    public function watch()
    {
        return $this->belongsTo(Watch::class);
    }
}
