<?php

namespace Database\Seeders;

use App\Models\Subscriber;
use App\Models\Subscription;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        
        Subscriber::factory(10)
            ->hasSubscriptions(3) 
            ->create();

        Subscriber::factory()->create([
            'name' => 'Andrey Test',
            'email' => 'andrey@example.com',
        ]);
    }
}