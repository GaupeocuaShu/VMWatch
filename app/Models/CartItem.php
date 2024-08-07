<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory; 
    protected $fillable = [
        'cart_id',
        'watch_id',
        'quantity', 
        'total'
    ];
    
    public function watch(){
        return $this->belongsTo(Watch::class);
    }
}
