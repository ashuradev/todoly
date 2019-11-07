<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * List todos.
     * 
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return TodoResource::collection(
            Todo::where('description', 'LIKE', "%{$request->query('search')}%")
                ->paginate(15)
        );
    }
}
