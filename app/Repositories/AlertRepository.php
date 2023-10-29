<?php

namespace App\Repositories;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AlertRepository
{
    public function getAll()
    {
        return DB::table('alerts')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function storeFewStock($product_id, $quantity)
    {
        $name = DB::table('products')->where('id', $product_id)->value('name');

        DB::table('alerts')->insert([
            'name' => 'POCAS EXISTENCIAS!',
            'description' => "Quedan $quantity existencias del producto: ".mb_strtoupper($name, 'UTF-8'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    public function storeEmptyStock($product_id)
    {
        $name = DB::table('products')->where('id', $product_id)->value('name');

        DB::table('alerts')->insert([
            'name' => 'EXISTENCIAS AGOTADAS!',
            'description' => 'Se agotaron las existencias del producto: '.mb_strtoupper($name, 'UTF-8'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

    public function destroy($id)
    {
        DB::table('alerts')->where('id', $id)->delete();
    }

    public function countUnread()
    {
        return DB::table('alerts')->whereNull('read_at')->count();
    }

    public function markAllAsRead()
    {
        DB::table('alerts')->update(['read_at' => Carbon::now()]);
    }
}
