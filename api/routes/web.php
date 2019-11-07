<?php

/** @var \Laravel\Lumen\Routing\Router $router */

$router->group(['prefix' => 'todos'], function () use ($router) {
    $router->get('/', 'TodoController@index');
    $router->post('/', 'TodoController@store');
    $router->put('/{id}', 'TodoController@update');
    $router->delete('/{id}', 'TodoController@delete');
});