const base_api_url = 'http://localhost:8000/api'
function getBook() {
    fetch(`${base_api_url}/book`, {
        headers: {
            'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzAzNjY5MjYzLCJleHAiOjE3MDM2NzI4NjMsIm5iZiI6MTcwMzY2OTI2MywianRpIjoiQmhtVlRaeUhzemIyNlFncCIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.68U0mNW7i3xlqK_pttjg-u-Kj-qskL73OuTgSpSNUxc',
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
        var row = `<tr><td>${data[i].name}</td><td>${data[i].author}</td></tr>`
        table.innerHTML += row
    }
}
getBook()