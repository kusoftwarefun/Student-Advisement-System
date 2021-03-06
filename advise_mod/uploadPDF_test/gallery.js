function previewImage(file) {
    var galleryId = "gallery";

    var gallery = document.getElementById(galleryId);
  //  var imageType = /image.*/;                                                                                                                                          

 //   if (!file.type.match(imageType)) {                                                                                                                                  
 //       throw "File Type must be an image";                                                                                                                             
 //   }                                                                                                                                                                   

    var thumb = document.createElement("div");
    thumb.classList.add('thumbnail'); // Add the class thumbnail to the created div                                                                                       

    var img = document.createElement("img");
    img.file = file;
    thumb.appendChild(img);
    gallery.appendChild(thumb);

    // Using FileReader to display the image content                                                                                                                      
    var reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
}
var uploadfiles = document.querySelector('#fileinput');
uploadfiles.addEventListener('change', function () {
    var files = this.files;
    for(var i=0; i<files.length; i++){
        previewImage(this.files[i]);
    }

}, false);

function uploadFile(file){
    var url = 'index.php';
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Every thing ok, file uploaded                                                                                                                              
            console.log(xhr.responseText); // handle response.                                                                                                            
        }
                else
                        console.log("ERROR: " + xhr.responseText);
    };
    fd.append("upload_file", file);
    xhr.send(fd);
}
