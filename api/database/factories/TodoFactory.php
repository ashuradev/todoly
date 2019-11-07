<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

$factory->define(App\Models\Todo::class, function (Faker\Generator $faker) {
    return [
        'description' => $faker->text(100)
    ];
});