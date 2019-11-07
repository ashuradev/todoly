<?php

namespace App\Http\Controllers;

use App\Http\Resources\TodoResource;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a list of todos.
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

    /**
     * Add a new todo.
     * 
     * @param \Illuminate\Http\Request $request 
     * @return mixed
     */
    public function store(Request $request) 
    {
        $this->validate($request, [
            'description'  => 'required|max:255',
        ]);

        return new TodoResource(
            Todo::create([
                'description'  => $request->description,
            ])
        );
    }
}
