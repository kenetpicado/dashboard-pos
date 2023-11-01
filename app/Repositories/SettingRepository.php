<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class SettingRepository
{
    public function isCaducable()
    {
        return DB::table('settings')->where('key', 'product_type')->value('value') === 'caducable';
    }

    public function manageColors()
    {
        return DB::table('settings')->where('key', 'colors')->value('value') === 'manage';
    }

    public function getMobile()
    {
        return DB::table('settings')->where('key', 'mobile')->value('value');
    }
}
