<table>
    <thead>
        <tr>
            <th>Fecha</th>
            <th>{{ date('d/m/Y H:i') }}</th>
        </tr>
        <tr>
            <th>Tipo</th>
            <th>Proforma</th>
        </tr>
        <tr>
            <th>Responsable</th>
            <th>{{ auth()->user()->name }}</th>
        </tr>
        <tr>
            <th>Cliente</th>
            <th>{{ $request['client'] }}</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
        </tr>
        <tr>
            <th>Item</th>
            <th>Medida</th>
            <th>Cantidad</th>
            <th>Importe C$</th>
            <th>Descuento C$</th>
            <th>Subtotal C$</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($request['products'] as $product)
            <tr>
                <td>{{ $product['name'] }}</td>
                <td>{{ $product['measure'] }}</td>
                <td>{{ $product['quantity'] }}</td>
                <td>{{ $product['price'] }}</td>
                <td>{{ $product['discount'] }}</td>
                <td>{{ $product['quantity'] * $product['price'] - $product['discount'] }}</td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                Descuento C$
            </td>
            <td>
                {{ $request['discount'] }}
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                Total C$
            </td>
            <td>
                {{ $request['total'] }}
            </td>
        </tr>
    </tfoot>
</table>
