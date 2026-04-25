<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class SubscriptionFactory extends Factory
{
    public function definition(): array
    {
        return [
            'service'    => fake()->randomElement(['Netflix', 'Spotify', 'AWS', 'YouTube']),
            'topic'      => fake()->word(),
            'payload'    => [
                'plan' => fake()->randomElement(['premium', 'basic', 'free']),
                'region' => fake()->countryCode()
            ],
            'expired_at' => fake()->dateTimeBetween('now', '+1 year'),
        ];
    }
}