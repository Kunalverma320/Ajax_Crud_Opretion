$(document).ready(function () {
    $('#categorysave').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var saveUrl = $(this).data('save-url');
        $.ajax({
            type: "POST",
            url: saveUrl,
            data: formData,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            processData: false,
            contentType: false,
            success: function (response) {
                $('#success-message-category').text('');
                $('#catname-error').text('');
                $('#catimage-error').text('');
                $('#catstatus-error').text('');
                if (response.status === 200) {
                    $('#success-message-category').text(response.message);
                    // alert(response.message);
                    loadCategories();
                    listCategory();
                    $('#categorysave')[0].reset();
                } else if (response.status === 422) {
                    if (response.errors.catname) {
                        $('#catname-error').text(response.errors.catname[0]);
                    }
                    if (response.errors.catimage) {
                        $('#catimage-error').text(response.errors.catimage[0]);
                    }
                    if (response.errors.catstatus) {
                        $('#catstatus-error').text(response.errors.catstatus[0]);
                    }
                }
            },
            error: function (xhr) {
                console.log(xhr.responseText);
            }
        });
    });


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
    function loadCategories() {
        $.ajax({
            url: '/categories',
            method: 'GET',
            success: function (data) {
                var $categorySelect = $('.category');
                $categorySelect.empty();
                $categorySelect.append('<option value="">Select Category</option>');
                $.each(data, function (index, category) {
                    $categorySelect.append('<option value="' + category.id + '">' +
                        category.categoryname + '</option>');
                });
            },
            error: function () {
                console.error('Failed to fetch categories.');
            }
        });
    }
    loadCategories();

    // category start

    function listCategory() {
        var categoryUrl = $('.categorylist').data('url');
        $.ajax({
            type: "get",
            url: categoryUrl,
            success: function (response) {

                let categoryTable = '';
                response.forEach(function (category) {
                    categoryTable += `<tr>
                            <td>${category.id}</td>
                            <td>${category.categoryname}</td>
                            <td><img src="catimages/${category.image}" alt="image" width="50"></td>
                            <td>${category.status == 101 ? 'Active' : 'Inactive'}</td>
                            <td>
                            <div class="flex">
                                <div class="section">
                                <button class="btn-edit-category" data-id="${category.id}" data-name="${category.categoryname}" data-image="${category.image}" data-status="${category.status}">Edit</button>
                                </div>
                                <div class="section">
                                <button class="btn-delete-category" data-id="${category.id}">Delete</button>
                                </div>
                            </div>
                            </td>
                          </tr>`;
                });
                $('#categorylist').html(categoryTable);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching categories:', error);
            }
        });
    }
    listCategory();

    $(document).on('click', '.btn-edit-category', function (e) {
        e.preventDefault();

        var catId = $(this).data('id');
        var catName = $(this).data('name');
        var catImage = $(this).data('image');
        var catStatus = $(this).data('status');

        $('#categoryId').val(catId);
        $('#categoryName').val(catName);
        $('#categoryImagePreview').attr('src', `catimages/${catImage}`).show();
        $('#categoryStatus').val(catStatus);
        $('#editCategoryModal').show();
    });

    $(document).on('click', '.close', function () {
        $('#editCategoryModal').hide();
    });

    $('#categoryImage').on('change', function () {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#categoryImagePreview').attr('src', e.target.result).show();
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            $('#categoryImagePreview').hide();
        }
    });


    $('#editCategoryForm').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        $.ajax({
            type: "POST",
            url: '/update-category-url',
            data: formData,
            processData: false,
            contentType: false,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            success: function (response) {
                $('.text-success-mcat').text('');
                $('.text-success-mcategoryName').text('');
                $('.text-success-categoryImage').text('');
                $('.text-success-mcategoryStatus').text('');
                if (response.status == 200) {
                    $('.text-success-mcat').text(response.message);
                    $('#editCategoryModal').hide();
                    listCategory();
                    $('#editCategoryForm')[0].reset();

                } else if (response.status == 422) {
                    console.log(response.errors.categoryname);
                    if (response.errors.categoryname) {
                        $('.text-success-mcategoryname').text(response.errors.categoryname[0]);
                    }
                    if (response.errors.categoryImage) {
                        $('.text-success-categoryImage').text(response.errors.categoryImage[0]);
                    }
                    if (response.errors.categoryStatus) {
                        $('.text-success-mcategoryStatus').text(response.errors.categoryStatus[0]);
                    }

                }

            },
            error: function (xhr, status, error) {
                console.error('Error updating category:', error);
            }
        });
    });




    //close

    $(document).on('click', '.btn-delete-category', function (e) {
        e.preventDefault();
        var catId = $(this).data('id');
        if (confirm('Are you sure you want to delete this category?')) {
            $.ajax({
                type: 'DELETE',
                url: `/category/delete/${catId}`,
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content')
                },
                success: function (response) {
                    $('#text-success-cattable').text('');
                    if (response.success) {
                        $('.text-success-cattable').text(response.success);
                        listCategory();
                        loadCategories();
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Error deleting category:', error);
                    alert('Category deletion failed!');
                }
            });
        }

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


