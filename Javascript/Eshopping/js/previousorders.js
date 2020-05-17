//function to get all previous orders for a specific user
// this function fetched data from json server and displays in tabular clientInformation. This table is created dynamically 
// using javascript
getPastOrders();
loadIndexPage();
function getPastOrders(){

    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].username;
    var loggedInAsId = loggedInUser[0].id;
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

    var orderDetailTable = document.getElementById('orderDetailTable');
    if(orderDetailTable!=null && typeof(orderDetailTable)!='undefined'){
        orderDetailTable.remove();
    }

    var orderDetailHeader = document.getElementById('orderDetailHeader');
    if(orderDetailHeader!=null && typeof(orderDetailHeader)!='undefined'){
        orderDetailHeader.remove();
    }

    var hr = document.getElementsByTagName('hr')[0];
    if(hr!=null && typeof(hr)!='undefined'){
        hr.remove();
    }

    
    var header = document.getElementById('pastOrderHeader');
    if(header!=null && typeof(header)!='undefined'){
        header.remove();
    }

    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
    }

    var pastOrderTable = document.getElementById('pastOrderTable');
    if(pastOrderTable!=null && typeof(pastOrderTable)!='undefined'){
         pastOrderTable.remove();
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
            h2element.setAttribute("id","pastOrderHeader");
            var h2elementText = document.createTextNode('Past Orders');
            h2element.appendChild(h2elementText);

            var table = document.createElement('table');
            table.setAttribute("id","pastOrderTable");
            table.setAttribute("name","pastOrderTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Order Id');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('Order Date');
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement('td');
            var headTd3Text = document.createTextNode('Order Amount');
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement('td');
            var headTd4Text = document.createTextNode('Delivery Address');
            headTd4.appendChild(headTd4Text);

            var headTd5 = document.createElement('td');
            var headTd5Text = document.createTextNode('View Order items');
            headTd5.appendChild(headTd5Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            var datalen = data.length;
            console.log(data);
            for(var i=0; i<datalen; i++){
                console.log(data[i].id,data[i].orderDate,data[i].orderPrice,data[i].address);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(data[i].id);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(data[i].orderDate);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(data[i].orderPrice);
                tbodytrtd3.appendChild(td3Text);

                var tbodytrtd4 = document.createElement('td');
                var td4Text = document.createTextNode(data[i].address);
                tbodytrtd4.appendChild(td4Text);

                var tbodytrtd5 = document.createElement('td');
                var td5ViewDetailsButton = document.createElement("button");
                var td5ViewDetailsButtonText = document.createTextNode("View order items");
                td5ViewDetailsButton.setAttribute("class","actionitem");
                td5ViewDetailsButton.appendChild(td5ViewDetailsButtonText);
                td5ViewDetailsButton.addEventListener('click', function(){
                    //alert('delete initiated');
                     var data = this.parentElement.parentElement.cells;
                     console.log('Selected Order : '+ data);
                     var selectedobj = { id: data[0].innerHTML, orderDate: data[1].innerHTML , orderPrice: data[2].innerHTML , address: data[3].innerHTML};

                     console.log('STRINGIFY : '+JSON.stringify(selectedobj));
                     console.log(selectedobj);
                    
                    var xmlHttp;
                    if(window.XMLHttpRequest){
                        xmlHttp = new XMLHttpRequest();
                    }
                    xmlHttp.onreadystatechange=function(){
                        if(this.status===200 && this.readyState===4){
                            console.log(this.response);
                            var responseObj = JSON.parse(this.response)[0];
                            //console.log(JSON.parse(this.response));
                            console.log(responseObj);
                            var productsarray = responseObj.products;
                            console.log(productsarray[0]);
                            appendOrderDetails(productsarray,data[0].innerHTML);
                            
                        }
                    }
                    xmlHttp.open('get','http://localhost:3000/orders?id='+selectedobj.id, true);
                    xmlHttp.send();
                    
                })

                tbodytrtd5.appendChild(td5ViewDetailsButton);


                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);
                tbodytr.appendChild(tbodytrtd3);
                tbodytr.appendChild(tbodytrtd4);
                tbodytr.appendChild(tbodytrtd5);

                tbody.appendChild(tbodytr);

            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(h2element);
            section.appendChild(table);
        }
    }

    httpReq.open('get','http://localhost:3000/orders?userId='+loggedInAsId,true);
    httpReq.send();
}

function loadIndexPage(){

}

function userLogOut(){
    sessionStorage.removeItem('user');
    window.location.assign("loginform.html");
}
function getCartItems(){
    window.location.assign("mycart.html");
}

function appendOrderDetails(productsarray,orderId){

    var header = document.getElementById('orderDetailHeader');
    if(header!=null && typeof(header)!='undefined'){
        header.remove();
    }

    var form = document.getElementsByTagName('hr')[0];
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var orderDetailTable = document.getElementById('orderDetailTable');
    if(orderDetailTable!=null && typeof(orderDetailTable)!='undefined'){
        orderDetailTable.remove();
    }

    var pastOrderTable = document.getElementsByTagName('br')[0];
    if(pastOrderTable!=null && typeof(pastOrderTable)!='undefined'){
         pastOrderTable.remove();
    }


    var dataArray = productsarray;
    var orderNo = orderId;
    console.log('Order ID : '+orderNo);
            var hrelement = document.createElement('hr');
            var brelement = document.createElement('br');
            var h2element = document.createElement('h2');
            h2element.setAttribute("id","orderDetailHeader");
            var h2elementText = document.createTextNode('Order Details for Order #'+orderNo);
            h2element.appendChild(h2elementText);

            var table = document.createElement('table');
            table.setAttribute("id","orderDetailTable");
            table.setAttribute("name","orderDetailTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('Product Id');
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
            var headTd5Text = document.createTextNode('Ratings');
            headTd5.appendChild(headTd5Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);

            thead.appendChild(headTr);

            var datalen = dataArray.length;
            //console.log(data);
            for(var i=0; i<datalen; i++){
                //console.log(data[i].id,data[i].orderDate,data[i].orderPrice,data[i].address);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(dataArray[i].id);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(dataArray[i].productName);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(dataArray[i].price);
                tbodytrtd3.appendChild(td3Text);

                var tbodytrtd4 = document.createElement('td');
                var td4Text = document.createTextNode(dataArray[i].productDesc);
                tbodytrtd4.appendChild(td4Text);

                var tbodytrtd5 = document.createElement('td');
                var td5Text = document.createTextNode(dataArray[i].quantity);
                tbodytrtd5.appendChild(td5Text);
            
                tbodytr.appendChild(tbodytrtd1);
                tbodytr.appendChild(tbodytrtd2);
                tbodytr.appendChild(tbodytrtd3);
                tbodytr.appendChild(tbodytrtd4);
                tbodytr.appendChild(tbodytrtd5);

                tbody.appendChild(tbodytr);
            }

            table.appendChild(thead);
            table.appendChild(tbody);

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(brelement);
            section.appendChild(hrelement);
            section.appendChild(h2element);
            section.appendChild(table);
}


