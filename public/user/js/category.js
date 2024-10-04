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



});


