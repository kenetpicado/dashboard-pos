<table>
    <thead>
        <tr>
            <th>Fecha</th>
            <th>{{ $transaction->created_at }}</th>
        </tr>
        <tr>
            <th>Factura</th>
            <th>#{{ $transaction->id }}</th>
        </tr>
        <tr>
            <th>Tipo</th>
            <th>{{ $transaction->type == 'buy' ? 'Compra' : 'Venta' }}</th>
        </tr>
        <tr>
            <th>Estado</th>
            <th>{{ $transaction->status }}</th>
        </tr>
        <tr>
            <th>Responsable</th>
            <th>{{ $transaction->user?->name }}</th>
        </tr>
        <tr>
            <th></th>
            <th></th>
        </tr>
        <tr>
            <th>Item</th>
            <th>SKU</th>
            <th>Medida</th>
            <th>Cantidad</th>
            <th>Importe C$</th>
            <th>Descuento C$</th>
            <th>Subtotal C$</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($transaction->products as $product)
            <tr>
                <td>{{ $product->name }}</td>
                <td>{{ $product->sku }}</td>
                <td>{{ $product->pivot->measure }}</td>
                <td>{{ $product->pivot->quantity }}</td>
                <td>{{ $product->pivot->value }}</td>
                <td>{{ $product->pivot->discount }}</td>
                <td>{{ $product->pivot->total }}</td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                Descuento C$
            </td>
            <td>
                {{ $transaction->discount }}
            </td>
        </tr>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                Total C$
            </td>
            <td>
                {{ $transaction->total }}
            </td>
        </tr>
    </tfoot>
</table>
