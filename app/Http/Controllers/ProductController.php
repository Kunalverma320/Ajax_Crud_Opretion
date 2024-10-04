<?php

namespace App\Http\Controllers;

use App\Models\product;
use App\Models\category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function productsave(Request $request)
    {
        // dd($request);
        $validator=Validator::make($request->all(),[
            'productname'=>'required',
            'category'=>'required',
            'productprice'=>'required',
            'productsku'=>'required',
            'productdis'=>'required',
            'productimage'=>'required'
        ]);

        if ($validator->fails()) {
           return response()->json([
            'status'=>422,
            'errors'=>$validator->errors()
           ]);
        }

        $imageName=null;
        if($request->hasFile('productimage'))
        {
            $imageName = time() . '.' . request()->productimage->getClientOriginalExtension();
            request()->productimage->move(public_path('productimages'), $imageName);
        }
        $product=new product();
        $product->productname=$request->productname;
        $product->categoryid=$request->category;
        $product->productprice=$request->productprice;
        $product->productsku=$request->productsku;
        $product->description=$request->productdis;
        $product->productimage=$imageName;
        $product->save();

        if ($product) {

            return response()->json([
                'status'=>200,
                'message'=>'Product Submited Successfully'
            ]);
        }

    }
    public function listProduct()
    {
        $products = product::with('category')->get();
        return response()->json($products);
    }

    public function prodestroy($id)
    {
        try {
            $prodestroy = product::findOrFail($id);
            unlink(public_path('productimages/' . $prodestroy->productimage));
            $prodestroy->delete();
            return response()->json(['success' => 'Product deleted successfully!']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Product deletion failed!'], 500);
        }
    }


    public function productupdate(Request $request)
    {

        $validator=Validator::make($request->all(),[
            'proid' => 'required|exists:product,id',
            'eproductname' => 'required|string|max:255',
            'ecategory' => 'required',
            'eproductprice' => 'required',
            'eproductsku' => 'required',
            'eproductdis' => 'required',
            'eproductimage' => 'nullable|image'
        ]);

        if ($validator->fails()) {
           return response()->json([
            'status'=>422,
            'errors'=>$validator->errors()
           ]);
        }
        $product = Product::findOrFail($request->proid);
        $product->productname = $request->eproductname;
        $product->categoryid = $request->ecategory;
        $product->productprice = $request->eproductprice;
        $product->productsku = $request->eproductsku;
        $product->description = $request->eproductdis;
        if ($request->hasFile('eproductimage')) {
            $oldImagePath = public_path('productimages/' . $product->eproductimage);
            if ($product->image && File::exists($oldImagePath)) {
                File::delete($oldImagePath);
            }
            $image = $request->file('eproductimage');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('productimages'), $imageName);
            $product->productimage = $imageName;
        }
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'product updated successfully.']);
    }

}
