<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FeatureWatchResource extends JsonResource
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
            'feature_id' => $this->feature_id,
            'feature_name' =>  $this->whenLoaded('feature',function(){return $this->feature->name;}), 
        ];
    }
}
