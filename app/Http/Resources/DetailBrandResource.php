<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetailBrandResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $parentDatas =  parent::toArray($request);

        $moreDatas = [
            'banners' => $this->whenLoaded('brandGalleries'),
            'collections' => $this->whenLoaded('watchCollections'),
        ];
        return array_merge($parentDatas, $moreDatas);
    }
}
