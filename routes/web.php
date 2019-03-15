<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// use App\User;
Route::get('/{path}', function () {
    return view('welcome');
})->where('path','.*');
// Route::get('/',function(){
//    User::create([
//         'email'=>'al@test.com',
//         'name'=>'alf',
//         'password'=>bcrypt('123456')
//    ]);
// });
