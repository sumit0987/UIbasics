createHeaderElementsHome();//creates the header for home page


function createHeaderElementsHome(){
    var header = document.getElementsByTagName('header')[0];

    var header2 = document.createElement('h1');
    var header2Text = document.createTextNode('user information system');
    header2.appendChild(header2Text);

    var addbutton = document.createElement('button');
    addbutton.setAttribute("id","addUser");
    addbutton.setAttribute("class" ,"navitems");
    addbutton.addEventListener("click", addUserForm);
    var addbuttonText = document.createTextNode('add user');
    addbutton.appendChild(addbuttonText);

    var listbutton = document.createElement('button');
    listbutton.setAttribute("id","userlist");
    listbutton.setAttribute("class" ,"navitems");
    listbutton.addEventListener("click", displayUsers);
    var listbuttonText = document.createTextNode('user list');
    listbutton.appendChild(listbuttonText);

    header.appendChild(header2);
    header.appendChild(addbutton);
    header.appendChild(listbutton);

}

function addUserForm(){

    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
    }

    var section = document.getElementsByTagName('section')[0];

    // var h2 = document.createElement('h2');
    // var h2Text = document.createTextNode("Add User");

    // h2.appendChild(h2Text);
    // section.appendChild(h2);
    // section.appendChild(document.createElement('hr'));

    var form = document.createElement('form');
    form.setAttribute("id", "userForm");
    //form.setAttribute("method", "post"); 
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

    var emailBreak = document.createElement('br');
    form.appendChild(emailBreak);

    var submit = document.createElement('input');
    submit.setAttribute("type", "submit");
    submit.setAttribute("name", "submit");
    submit.setAttribute("id", "submitadd");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("align","center");
    form.appendChild(submit);

    form.addEventListener('submit', (event) => {
    event.preventDefault();
    saveUserForm();
});

}

function saveUserForm(){
    //alert('save initiated');
    var name = document.getElementById("userName").value;
    var mobile = document.getElementById("userMobile").value;
    var sapId = document.getElementById("userSapId").value;
    var email = document.getElementById("userEmail").value;

    var obj = {userName:name,userMobile:mobile,userSapId:sapId,userEmail:email};

    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       console.log(this.response);
       alert('User saved successfully');
       displayUsers();
    }
  };
  xhttp.open("POST", "http://localhost:3000/users", true);
  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(JSON.stringify(obj));
}

function displayUsers(){
    var form = document.getElementById('userForm');
    if(form!=null && typeof(form)!='undefined'){
        form.remove();
    }

    var dataTable = document.getElementById('dataTable');
    if(dataTable!=null && typeof(dataTable)!='undefined'){
        dataTable.remove();
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
            var table = document.createElement('table');
            table.setAttribute("id","dataTable");
            table.setAttribute("name","myTable");
            var tbody = document.createElement('tbody');
            var thead = document.createElement('thead');

            var headTr = document.createElement('tr');
            var headTd1 = document.createElement('td');
            var headTd1Text = document.createTextNode('UserId');
            headTd1.appendChild(headTd1Text);

            var headTd2 = document.createElement('td');
            var headTd2Text = document.createTextNode('UserName');
            headTd2.appendChild(headTd2Text);

            var headTd3 = document.createElement('td');
            var headTd3Text = document.createTextNode('Phone No');
            headTd3.appendChild(headTd3Text);

            var headTd4 = document.createElement('td');
            var headTd4Text = document.createTextNode('Sap Id');
            headTd4.appendChild(headTd4Text);

            var headTd5 = document.createElement('td');
            var headTd5Text = document.createTextNode('Email');
            headTd5.appendChild(headTd5Text);

            var headTd6 = document.createElement('td');
            var headTd6Text = document.createTextNode('Action');
            headTd6.appendChild(headTd6Text);

            headTr.appendChild(headTd1);
            headTr.appendChild(headTd2);
            headTr.appendChild(headTd3);
            headTr.appendChild(headTd4);
            headTr.appendChild(headTd5);
            headTr.appendChild(headTd6);

            thead.appendChild(headTr);

            var data = JSON.parse(this.response);
            var datalen = data.length;
            console.log(data);
            for(var i=0; i<datalen; i++){
                console.log(data[i].userName,data[i].userMobile,data[i].userSapId,data[i].userEmail,data[i].id);
                var tbodytr = document.createElement('tr');

                var tbodytrtd1 = document.createElement('td');
                var td1Text = document.createTextNode(data[i].id);
                tbodytrtd1.appendChild(td1Text);

                var tbodytrtd2 = document.createElement('td');
                var td2Text = document.createTextNode(data[i].userName);
                tbodytrtd2.appendChild(td2Text);

                var tbodytrtd3 = document.createElement('td');
                var td3Text = document.createTextNode(data[i].userMobile);
                tbodytrtd3.appendChild(td3Text);

                var tbodytrtd4 = document.createElement('td');
                var td4Text = document.createTextNode(data[i].userSapId);
                tbodytrtd4.appendChild(td4Text);

                var tbodytrtd5 = document.createElement('td');
                var td5Text = document.createTextNode(data[i].userEmail);
                tbodytrtd5.appendChild(td5Text);

                var tbodytrtd6 = document.createElement('td');
                var td5DeleteButton = document.createElement("button");
                var td5DeleteButtonText = document.createTextNode("Delete");
                td5DeleteButton.setAttribute("class","actionitem");
                td5DeleteButton.appendChild(td5DeleteButtonText);
                td5DeleteButton.addEventListener('click', function(){
                    //alert('delete initiated');
                    if (confirm("Are you sure to delete this record?")) {
                    var data = this.parentElement.parentElement.cells;
                    var id = data[0].innerHTML;
                    console.log('Deleted ID'+id);

                    var xmlHttp;
                    if(window.XMLHttpRequest){
                        xmlHttp = new XMLHttpRequest();
                    }
                    xmlHttp.onreadystatechange=function(){
                        if(this.status===200 && this.readyState===4){
                            alert('Record Deleted successfully');
                            displayUsers();
                        }
                    }
                    xmlHttp.open('DELETE','http://localhost:3000/users/'+id, true);
                    xmlHttp.send();
                    }
                })

                var td5UpdateButton = document.createElement("button");
                var td5UpdateButtonText = document.createTextNode("Update");
                td5UpdateButton.setAttribute("class","actionitem");
                td5UpdateButton.appendChild(td5UpdateButtonText);
                td5UpdateButton.addEventListener('click',function(){
                    //alert('update initiated');
                    var data = this.parentElement.parentElement.cells;
                    console.log('Updated data : '+ data);

                    var updateobj = { id: data[0].innerHTML, userName: data[1].innerHTML , userMobile: data[2].innerHTML , userSapId: data[3].innerHTML , userEmail: data[4].innerHTML};
                    localStorage.setItem('user',JSON.stringify(updateobj));
                    window.location.assign("updateUser.html");
                })

                tbodytrtd6.appendChild(td5DeleteButton);
                tbodytrtd6.appendChild(td5UpdateButton);

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
            section.appendChild(table);

        }
    }

    httpReq.open('get','http://localhost:3000/users',true);
    httpReq.send();
}