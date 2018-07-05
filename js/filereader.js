
function readTextFile(filename) {
    fetch("index.html").then(response => response.text()).then(text => console.log(text));
/*    return new Promise((resolve, reject) => {
        let file = new XMLHttpRequest();
        file.onreadystatechange = function() {
            if (file.readyState === 4) {
                if (file.status === 200 || file.status === 0) {
                    resolve(file.responseText);
                }
            }
        };
        file.open("GET", filename, true);
        reject(file);
    });*/
}

readTextFile();
