<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
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
            'name' => 'required',
            'sku' => ['required', 'alpha_dash', Rule::unique('products')->ignore($this->id)],
            'description' => 'nullable',
            'image' => ['nullable', 'url'],
            'discount' => 'nullable',
            'inventory' => 'nullable|array',
            'category_id' => 'nullable|exists:categories,id',
            'total' => 'nullable',
        ];
    }
}
