<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource 
{
    public function toArray($request)
    {
        return [
            'description' => $this->description,
            'id'          => $this->id
        ];    
    }
}