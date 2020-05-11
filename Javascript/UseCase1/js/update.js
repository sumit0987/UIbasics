createHeaderElementsUpdate();//creates the header for update page
loadUpdateForm();//loads form for updating a record

function lastPage(){
    history.back();
}

function createHeaderElementsUpdate(){
    var header = document.getElementsByTagName('header')[0];

    var header2 = document.createElement('h1');
    var header2Text = document.createTextNode('user information system');
    header2.appendChild(header2Text);

    var backButton = document.createElement('button');
    backButton.setAttribute("id","backButton");
    backButton.setAttribute("class" ,"navitems");
    backButton.addEventListener("click", lastPage);
    var backButtonText = document.createTextNode('Go Back');
    backButton.appendChild(backButtonText);

    header.appendChild(header2);
    header.appendChild(backButton);

}

function loadUpdateForm(){
    //alert('updateForm');
    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
    }

    var section = document.getElementsByTagName('section')[0];

    //var body = document.getElementsByTagName('body')[0];
    var form = document.createElement('form');
    form.setAttribute("id", "updateForm");
    section.appendChild(form);

    var nameLabel = document.createElement('label');
    nameLabel.innerHTML = "Name : ";
    form.appendChild(nameLabel);

    var nameInput = document.createElement('input'); 
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", "name");
    nameInput.setAttribute("id", "userName");
    nameInput.setAttribute("pattern","[A-Za-z ]+");
    nameInput.setAttribute("placeholder","Enter Name");
    form.appendChild(nameInput);

    var nameBreak = document.createElement('br');
    form.appendChild(nameBreak);

    var mobileLabel = document.createElement('label');
    mobileLabel.innerHTML = "Mobile : ";
    form.appendChild(mobileLabel);

    var mobileInput = document.createElement('input'); 
    mobileInput.setAttribute("type", "number");
    mobileInput.setAttribute("name", "mobile");
    mobileInput.setAttribute("id", "userMobile");
    mobileInput.setAttribute("min", "1");
    mobileInput.setAttribute("placeholder","Enter Mobile");
    form.appendChild(mobileInput);

    var mobileBreak = document.createElement('br');
    form.appendChild(mobileBreak);

    var sapLabel = document.createElement('label');
    sapLabel.innerHTML = "Sap Id : ";
    form.appendChild(sapLabel);

    var sapInput = document.createElement('input'); 
    sapInput.setAttribute("type", "number");
    sapInput.setAttribute("name", "sap");
    sapInput.setAttribute("id", "userSapId");
    sapInput.setAttribute("min", "1");
    sapInput.setAttribute("placeholder","Enter Sap Id");
    form.appendChild(sapInput);

    var sapIdBreak = document.createElement('br');
    form.appendChild(sapIdBreak);

    var emailLabel = document.createElement('label');
    emailLabel.innerHTML = "Email : ";
    form.appendChild(emailLabel);

    var emailInput = document.createElement('input'); 
    emailInput.setAttribute("type", "text");
    emailInput.setAttribute("name", "email");
    emailInput.setAttribute("id", "userEmail");
    emailInput.setAttribute("pattern","[a-z0-9._]+@[a-z]+\.[a-z]{3}$");
    emailInput.setAttribute("placeholder","Enter email");
    form.appendChild(emailInput);

    var userIdInput = document.createElement('input'); 
    userIdInput.setAttribute("type", "hidden");
    userIdInput.setAttribute("name", "userId");
    userIdInput.setAttribute("id", "userId");
    form.appendChild(userIdInput);

    var userIdBreak = document.createElement('br');
    form.appendChild(userIdBreak);

    var submit = document.createElement('input');
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "submit");
    submit.setAttribute("id", "submitupdate");
    submit.setAttribute("value", "Update");
    submit.setAttribute("align","center");
    form.appendChild(submit);

    form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateUser();
    
});

    var dataselected = JSON.parse(localStorage.getItem('user'));
    //var dataselected = localStorage.getItem('user');

    console.log(dataselected);

    document.getElementById('userName').value = dataselected.userName;
    document.getElementById('userMobile').value= dataselected.userMobile;
    document.getElementById('userSapId').value= dataselected.userSapId;
    document.getElementById('userEmail').value= dataselected.userEmail;
    document.getElementById('userId').value= dataselected.id;

}

function updateUser(){
    //alert('update initiated');
    var name = document.getElementById("userName").value;
    var mobile = document.getElementById("userMobile").value;
    var sapId = document.getElementById("userSapId").value;
    var email = document.getElementById("userEmail").value;
    var userId = document.getElementById("userId").value;

    var obj = {id:userId,userName:name,userMobile:mobile,userSapId:sapId,userEmail:email};

    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       console.log(this.response);
       alert('User record updated successfully');
    }
  };
  xhttp.open("PUT", 'http://localhost:3000/users/'+userId, true);
  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(JSON.stringify(obj));
}