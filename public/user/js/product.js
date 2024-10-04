$(document).ready(function () {



    $('#productsave').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var saveUrl = $(this).data('save-url');
        $.ajax({
            type: "Post",
            url: saveUrl,
            data: formData,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            processData: false,
            contentType: false,
            success: function (response) {
                $('#success-message-product').text('');
                $('#productname-error').text('');
                $('#productprice-error').text('');
                $('#category-error').text('');
                $('#productsku-error').text('');
                $('#productdis-error').text('');
                $('#productimage-error').text('');
                if (response.status == 200) {
                    $('#success-message-product').text(response.message);
                    listProduct();

                    $('#productsave')[0].reset();

                } else if (response.status == 422) {
                    if (response.errors.productname) {
                        $('#productname-error').text(response.errors.productname[0]);
                    }
                    if (response.errors.productprice) {
                        $('#productprice-error').text(response.errors.productprice[0]);
                    }
                    if (response.errors.category) {
                        $('#category-error').text(response.errors.category[0]);
                    }
                    if (response.errors.productsku) {
                        $('#productsku-error').text(response.errors.productsku[0]);
                    }
                    if (response.errors.productdis) {
                        $('#productdis-error').text(response.errors.productdis[0]);
                    }
                    if (response.errors.productimage) {
                        $('#productimage-error').text(response.errors.productimage[0]);
                    }
                }
            }
        });
    });





    function listProduct() {
        var ProductUrl = $('.productlist').data('url');
        $.ajax({
            type: "get",
            url: ProductUrl,
            success: function (response) {
                let productTable = '';
                response.forEach(function (products) {
                    productTable += `<tr>
                            <td>${products.id}</td>
                            <td>${products.productname}</td>
                            <td>${products.category.categoryname}</td>
                            <td>${products.productprice}</td>
                            <td>${products.productsku}</td>
                            <td>${products.description}</td>
                            <td><img src="productimages/${products.productimage}" alt="image" width="50"></td>
                            <td>
                            <div class="flex">
                            <div class="section">
                            <button class="btn-edit-product" data-id="${products.id}" data-name="${products.productname}" data-catname="${products.category.id}" data-productprice="${products.productprice}" data-image="${products.productimage}" data-productsku="${products.productsku}" data-description="${products.description}">Edit</button>
                            </div>
                             <div class="section">
                            <button class="btn-delete-product" data-id="${products.id}"  >Delete</button>
                            </div>
                            </div>
                            </td>
                          </tr>`;
                });
                $('#productlist').html(productTable);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching Products:', error);
            }
        });
    }
    listProduct();

    $(document).on('click','.btn-edit-product',function (e){
        e.preventDefault();

        var proId = $(this).data('id');
        var proName =$(this).data('name');
        var proImage =$(this).data('image');
        var proCatname =$(this).data('catname');
        var proProductprice =$(this).data('productprice');
        var proProductsku =$(this).data('productsku');
        var proDescription =$(this).data('description');


        $('#proid').val(proId);
        $('#eproductname').val(proName);
        $('#ecategory').val(proCatname);
        $('#eproductprice').val(proProductprice);
        $('#eproductsku').val(proProductsku);
        $('#eproductdis').val(proDescription);
        $('#productImagePreview').attr('src', `productimages/${proImage}`).show();
        $('#editProductModal').show();

    });

    $('#editProductForm').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: '/update-product-url',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                $('.success-message-product').text('');
                $('#eproductname-error').text('');
                $('#eproductprice-error').text('');
                $('#ecategory-error').text('');
                $('#eproductsku-error').text('');
                $('#eproductdis-error').text('');
                $('#eproductimage-error').text('');

                if (response.status == 200) {
                    $('.success-message-product').text(response.message);
                    listProduct();
                    $('#productsave')[0].reset();
                    $('#editProductModal').hide();


                } else if (response.status == 422) {
                    if (response.errors.eproductname) {
                        $('#eproductname-error').text(response.errors.eproductname[0]);
                    }
                    if (response.errors.eproductprice) {
                        $('#eproductprice-error').text(response.errors.eproductprice[0]);
                    }
                    if (response.errors.ecategory) {
                        $('#ecategory-error').text(response.errors.ecategory[0]);
                    }
                    if (response.errors.eproductsku) {
                        $('#eproductsku-error').text(response.errors.eproductsku[0]);
                    }
                    if (response.errors.eproductdis) {
                        $('#eproductdis-error').text(response.errors.eproductdis[0]);
                    }
                    if (response.errors.eproductimage) {
                        $('#eproductimage-error').text(response.errors.eproductimage[0]);
                    }
                }

            },
            error: function (xhr, status, error) {
                console.error('Error updating Product:', error);
            }
        });
    });

    $(document).on('click', '.close', function () {
        $('#editProductModal').hide();
    });

    $(document).on('click', '.btn-delete-product', function (e) {
        e.preventDefault();
        var proId = $(this).data('id');
        if (confirm('Are you sure you want to delete this Product?')) {
            $.ajax({
                type: "DELETE",
                url: `/product/delete/${proId}`,
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    if (response.success) {
                        $('.text-success-protable').text('');
                        listProduct();
                    }

                },
                error: function (xhr, status, error) {
                    console.error('Error deleting Product:', error);
                    alert('Product deletion failed!');
                }
            });
        }
    });

});


