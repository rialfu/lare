<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware'=>'auth:api'],function(){
    Route::get('category','Api\CategoryController@Index');
    Route::post('category/store','Api\CategoryController@store');
    Route::delete('category/delete/{id}','Api\CategoryController@destroy');
    Route::get('category/edit/{id}','Api\CategoryController@edit');
    Route::put('category/update/{id}','Api\CategoryController@update');

    Route::get('berita','Api\BeritaController@Index');
    Route::post('berita/store','Api\BeritaController@store');
    Route::delete('berita/delete/{id}','Api\BeritaController@destroy');
    Route::get('berita/edit/{id}','Api\BeritaController@edit');
    Route::post('berita/update/{id}','Api\BeritaController@update');
});

Route::get('category','Api\CategoryController@Index');
Route::post('category/store','Api\CategoryController@store');
Route::delete('category/delete/{id}','Api\CategoryController@destroy');
Route::get('category/edit/{id}','Api\CategoryController@edit');
Route::put('category/update/{id}','Api\CategoryController@update');

Route::get('berita','Api\BeritaController@Index');
Route::post('berita/store','Api\BeritaController@store');
Route::delete('berita/delete/{id}','Api\BeritaController@destroy');
Route::get('berita/edit/{id}','Api\BeritaController@edit');
Route::post('berita/update/{id}','Api\BeritaController@update');
