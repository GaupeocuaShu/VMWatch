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
        Schema::create('brands', function (Blueprint $table) {
            $table->id(); 
            $table->string("name"); 
            $table->string("slug"); 
            $table->text("description"); 
            $table->string("main_banner")->nullable(); 
            $table->string("minor_banner")->nullable(); 
            $table->string("meta_title") ;
            $table->string("meta_description") ;
            $table->string("meta_keywords") ;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
