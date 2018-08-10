<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script
            src="https://code.jquery.com/jquery-3.2.1.js"
            integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
            crossorigin="anonymous"></script>

    <script type="text/javascript" src="assets/js/jquery-ui/jquery.ui.widget.js"></script>
    <script type="text/javascript" src="assets/js/jquery-fileupload/jquery.iframe-transport.js"></script>
    <script type="text/javascript" src="assets/js/jquery-fileupload/jquery.fileupload.js"></script>
</head>
<body>
<?php
/*
if ($_FILES["file"]["error"] > 0){
    echo "Error: " . $_FILES["file"]["error"];
}else{

print_r($_FILES);

    echo "檔案名稱: " . $_FILES["file"]["name"]."<br/>";
    echo "檔案類型: " . $_FILES["file"]["type"]."<br/>";
    echo "檔案大小: " . ($_FILES["file"]["size"] / 1024)." Kb<br />";
    echo "暫存名稱: " . $_FILES["file"]["tmp_name"];

    if (file_exists("upload/" . $_FILES["file"]["name"])){
        echo "檔案已經存在，請勿重覆上傳相同檔案";
    }else{
        move_uploaded_file($_FILES["file"]["tmp_name"],"upload/".$_FILES["file"]["name"]);
    }
}
*/
?>
<div>
    <form action="test2.php" method="post" enctype="multipart/form-data">
        <div id="drop">
            拖曳至此上傳

            <input id="fileupload" multiple name="file" type="file" onchange="processSelectedFiles(this)">
        </div>
        <input id="start" type="button" value="開始上傳">
        <div id="progress">
            <div class="bar" style="width: 0%;">
            </div>
            <div class="item">
            </div>
        </div>
        <input type="submit" name="submit" value="aaa">
        <input type='button' id='btnLoad' value='Load' onclick='handleFileSelect();'>
        <div id="editor"></div>
    </form>
</div>


<script>


    function processSelectedFiles(fileInput) {

        var files = fileInput.files;

        var files_arry = [];
        $("#editor").html('')

        for (var i = 0; i < files.length; i++) {

            if(files[i].size > 500000){
                $("#editor").html('')
                $("#fileupload").val('')
                alert("檔案過大");

                return false;
            }else{
                $("#editor")
                    .append(files[i].name+"<br>")
                    .append(files[i].size+"<br>")
                    .append(files[i].type+"<br>")
                    .append(files[i].lastModifiedDate+"<br><br>");

                files_arry.push(files[i])
            }

        }

        console.log(files_arry)
        console.log(fileInput.files)


    }

</script>
</body>
</html>