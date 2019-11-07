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
                'description' => $request->description,
            ])
        );
    }

    /**
     * Update a todo.
     * 
     * @param \Illuminate\Http\Request $request
     * @param string $id
     * @return mixed
     */
    public function update(Request $request, $id) 
    {
        $todo = Todo::find($id);

        if (! $todo) abort(404);

        $todo->update($request->all());

        return new TodoResource($todo);
    }

    /**
     * Delete a todo.
     * 
     * @param string $id 
     * @return mixed
     */
    public function delete($id)
    {
        $todo = Todo::find($id);

        if (! $todo) abort(404);

        $todo->delete();

        return [
            'message' => 'The todo was deleted with successfully.'
        ];
    }
}
