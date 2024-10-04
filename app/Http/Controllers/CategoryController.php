<?php

namespace App\Http\Controllers;

use App\Models\category;
use App\Models\product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function catsave(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'catname' => 'required',
            'catimage' => 'required|image',
            'catstatus' => 'required',
        ]);

        // If validation fails, return errors
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        }


        if ($request->hasFile('catimage')) {
            $imageName = time() . '.' . request()->catimage->getClientOriginalExtension();
            request()->catimage->move(public_path('catimages'), $imageName);
        }


        $category = new category();
        $category->categoryname = $request->catname;
        $category->status = $request->catstatus;
        $category->image = $imageName;
        $category->save();

        if ($category) {
            return response()->json([
                'status'=>200,
                'message' => 'Category Uploaded Successfully'
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'error' => 'Error saving the category. Please try again.'
            ]);
        }
    }

    public function getCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }




    public function listCategories()
    {
        $categories = Category::all();
        return response()->json($categories);
    }



    public function catdestroy($id)
    {
        try {
            $category = category::findOrFail($id);
            unlink(public_path('catimages/' . $category->image));
            $category->delete();
            return response()->json(['success' => 'Category deleted successfully!']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Category deletion failed!'], 500);
        }
    }


        public function catupdate(Request $request)
        {

            $validator=Validator::make($request->all(),[
                'id' => 'required|integer|exists:category,id',
                'categoryname' => 'required|string|max:255',
                'categoryImage' => 'nullable|image',
                'status' => 'required|integer|in:101,102',
            ]);

            if ($validator->fails()) {
               return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
               ]);
            }

            // dd($request);


            $category = category::findOrFail($request->id);
            $category->categoryname = $request->categoryname;
            $category->status = $request->status;
            if ($request->hasFile('categoryImage')) {
                $oldImagePath = public_path('catimages/' . $category->categoryImage);
                if ($category->image && File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }

                $image = $request->file('categoryImage');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('catimages'), $imageName);
                $category->image = $imageName;
            }
            $category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Category updated successfully.']);
        }


        public function productupdate(Request $request)
        {

            $validator=Validator::make($request->all(),[
                'id' => 'required|integer|exists:category,id',
                'categoryname' => 'required|string|max:255',
                'categoryImage' => 'nullable|image',
                'status' => 'required|integer|in:101,102',
            ]);

            if ($validator->fails()) {
               return response()->json([
                'status'=>422,
                'errors'=>$validator->errors()
               ]);
            }

            // dd($request);


            $category = product::findOrFail($request->id);
            $category->categoryname = $request->categoryname;
            $category->status = $request->status;
            if ($request->hasFile('categoryImage')) {
                $oldImagePath = public_path('catimages/' . $category->categoryImage);
                if ($category->image && File::exists($oldImagePath)) {
                    File::delete($oldImagePath);
                }

                $image = $request->file('categoryImage');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('catimages'), $imageName);
                $category->image = $imageName;
            }
            $category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Category updated successfully.']);
        }
}
