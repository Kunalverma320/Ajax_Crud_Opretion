@extends('layouts.default')
@section('title', 'Product Table')
@section('content')

    <div class="container">
        <form action="{{ route('table.filter') }}" method="post">
            @csrf
            <div class="form">
                <label for="category">Category</label>
                <select name="category" class="form-select" id="category">
                    <option value="">--select--</option>
                    @foreach ($category as $cats)
                        <option value="{{ $cats->id }}">{{ $cats->categoryname }}</option>
                    @endforeach
                </select>
                <label for="sku">Sku</label>
                <input type="text" name="sku" class="form-control">

                <ul class="nav justify-content-center">
                    <li class="nav-item">
                      <a class="nav-link active" aria-current="page" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="#">Link</a>
                    </li>

                  </ul>

                <div class="btnclass">
                    <button class="btn btn-primary mt-2" type="submit">Submit</button>
                </div>
            </div>
            <table class="table mt-3">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Price</th>
                        <th scope="col">Sku</th>
                        <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($product as $item)
                        <tr>
                            <th scope="row">{{ $item->id }}</th>
                            <td>{{ $item->productname }}</td>
                            <td>{{ $item->category->categoryname }}</td>
                            <td>{{ $item->productprice }}</td>
                            <td>{{ $item->productsku }}</td>
                            <td>{{ $item->description }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </form>
    </div>

@stop
