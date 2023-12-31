<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;

class TransactionRequest extends FormRequest
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
            'note' => 'nullable',
            'client' => 'nullable',
            'discount' => 'nullable',
            'total' => 'required|numeric',
            'products' => 'required|array|min:1',
            'type' => 'required|in:buy,sell',
            'payment' => 'nullable',
        ];
    }
}
