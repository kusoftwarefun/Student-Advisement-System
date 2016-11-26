<!doctype html>
<html lang="en">
<head>
<script>

</script>
    <meta charset="UTF-8">
    <title>Preview images</title>
    <style>
        #gallery .thumbnail{                                                                                                                                              
            width:150px;
            height: 150px;
            float:left;
            margin:2px;
        }
        #gallery .thumbnail img{                                                                                                                                          
            width:150px;
            height: 150px;
        }

    </style>
</head>
<body>
<h2>Upload images ...</h2>

<input type="file" id="fileinput" />

<div id="gallery"></div>
<script>
document.getElementById('fileinput').addEventListener('change', function(){
    for(var i = 0; i<this.files.length; i++){
        var file =  this.files[i];
        console.group("File "+i);
        console.log("name : " + file.name);
        console.log("size : " + file.size);
        console.log("type : " + file.type);
        console.log("date : " + file.lastModified);
        console.groupEnd();
    }
}, false);
</script>
<script src="gallery.js"></script>
<?php
if (isset($_FILES['upload_file'])) {
    if(move_uploaded_file($_FILES['upload_file']['tmp_name'], "datas/" . $_FILES['upload_file']['name'])){
        echo $_FILES['upload_file']['name']. " OK";
    } else {
        echo $_FILES['upload_file']['name']. " KO";
    }
    exit;
} else {
    echo "No files uploaded ...";
}
?>
</body>
</html>
