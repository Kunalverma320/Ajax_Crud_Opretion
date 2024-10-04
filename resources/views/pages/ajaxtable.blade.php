@extends('layouts.default')
@section('title', 'Ajax Table')
@section('content')


    <label for="Category">Category</label>
    <select name="category" class="category" id="category">
    </select>
    <br>
    <label for="price">Price</label>
    <input type="text" name="price" id="price">
    <br>
    <label for="sku">sku</label>
    <input type="text" name="sku" id="sku">
    <label for="sku">Date</label>
    <input type="date" name="prodate" id="prodate">



    <table class="table mt-3">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Sku</th>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
            </tr>
        </thead>
        <tbody id="productdatatable">
        </tbody>
    </table>

    <script>
        $(document).ready(function() {


            function getTableData(category_id,price,sku,prodate) {
                $.ajax({
                    type: "post",
                    url: "{{ route('fatch.ajaxdata') }}",
                    data: {
                        category_id: category_id,
                        price:price,
                        sku:sku,
                        prodate:prodate
                    },
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content')
                    },
                    success: function(response) {
                        var htmlContent = '';
                        response.data.forEach(element => {
                            htmlContent += `
                                <tr>
                                    <td>${element.id}</td>
                                    <td>${element.productname}</td>
                                    <td>${element.category.categoryname}</td>
                                    <td>${element.productprice}</td>
                                    <td>${element.productsku}</td>
                                    <td>${element.description}</td>
                                    <td>${element.created_at}</td>
                                </tr>
                            `;
                        });
                        $('#productdatatable').html(htmlContent);
                    }
                });
            }

            function getCategoryData() {
                $.ajax({
                    type: "get",
                    url: "/categories",
                    success: function(response) {
                        var catHtml = '<option value="">Select</option>';
                        response.forEach(element => {
                            catHtml += `
                                <option value="${element.id}">${element.categoryname}</option>
                            `;
                        });
                        $('.category').html(catHtml);
                    }
                });
            }


            $('#category, #price,#sku,#prodate').on('change keyup', function() {
                var selectedCategory = $('#category').val();
                var price = $('#price').val();
                var sku = $('#sku').val();
                var prodate = $('#prodate').val();
                console.log(prodate);

                getTableData(selectedCategory, price,sku,prodate);
            });



            getTableData();
            getCategoryData();
        });
    </script>

@stop
