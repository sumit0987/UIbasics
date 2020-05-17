//This function will display order placed confirmation message and the order number
//this is also for clearing up the form elements
function showOrderConfirmationPage(){
    //alert('Hi');
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
    var checkoutButtonarea = document.getElementById('submit');
    if(checkoutButtonarea!=null && typeof(checkoutButtonarea!='undefined')){
        checkoutButtonarea.remove();
    }

    var httpReq;
    if(window.XMLHttpRequest){
        httpReq = new XMLHttpRequest();
    }else{
        httpReq = new ActiveXObject("");
    }

    httpReq.onreadystatechange=function(){
        var data = JSON.parse(this.response);
        console.log(this.response);
        var datalength = data.length;
        console.log(datalength);

        if(this.status===200 && this.readyState===4){
            //alert('inside orderconfirmation');
            var orderId = data[datalength-1].id;
            console.log('order Id : '+orderId);

            var h2element = document.createElement('h2');
            h2element.setAttribute("id","myCartHeader");
            var h2elementText = document.createTextNode('Order place successfully. Your Order Id : '+orderId);
            h2element.appendChild(h2elementText);

            var goToHomeButton = document.createElement('button');
            var goToHomeButtonText = document.createTextNode('Go to home');
            //goToHomeButton.setAttribute("type","button");
            goToHomeButton.setAttribute("id","submit");
            goToHomeButton.appendChild(goToHomeButtonText);
            goToHomeButton.addEventListener('click', function(){
                //alert('index page go');
                window.location.assign("index.html");
            })

            var section = document.getElementsByTagName('section')[0];
            section.appendChild(h2element);
            section.appendChild(goToHomeButton);
        }
    }
    httpReq.open('get','http://localhost:3000/orders',true);
    httpReq.send();

}