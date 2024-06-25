<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('watches', function (Blueprint $table) {
            $table->id(); 
            $table->string("name"); 
            $table->string("brand_id"); 
            $table->enum("type",['new_arrival','best_seller','none']); 
            $table->enum("gender",['male','female','unisex','couple']); 
            $table->double("price"); 
            $table->string("slug"); 
            $table->string("origin"); 
            $table->string("strap_id"); 
            $table->string("water_resistance_level_id"); 
            $table->string("watch_collection_id"); 
            $table->string("case_color_id"); 
            $table->string("dial_color_id"); 
            $table->string("dial_size_id"); 
            $table->string("dial_shape_id"); 
            $table->string("glass_material_id"); 
            $table->string("energy_id"); 
            $table->string("sku"); 
            $table->integer("stock_quantity"); 
            $table->text("description"); 
            $table->double("weight"); 
            $table->integer("warranty"); 
            $table->string("meta_title"); 
            $table->text("meta_description"); 
            $table->string("meta_keywords"); 
            $table->timestamp("release_date");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watches');
    }
};
