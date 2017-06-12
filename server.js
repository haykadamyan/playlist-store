let p = new Promise(function(resolve, reject){
    setTimeout(function() {
        resolve("Resolve");
    }, 0);
});
p.then(function (data) {
    console.log(data);
});
+