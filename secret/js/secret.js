function showsecret(){
    $("#tapsecret").fadeOut("fast");
    setTimeout(function(){
        $("#revsecret").fadeIn("fast");
    },300)
    $(document).ready(
        setTimeout(function(){
            $("#secretoverlay").fadeOut("slow");
            document.getElementById("secretvid").play();
        },3000)
    );
}
