<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/



Route::get('/',[HomeController::class,'index'])->name('home');
Route::get('/product-table', [HomeController::class, 'displayTable'])->name('table.display');
Route::post('/product-table/filter', [HomeController::class, 'displayTable'])->name('table.filter');


//ajax data table
Route::get('/ajax/table',[HomeController::class,'ajaxtable'])->name('ajaxtable');
Route::post('/fatch/data', [HomeController::class, 'fatchajaxdata'])->name('fatch.ajaxdata');











//category
Route::post('/category/save',[CategoryController::class,'catsave'])->name('save.cat');
Route::get('/categories', [CategoryController::class, 'getCategories']);
Route::get('/list/categories', [CategoryController::class, 'listCategories'])->name('categories.list');
Route::delete('/category/delete/{id}', [CategoryController::class, 'catdestroy'])->name('category.delete');
Route::post('/update-category-url',[CategoryController::class,'catupdate'])->name('update.cat');






//product

Route::post('/product/save',[ProductController::class,'productsave'])->name('save.product');
Route::get('/list/product', [ProductController::class, 'listProduct'])->name('product.list');
Route::delete('/product/delete/{id}', [ProductController::class, 'prodestroy'])->name('product.delete');
Route::post('/update-product-url',[ProductController::class,'productupdate'])->name('update.product');




