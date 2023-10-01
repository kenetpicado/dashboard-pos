<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                "name" => "Essnce 4 piezas Top tank unicolor",
                "sku" => "sw2106306634173455",
                "image" => "https://us.shein.com/SHEIN-Essnce-4pcs-Solid-Tank-Top-p-3082254-cat-1779.html?src_identifier=on%3DIMAGE_COMPONENT%60cn%3Dcat%60hz%3DhotZone_22%60ps%3D4_9%60jc%3Dreal_2030&src_module=Women&src_tab_page_id=page_home1695436668791&mallCode=1"
            ],
            [
                "name" => "MOD Skort mezclilla unicolor bajo crudo",
                "sku" => "sz2305314845484141",
                "image" => "https://img.ltwebstatic.com/images3_pi/2023/07/07/1688696911e15ff8d5bc5d5d77d2870c6662442603_thumbnail_405x.webp"
            ],
        ];

        foreach ($products as $value) {
            Product::create($value);
        }
    }
}
