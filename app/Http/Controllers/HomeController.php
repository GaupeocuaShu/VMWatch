<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Banner;
use App\Http\Resources\BannerResource;
use App\Models\Brand;
use App\Http\Resources\BrandResource;
use App\Http\Resources\DetailBrandResource;
use App\Http\Resources\DetailWatchResource;
use App\Http\Resources\DisplayWatchResource;
use App\Models\Watch;

class HomeController extends Controller
{




    public function getDetailWatch(string $slug)
    {
        $watch = Watch::with([
            'energy',
            'dialSize',
            'glassMaterial',
            'watchGalleries',
            'strap',
            'brand',
            'waterResistanceLevel',
            'caseColor',
            'dialColor',
            'dialShape',
            'watchCollection',
            'features'
        ])->where('slug', $slug)->first();
        return new DetailWatchResource($watch);
    }

    public function getDetailBrand(string $slug)
    {
        $brand = Brand::with(['brandGalleries', 'watchCollections'])->where("slug", $slug)->first();
        return new DetailBrandResource($brand);
    }


    // Search by Results
    public function searchResults(Request $request)
    {

        $queries = [];
        foreach ($request->query() as $key => $value) {
            $queries[] = [$key, explode("|", $value)];
        };

        $watchQuery = Watch::query(); // Start with the Watch model query

        foreach ($queries as $feature) {
            [$entity, $slugs] = $feature;

            switch ($entity) {
                case 'brands':
                    $watchQuery->whereHas('brand', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'straps':
                    $watchQuery->whereHas('strap', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'watch_collections':
                    $watchQuery->whereHas('watchCollection', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'energies':
                    $watchQuery->whereHas('energy', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'case_colors':
                    $watchQuery->whereHas('caseColor', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'glass_materials':
                    $watchQuery->whereHas('glassMaterial', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'water_resistance_levels':
                    $watchQuery->whereHas('waterResistanceLevel', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'dial_colors':
                    $watchQuery->whereHas('dialColor', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'dial_sizes':
                    $watchQuery->whereHas('dialSize', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'dial_shapes':
                    $watchQuery->whereHas('dialShape', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                case 'features':
                    $watchQuery->whereHas('features', function ($query) use ($slugs) {
                        $query->whereIn('slug', $slugs);
                    });
                    break;
                default:
                    // Handle other cases or ignore unknown features
                    break;
            }
        }

        $watches = $watchQuery->with([
            'energy',
            'dialSize',
            'glassMaterial',
            'watchGalleries',
            'strap',
            'brand',
            'waterResistanceLevel',
            'caseColor',
            'dialColor',
            'dialShape',
            'watchCollection',
            'features'
        ])->get();
        return DisplayWatchResource::collection($watches);
    }

    // Search By Keys 
    public function searchByKeys(string $keys)
    {
        $watchQuery =  Watch::with([
            'energy',
            'dialSize',
            'glassMaterial',
            'watchGalleries',
            'strap',
            'brand',
            'waterResistanceLevel',
            'caseColor',
            'dialColor',
            'dialShape',
            'watchCollection',
            'features'
        ])->where("name", "like", "%$keys%")->get();
        return DisplayWatchResource::collection($watchQuery);
    }

    public function selectOptions()
    {
        return response([Watch::selectOptions()], 202);
    }
}
