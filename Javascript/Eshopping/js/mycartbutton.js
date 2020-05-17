//to highlight if any items already added for the particular user
highlightMyCartButton();
function highlightMyCartButton(){
    //alert('highlight');
    var loggedInUser = JSON.parse(sessionStorage.getItem('user'));
    var loggedInAs = loggedInUser[0].id;
    console.log('Logged In User : '+loggedInUser);
    console.log('Logged In User ID  :'+loggedInUser[0].id);
    console.log('Logged In User ID  :'+loggedInUser[0].userName);


    var httpReq;
    if(window.XMLHttpRequest){
        httpReq = new XMLHttpRequest();
    }else{
        httpReq = new ActiveXObject("");
    }

    httpReq.onreadystatechange=function(){

        if(this.status===200 && this.readyState===4){
            var data = JSON.parse(this.response);
            var datalength = data.length;
            console.log(datalength);
            if(datalength>0){
                //alert('carte');
                var  mycartButton = document.getElementById("mycart").innerHTML;
                document.getElementById("mycart").innerHTML = "My Cart("+datalength+")";
                document.getElementById("mycart").style.backgroundColor = "cornflowerblue";
                //document.getElementById("mycart").value="My Cart("+datalength+")";
            }
        }
    }
    httpReq.open('get','http://localhost:3000/cartItems?userId='+loggedInAs,true);
    httpReq.send();

}