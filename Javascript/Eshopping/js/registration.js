
//this function written for registring new user into the application
function registeraction(){
  event.preventDefault();
  var userName;
  var email;
  var phoneNumber;
  var password;
  var address;

  userName = document.getElementById("userName").value;
  email = document.getElementById("userEmail").value;
  phoneNumber = document.getElementById("userPhone").value;
  password = document.getElementById("userPassword").value;
  address = document.getElementById("userAddress").value;

  var userobj = {username:userName,userMobile:phoneNumber,userAddress:address,userEmail:email,userPassword:password};

  console.log(JSON.stringify(userobj));
  console.log(userobj);

  var xmlHttp;
        if(window.XMLHttpRequest){
            xmlHttp = new XMLHttpRequest();
        }
        xmlHttp.onreadystatechange=function(){
            if(this.status===201 && this.readyState===4){
              alert('User registered successfully. Please login now.')
              window.location.assign("loginform.html");
            }
        }
    xmlHttp.open('post','http://localhost:3000/users', true);
    xmlHttp.setRequestHeader("Content-type","application/json");
    xmlHttp.send(JSON.stringify(userobj));

}

function loadRegisterForm(){
  window.location.assign("registration.html");
}
