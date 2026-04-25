<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            

            $table->foreignUuid('subscriber_id')
                  ->constrained()
                  ->onDelete('cascade'); 

            $table->string('service'); 
            $table->string('topic');   
            
            $table->json('payload')->nullable(); 
            
            $table->timestamp('expired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};