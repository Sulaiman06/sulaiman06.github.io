const base_api_url = 'http://localhost:8000/api'

function login() {
    var email = document.getElementById('email').value
    var pass = document.getElementById('password').value
    fetch(`${base_api_url}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email : email,
            password : pass
        })
    }).then(response => {
        if(response.ok) {
            response.json().then(data => {
                console.log(data)
                localStorage.setItem('token', data.access_token)
                window.location.href = 'index.html'
            })
        }
    })
}

function getBook() {
    fetch(`${base_api_url}/book`, {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
        }
    }).then((response) => {
        response.json().then((data) => {
            console.log(data)
            buildTable(data.data)
        });
    });
}

function buildTable(data) {
    var table = document.getElementById('myTable')
    for(var i = 0; i < data.length; i++) {
        var row = `<tr id="tr_${data[i].id}"><td>${(i+1)}</td><td>${data[i].id}</td><td>${data[i].name}</td><td>${data[i].author}</td><td>
                        <a href="edit.html?id=${data[i].id}" class="btn btn-default">Edit</a> &nbsp; 
                        <button onclick="destroy(${data[i].id},'${data[i].name}')" class="btn btn-default">Hapus</button>
                    </td></tr>`
        table.innerHTML += row
    }
}

function destroy(id,name) {
    if(confirm('Apakah anda ingin menghapus '+name+'?') == true) {
        fetch(`${base_api_url}/book/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token'),
            }
        }).then(response => {
            response.json().then(data => {
                alert(data.message)
                // document.getElementById('tr_'+id).innerHTML = ""
                document.getElementById('myTable').innerHTML = ""
                getBook()
            })
        })
    }
}

function add() {
    var name = document.getElementById('name').value
    var author = document.getElementById('author').value
    fetch(`${base_api_url}/book`, {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : name,
            author : author
        })
    }).then(response => {
        if(response.ok){
            response.json().then(data => {
                alert(data.message)
                window.location.href = 'index.html'
            })
        }
    })
}

function edit(id) {
    fetch(`${base_api_url}/book/${id}`, {
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
        }
    }).then(response => {
        response.json().then(data => {
            console.log(data)
            document.getElementById('name').value = data.data.name
            document.getElementById('author').value = data.data.author
        })
    })
}

function update(id) {
    var name = document.getElementById('name').value
    var author = document.getElementById('author').value
    fetch(`${base_api_url}/book/${id}`, {
        method: 'PATCH',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : name,
            author : author
        })
    }).then(response => {
        if(response.ok){
            response.json().then(data => {
                alert(data.message)
                window.location.href = 'index.html'
            })
        }
    })
}