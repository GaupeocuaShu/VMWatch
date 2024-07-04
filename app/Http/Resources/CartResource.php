<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends DetailWatchResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $additionalData = [   
            'cartItemID' => $this->cartItem->id,
            'quantity' => $this->whenLoaded('cartItem',function() {
                return $this->cartItem->quantity;
            }), 
            'total' => $this->whenLoaded('cartItem',function() {
                return $this->cartItem->total;
            }), 

        ]; 
        return array_merge($data,$additionalData);
    }
}
