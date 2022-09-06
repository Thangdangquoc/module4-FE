let table = document.getElementById("listFood");
let seachName = document.getElementById("search_name");
getAllFood();

function getAllFood(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/food",
        success :function (data) {
            console.log(data)
            displayTable(data);
        }
    })
}
function displayTable(data){
    let result = ""
    for (let i = 0; i < data.length; i++) {
        result +="<tr>"
        result+="<td>"+ i+1 +"</td>"
        result+="<td>"+ data[i].name +"</td>"
        result+="<td>"+ data[i].price +"</td>"
        result+="<td>"+ data[i].description +"</td>"
        result+="<td>"+ data[i].category.name +"</td>"
        result += " <th>"+ '<img  src="'+" ../static/image/" + data[i].imageUrl  +'"  width="100" height="100">' + "</th>"

        result+="<td><button onclick='showEditForm("+data[i].id+")'>Update</button></td>"
        result+="<td><button onclick='deleteComfirm("+data[i].id+")'>Delete</button></td>"
        result+="</tr>"



        // result +='<div class="col-lg-3 col-md-4 col-sm-6 mix vegetables fastfood">\n' +
        //     '                    <div class="featured__item">\n' +
        //     '                        <div class="featured__item__pic set-bg" data-setbg="img/featured/feature-2.jpg">\n' +
        //     '                            <ul class="featured__item__pic__hover">\n' +
        //     '                                <li><a href="#"><i class="fa fa-heart"></i></a></li>' +
        //     '                                <li><a href="#"><i class="fa fa-retweet"></i></a></li>' +
        //     '                                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>' +
        //     '                            </ul>\n' +
        //     '                        </div>\n' +
        //     '                        <div class="featured__item__text">' +
        //     '                            <h6><a href="#">'+data[i].name+'</a></h6>' +
        //     '                            <h5>'+ data[i].price +'</h5>   ' +
        //     '                        </div>\n' +
        //     '                    </div>\n' +
        //     '                </div>'



// // result +="<div class=\"featured__item__pic set-bg\" data-setbg=\"img/featured/feature-2.jpg\">\n"
// result +='<img  src="'+" ../static/image/" + data[i].imageUrl +'"  width="100" height="100">'
// // result +=   "                            <ul class=\"featured__item__pic__hover\">\n"
// // result +=  "                                <li><a href=\"#\"><i class=\"fa fa-heart\"></i></a></li>\n"
// // result += "                                <li><a href=\"#\"><i class=\"fa fa-retweet\"></i></a></li>\n"
// // result +=   "                                <li><a href=\"#\"><i class=\"fa fa-shopping-cart\"></i></a></li>\n"
// result +=   "                            </ul>\n"
// result +=   "                        </div>\n"
// result +=  "                        <div class=\"featured__item__text\">\n"
// result +=    "                            <h6><a onclick='showEditForm("+data[i].id+")'>"+data[i].name+"</a></h6>\n"
// result +=    "                            <h5>"+ data[i].price +"</h5>\n"
// result +=    "                        </div>"
    }
    table.innerHTML = result;

}

function showCreate(){
    $('#exampleModal').modal('show');
    listCategory()
    listUser()
}



function createProduct(){
    let form = new FormData();
    let name = $('#name').val();
    let price = $('#price').val();
    let description = $('#description').val();
    let category = $('#category').val();
    let user = $('#user').val();
    let image = $('#image')[0].files[0];
    let product ={
        name : name,
        price : price,
        description : description,
        category : {
            id : category
        },
        user : {
            id : user
        }

    }
    form.append("file",image)
    form.append("food",new Blob([JSON.stringify(product)],{type : "application/json"}))
    $.ajax({
        type: "POST",
        contentType: false,
        processData: false,
        url: "http://localhost:8080/api/food",
        data: form,
        success:function (){
            getAllFood();
            alert("Tạo thành công!");
            $('#exampleModal').modal('hide');
            document.getElementById("addForm").reset()
        }
    })
    event.preventDefault()
}


function listCategory(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/categories",
        success: function (listCategory){
            result = ""
            for (let i = 0; i < listCategory.length; i++) {
                result += "<option value="+listCategory[i].id+">"+ listCategory[i].name +"</option>"
            }
            document.getElementById("category").innerHTML = result;
            document.getElementById("category1").innerHTML = result;
        }
    })
}
function listUser(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/user",
        success: function (listUser){
            result = ""
            for (let i = 0; i < listUser.length; i++) {
                result += "<option value="+listUser[i].id+">"+ listUser[i].name +"</option>"
            }
            document.getElementById("user").innerHTML = result;
            document.getElementById("user1").innerHTML = result;
        }
    })
}



function deleteComfirm(id){
    let result = confirm("Bạn có muốn xóa không?")
    if (result){
        deleteProduct(id);
    }
}
function deleteProduct(id){
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/api/food/"+ id,
        success: function (){
            getAllFood()
            alert("Xóa thành công")
        }
    })
}

let idProduct;
function showEditForm(id){

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/food/" + id,
        success: function (data) {
            listCategory()
            listUser()
            console.log(id)
            idProduct = data.id;
            document.getElementById("name1").value = data.name
            document.getElementById("price1").value = data.price
            document.getElementById("description1").value = data.description
            document.getElementById("image1").value = data.image
            document.getElementById("category1").value = data.category.name
            document.getElementById("user1").value = data.user.name

        }
    })
    $('#exampleModal1').modal('show');
}



function updateProduct(){
    let form = new FormData();
    let name = $('#name1').val();
    let price = $('#price1').val();
    let description = $('#description1').val();
    let category = $('#category1').val();
    let user = $('#user1').val();
    let image = $('#image1')[0].files[0];
    let product ={
        name : name,
        price : price,
        description : description,
        category : {
            id : category
        },
        user : {
            id : user
        }

    }
    form.append("file",image)
    form.append("food",new Blob([JSON.stringify(product)],{type : "application/json"}))
    $.ajax({
        type: "PUT",
        contentType: false,
        processData: false,
        url: "http://localhost:8080/api/food/" + idProduct,
        data: form,
        success:function (){
            getAllProduct();
            alert("Sửa thành công!");
            $('#exampleModal1').modal('hide');
            document.getElementById("editForm").reset()
        }
    })
    event.preventDefault()
}

function search(){
    $.ajax({
        type:"GET",
        url:"http://localhost:8080/api/food/search-by-name?name="+ seachName.value,
        success :function (data) {
            console.log(data.totalPages)
            console.log(data)
            displayTable(data.content)

        }})}

