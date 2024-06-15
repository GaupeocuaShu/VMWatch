<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DialColor extends Model
{
    use HasFactory;
    protected $fillable = [
        'name','slug',
    ];
}
