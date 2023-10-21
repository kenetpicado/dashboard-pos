<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InventoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'measure' => ['required', 'string'],
            'quantity' => ['required', 'numeric'],
            'unit_cost' => ['required', 'numeric'],
            'unit_price' => ['required', 'numeric'],
        ];
    }
}
