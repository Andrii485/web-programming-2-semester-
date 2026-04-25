<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubscriberRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {

        return [
            'email' => 'required|email|unique:subscribers,email|max:255',
            'name'  => 'required|string|min:2|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'Цей email вже зареєстрований у системі.',
            'email.required' => 'Поле email є обов’язковим для заповнення.',
        ];
    }
}