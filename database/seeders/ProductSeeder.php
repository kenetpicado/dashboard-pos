<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => '1 pieza Diadema con diseño de perla artificial & de diamante de imitación al azar fiesta',
                'sku' => 'sh2209254828264814',
                'image' => 'https://img.ltwebstatic.com/images3_pi/2022/09/30/1664525457c195dae8b814a28aa41195b07c8031a2.webp',
            ],
            [
                'name' => 'Faja de fiesta de cumpleaños decorativa',
                'sku' => 'sh2205023336315429',
                'image' => 'https://img.ltwebstatic.com/images3_pi/2022/05/05/165173346948617cf4679b9e560014c8d2cc45f0b5_thumbnail_900x.webp',
            ],
            [
                'name' => '5 piezas Goma de pelo tipo pañuelo',
                'sku' => 'sw2108131233303738',
                'image' => 'https://img.ltwebstatic.com/images3_pi/2021/08/16/16291141144321dc72f1be5566c8312e791d762256_thumbnail_900x.webp',
            ],
            [
                'name' => '6 piezas Goma de pelo tipo pañuelo simple',
                'sku' => 'sc2110300814399313',
                'image' => 'https://img.ltwebstatic.com/images3_pi/2021/11/02/163582082211fbb1a45cb57e073a32db2894d92411_thumbnail_900x.webp',
            ],
            [
                'name' => '1 pieza Botella de agua con estampado de letra de color gradiente',
                'sku' => 'sh2206302929980670',
                'image' => 'https://img.ltwebstatic.com/images3_pi/2022/09/01/166201533742eba78f5f8f3ec2e884bfa83d01fcd1_thumbnail_900x.webp',
            ],
        ];

        foreach ($products as $value) {
            Product::create($value);
        }
    }
}
