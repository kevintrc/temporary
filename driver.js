///////// login page ///////////////////////////////////////////

const authenticate = (callback) => {
    var flag = true
    if (document.getElementById("username").value != "admin")
        flag = false
    else if (document.getElementById("password").value != "12345")
        flag = false

    callback(flag);
}

const validate = () => {
    authenticate((flag) => {
        if (flag)
            window.location.href = "main.html";
        else
            alert(`Use \nusername: admin \npassword: 12345`)
    })
}


//////////// main page ////////////////////////////////////

var checkCount = 0;

const checkPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (checkCount == 5) resolve();
        }, 120);
    });
}

const loadJSON = () => {
    document.getElementById("intro").remove();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            const table = document.getElementById('table');
            const properties = Object.getOwnPropertyNames(data[0]);

            var tr = document.createElement('tr');
            properties.forEach((prop, i) => {

                tr.appendChild(document.createElement('th'));
                tr.cells[i].appendChild(document.createTextNode(prop))
            })
            table.appendChild(tr);



            data.forEach((task, j) => {
                var tr = document.createElement('tr');
                properties.forEach((prop, i) => {
                    if (i == 3) {
                        var checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        if (!(checkbox.checked = checkbox.disabled = data[j][prop] == true)) {
                            checkbox.addEventListener("change", (box) => {
                                if (checkbox.checked == true) checkCount++;
                                else checkCount--;
                                checkPromise().then(() => {
                                    alert("Exactly 5 Tasks are complete")
                                })
                            })
                        }
                        var cell = document.createElement("td");
                        cell.appendChild(checkbox)
                        tr.appendChild(cell);
                        return;
                    }

                    tr.appendChild(document.createElement('td'));
                    tr.cells[i].appendChild(document.createTextNode(data[j][prop]))
                })
                table.appendChild(tr);
            })

        }

    };
    xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);
    xhttp.send();
}
