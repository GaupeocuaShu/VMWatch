<?php

namespace App\Http\Resources;

use App\Models\Energy;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WatchResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id, 
            'name' => $this->name, 
            'gender' => $this->gender, 
            'price' => $this->price, 
            'origin' => $this->origin, 
            'stock_quantity' => $this->stock_quantity, 
            'created_at' => $this->created_at,  
            'brand' => $this->whenLoaded('brand',function(){return $this->brand->name;}), 
            'energy' => $this->whenLoaded('energy',function(){return $this->energy->name;}),
        ];
    }
}
