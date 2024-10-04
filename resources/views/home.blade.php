<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
    {{-- <script src="{{ asset('user/js/style.js') }}"></script> --}}
    <link rel="stylesheet" href="{{asset('user/css/style.css')}}">
    <script src="{{asset('user/js/product.js')}}"></script>
    <script src="{{asset('user/js/category.js')}}"></script>
    <title>Home</title>
</head>

<body>

    <div class="flex">

        <div class="section">

            <h1>Category Entry</h1>
            <form method="post" id="categorysave" enctype="multipart/form-data"
                data-save-url="{{ route('save.cat') }}">
                <span class="text-success-category" id="success-message"></span>
                <br>
                <br>
                <label for="catname">Category Name</label>
                <input type="text" name="catname" id="catname" placeholder="Enter Category Name">
                <br>
                <span class="text-danger" id="catname-error"></span> <!-- Error display -->
                <br>
                <label for="catname">Category Image</label>
                <input type="file" name="catimage" id="catimage">
                <br>
                <span class="text-danger" id="catimage-error"></span> <!-- Error display -->
                <br>
                <label for="catname">Category Status</label>
                <select name="catstatus" id="catstatus">
                    <option value="">select</option>
                    <option value="101">Active</option>
                    <option value="102">Inactive</option>
                </select>
                <br>
                <span class="text-danger" id="catstatus-error"></span> <!-- Error display -->
                <br>
                <button type="submit">Submit</button>
            </form>

        </div>
        <br>
        <br>

        <div class="section">
            <h1>Product Entry</h1>
            <form method="post" id="productsave" enctype="multipart/form-data"
                data-save-url="{{ route('save.product') }}">

                <span class="text-success-product" id="success-message"></span>
                <br>
                <br>
                <label for="productname">Product Name</label>
                <input type="text" name="productname" id="productname" placeholder="Enter Product Name">
                <br>
                <span class="text-danger" id="productname-error"></span>
                <br>
                <label for="category">Category</label>
                <select name="category" class="category" id="category">
                </select>
                <br><span class="text-danger" id="category-error"></span><br>
                <label for="productprice">productprice</label>
                <input type="text" name="productprice" id="productprice" placeholder="Enter Product Price">
                <br><span class="text-danger" id="productprice-error"></span><br>
                <label for="productsku">Product Sku</label>
                <input type="text" name="productsku" id="productsku" placeholder="Enter Product Sku">
                <br><span class="text-danger" id="productsku-error"></span><br>
                <label for="productdis">Discription</label>
                <input type="text" name="productdis" id="productdis" placeholder="Enter Product Discription">
                <br><span class="text-danger" id="productdis-error"></span><br>
                <label for="productimage">Product Image</label>
                <input type="file" name="productimage" id="productimage">
                <br><span class="text-danger" id="productimage-error"></span><br>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>

    <br><br>

    <div class="flex">
        <div class="categorylist" data-url="{{ route('categories.list') }}">
            <span class="text-success-cattable" id="success-message-cattable"></span>
            <span class="text-success-mcat" id="success-message"></span>
            <table style="width:50%">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Category</th>
                        <th>Category Image</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="categorylist">

                </tbody>
            </table>
        </div>


        <div class="productlist" data-url="{{ route('product.list') }}">
            <span class="text-success-protable" id="success-message"></span>
            <span class="success-message-product" id="success-message-product"></span>

            <table style="width:50%">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Product Price</th>
                        <th>Product Sku</th>
                        <th>Product Descrisption</th>
                        <th>Product Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody id="productlist">

                </tbody>
            </table>
        </div>
    </div>


    <!-- Edit Category Modal -->
    <div id="editCategoryModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Category</h2>
            <form id="editCategoryForm" enctype="multipart/form-data">

                <br>
                <input type="hidden" id="categoryId" name="id">
                <label for="categoryName">Category Name:</label>
                <input type="text" id="categoryName" name="categoryname">
                <br>
                <span class="text-success-mcategoryname" id="success-message"></span>
                <label for="categoryImage">Category Image:</label>
                <input type="file" id="categoryImage" name="categoryImage">
                <img id="categoryImagePreview" src="" alt="Image Preview" width="50" style="display:none;">
                <br>
                <span class="text-success-mcategoryImage" id="success-message"></span>
                <br>
                <label for="categoryStatus">Status:</label>
                <select id="categoryStatus" name="status">
                    <option value="101">Active</option>
                    <option value="102">Inactive</option>
                </select>
                <br>
                <span class="text-success-mcategoryStatus" id="success-message"></span>
                <br><br>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    </div>


    <div id="editProductModal" class="modal">
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Edit Product</h2>
            <form id="editProductForm" enctype="multipart/form-data">
                <span class="text-success-product" id="success-message"></span>
                <br>
                <br>
                <input type="hidden" id="proid" name="proid">
                <label for="productname">Product Name</label>
                <input type="text" name="eproductname" id="eproductname" placeholder="Enter Product Name">
                <br>
                <span class="text-danger" id="eproductname-error"></span>
                <br>
                <label for="ecategory">Category</label>
                <select name="ecategory" class="category" id="ecategory">
                </select>
                <br><span class="text-danger" id="category-error"></span><br>
                <label for="productprice">productprice</label>
                <input type="text" name="eproductprice" id="eproductprice" placeholder="Enter Product Price">
                <br><span class="text-danger" id="eproductprice-error"></span><br>
                <label for="productsku">Product Sku</label>
                <input type="text" name="eproductsku" id="eproductsku" placeholder="Enter Product Sku">
                <br><span class="text-danger" id="eproductsku-error"></span><br>
                <label for="productdis">Discription</label>
                <input type="text" name="eproductdis" id="eproductdis" placeholder="Enter Product Discription">
                <br><span class="text-danger" id="eproductdis-error"></span><br>
                <label for="eproductimage">Product Image</label>
                <input type="file" name="eproductimage" id="eproductimage">
                <br>
                <img id="productImagePreview" src="" alt="Image Preview" width="50" style="display:none;">

                <br><span class="text-danger" id="eproductimage-error"></span><br>
                <button type="submit">Submit</button>

            </form>
        </div>
    </div>



</body>

</html>
