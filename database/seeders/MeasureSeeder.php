<?php

namespace Database\Seeders;

use App\Models\Measure;
use Illuminate\Database\Seeder;

class MeasureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Measure::create([
            'name' => 'UNIDAD',
        ]);
    }
}
