<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    {{-- favicon --}}
    <link rel="icon" href="{{ asset('/shop.png') }}" type="image/x-icon" />
    <meta name="title" content="Inicio - {{ config('app.name', 'Tienda') }}" />
    <meta name="description"
        content="Explora una amplia selección de productos de alta calidad en nuestro catálogo en línea. Descubre las últimas tendencias, ofertas exclusivas y opciones para satisfacer tus necesidades. ¡Compra con comodidad y confianza en nuestra tienda en línea hoy mismo!" />

    <!-- Scripts -->
    @routes
    @vite(['resources/js/app.js', "resources/js/Pages/{$page['component']}.vue"])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-gray-100">
    @inertia
</body>

</html>
