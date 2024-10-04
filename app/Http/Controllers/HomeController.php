<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('pages.home');
    }

    public function displayTable(Request $request)
    {
        $sku = $request->sku;
        $categoryId = $request->category;
        $query = Product::with('category');
        if ($categoryId) {
            $query->where('categoryid', $categoryId);
        }
        if ($sku) {
            $query->where('productsku', 'LIKE', '%' . $sku . '%');
        }

        $product = $query->get();
        $category = Category::all();

        return view('pages.producttable', ['product' => $product, 'category' => $category]);
    }

    public function ajaxtable()
    {
        return view('pages.ajaxtable');
    }

    public function fatchajaxdata(Request $request)
{
    $query = Product::with('category');

    if ($request->has('category_id') && $request->category_id != '') {
        $query->where('product.categoryid', $request->category_id);
    }

    if ($request->has('price') && $request->price != '') {
        $query->where('productprice', 'like', '%' . $request->price . '%');
    }
    if ($request->has(key: 'sku') && $request->sku != '') {
        $query->where('productsku', 'like', '%' . $request->sku . '%');
    }
    if ($request->has(key: 'prodate') && $request->prodate != '') {
        $query->where('created_at', 'like', '%' . $request->prodate . '%');
    }

    $productdata = $query->get();

    return response()->json([
        'data' => $productdata
    ]);

}





}

