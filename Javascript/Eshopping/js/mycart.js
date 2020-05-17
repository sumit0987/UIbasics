//function to get all previous orders for a specific user
// this function fetched data from json server and displays in tabular clientInformation. This table is created dynamically 
// using javascript
getCartItems();

function getCartItems(){
    //alert('fetching');
    var cartsData;
    //var totalOrderCost;
    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;
    console.log('Logged In User : '+loggedInUser);
    console.log('Logged In User :'+loggedInAs);

    if(loggedInAs!=null && typeof(loggedInAs)!='undefined'){
        document.getElementById('loggedInUserLabel').innerHTML = 'Logged as : '+loggedInAs; 
        var header = document.getElementsByTagName('header')[0];

        var logOutButton = document.getElementById('logout');
        if(logOutButton!=null && typeof(logOutButton)!='undefined'){
            logOutButton.remove();
        }
        var logOutbutton = document.createElement('button');
        logOutbutton.setAttribute("id","logout");
        logOutbutton.setAttribute("class" ,"navitems");
        logOutbutton.addEventListener("click", userLogOut);
        var logOutbuttonText = document.createTextNode('Log Out');
        logOutbutton.appendChild(logOutbuttonText);

        header.appendChild(logOutbutton);

        //document.getElementById('register').style.display === "none";
        

    }

    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
    }
    var header = document.getElementById('myCartHeader');
    if(header!=null && typeof(header)!='undefined'){
        header.remove();
    }

    var httpReq;
    if(window.XMLHttpRequest){
        httpReq = new XMLHttpRequest();
    }else{
        httpReq = new ActiveXObject("");
    }

    httpReq.onreadystatechange=function(){
        //console.log(this.readyState, this.response);
        if(this.readyState===4 && this.status==200){
            //console.log(this.response);
            var h2element = document.createElement('h2');
            h2element.setAttribute("id","myCartHeader");
            var h2elementText = document.createTextNode('Cart Items');
            h2element.appendChild(h2elementText);


            var table = document.createElement('table');
            table.setAttribute("id","dataTable");
            table.setAttribute("name","myTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Cart Id');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('Product Name');
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement('td');
            var headTd3Text = document.createTextNode('Price');
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement('td');
            var headTd4Text = document.createTextNode('Description');
            headTd4.appendChild(headTd4Text);

            var headTd5 = document.createElement('td');
            var headTd5Text = document.createTextNode('Quantity');
            headTd5.appendChild(headTd5Text);

            var headTd6 = document.createElement('td');
            var headTd6Text = document.createTextNode('Remove from cart');
            headTd6.appendChild(headTd6Text);


            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);
            headTr.appendChild(headTd6);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            cartsData = data;
            var datalen = data.length;
            console.log(data);
            for(var i=0; i<datalen; i++){
                console.log(data[i].id,data[i].productName,data[i].price,data[i].productDesc,data[i].quantity);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(data[i].id);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(data[i].productName);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(data[i].price);
                tbodytrtd3.appendChild(td3Text);
               // totalOrderCost = totalOrderCost+parseInt(data[i].price);

                var tbodytrtd4 = document.createElement('td');
                var td4Text = document.createTextNode(data[i].productDesc);
                tbodytrtd4.appendChild(td4Text);

                var tbodytrtd5 = document.createElement('td');
                var td5Text = document.createTextNode(data[i].quantity);
                tbodytrtd5.appendChild(td5Text);

                var tbodytrtd6 = document.createElement('td');
                var td5RemoveCartItemButton = document.createElement("button");
                var td5RemoveCartItemButtonText = document.createTextNode("Remove from cart");
                td5RemoveCartItemButton.setAttribute("class","actionitem");
                td5RemoveCartItemButton.appendChild(td5RemoveCartItemButtonText);
                td5RemoveCartItemButton.addEventListener('click', function(){
                    //alert('delete initiated');
                    var data = this.parentElement.parentElement.cells;
                    console.log('Selected Product : '+ data);
                    var selectedobj = { id: data[0].innerHTML, productName: data[1].innerHTML , price: data[2].innerHTML , productDesc: data[3].innerHTML , quantity: data[4].innerHTML};

                    console.log('STRINGIFY : '+JSON.stringify(selectedobj));
                    console.log("Cart items :"+selectedobj);
                    if (confirm("Are you sure, you want to remove this item?")) {
                    var xmlHttp;
                    if(window.XMLHttpRequest){
                        xmlHttp = new XMLHttpRequest();
                    }
                    xmlHttp.onreadystatechange=function(){
                        if(this.status===200 && this.readyState===4){
                            alert('Cart item removed successfully');
                            getCartItems();
                        }
                    }
                    xmlHttp.open('delete','http://localhost:3000/cartitems/'+data[0].innerHTML, true);
                    xmlHttp.send();
                    }
                })

                tbodytrtd6.appendChild(td5RemoveCartItemButton);

                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);
                tbodytr.appendChild(tbodytrtd3);
                tbodytr.appendChild(tbodytrtd4);
                tbodytr.appendChild(tbodytrtd5);
                tbodytr.appendChild(tbodytrtd6);

                tbody.appendChild(tbodytr);

            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(h2element);
            section.appendChild(table);

            //alert(totalOrderCost);

            var checkoutButtonarea = document.getElementById('submit');
            if(checkoutButtonarea!=null && typeof(checkoutButtonarea!='undefined')){
                checkoutButtonarea.remove();
            }

            var checkOutButton = document.createElement('button');
            var checkOutButtonText = document.createTextNode('Place Order');
            checkOutButton.setAttribute("id","submit");
            checkOutButton.appendChild(checkOutButtonText);

            checkOutButton.addEventListener('click', function(){
                    
                    var products = [];
                    var table1 = document.getElementById('dataTable');
                    console.log('Hello : ' + JSON.stringify(data));
                    var orderObj = {userId : loggedInUser[0].id , 
                        orderDate : new Date() ,
                        orderPrice : "80000" ,
                        address : loggedInUser[0].userAddress ,
                        products : data};
                    
                    var xmlHttp;
                    if(window.XMLHttpRequest){
                        xmlHttp = new XMLHttpRequest();
                    }
                    xmlHttp.onreadystatechange=function(){
                        if(this.status===201 && this.readyState===4){
                            //alert('Order placed successfully');
                            deleteOldCartItems(data);
                            showOrderConfirmationPage();
                        }
                    }
                    xmlHttp.open('post','http://localhost:3000/orders/', true);
                    xmlHttp.setRequestHeader("Content-type","application/json");
                    xmlHttp.send(JSON.stringify(orderObj));
                    
                })


            section.appendChild(checkOutButton);
        }
    }

    httpReq.open('get','http://localhost:3000/cartitems',true);
    httpReq.send();
}

function loadIndexPage(){

}
//to clear sessionStorage and navigate to login page
function userLogOut(){
    sessionStorage.removeItem('user');
    window.location.assign("loginform.html");
}

//navigate to paast orders
function getPastOrders(){
    window.location.assign("previousorders.html");
}


//Once order is placed, delete the cart items associated with that user                        
function deleteOldCartItems(data){
    console.log('data in delete old cart');
    console.log(data);
    for(var i=0; i<data.length;i++){
        console.log('for looop to get cart items');
        console.log(data[i].id);
        var xmlHttp;
            if(window.XMLHttpRequest){
                xmlHttp = new XMLHttpRequest();
            }
            xmlHttp.onreadystatechange=function(){
                if(this.status===200 && this.readyState===4){

            }
    }
    xmlHttp.open('delete','http://localhost:3000/cartitems/'+data[i].id, true);
    xmlHttp.send();
}
//getCartItems();
}