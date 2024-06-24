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
        Schema::create('watch_collections', function (Blueprint $table) {
            $table->id(); 
            $table->string("banner"); 
            $table->string("name"); 
            $table->string("title"); 
            $table->string("watch_id"); 
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('watch_collections');
    }
};
