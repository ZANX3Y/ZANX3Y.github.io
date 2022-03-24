function docinit() {
    $(document).ready(()=>{
        sbFix(), hideLoader(), hoverMgr(), checkCookies()
    })
}

function sbFix() {
    setTimeout(() => {
        $("#sidebar").toggleClass("visible")
    }, 1000)
}

function hideLoader() {
    $(".loading-overlay").delay(200).fadeOut()
}

function hoverMgr() {
    //cursor hovering osu
    $(".obh").hover(()=>{
        $(".osu-icon").toggleClass("active");
    },()=>{
        $(".osu-icon").toggleClass("active");
    });
    //cursor hovering steam
    $(".sbh").hover(()=>{
        $(".steam-miniprofile").fadeIn(250);
    },()=>{
        $(".steam-miniprofile").fadeOut(250);
    });
    //cursor hovering xbox
    $(".xbh").hover(()=>{
        $(".xiov").fadeIn(250);
    },()=>{
        $(".xiov").fadeOut(250);
    });
    $(".xbh").click(()=> {
        navigator.clipboard.writeText("ZANX3Y");
    });
    //cursor hovering discord
    $(".dbh").hover(()=>{
        $(".diov").fadeIn(250);
    },()=>{
        $(".diov").fadeOut(250);
    });
    $(".dbh").click(()=> {
        navigator.clipboard.writeText("ZANXEY#6889");
    });
    //cursor hovering sb heart
    $(".fa-heart").hover(()=>{
        $(".kov").fadeIn(250);
    },()=>{
        $(".kov").fadeOut(250);
    });
}

checkCookies = () => {
    coinf = "Not like it would change anything, but you should know that this site uses cookies and other storage/tracking technologies.", 
    showNotification("cookiesNotifier", "cookies", "bottom", "Cookies Consent", coinf)
}

function showNotification(nid, ntype, npos, ntitle, ntext) {
    const typeicon = ["fas fa-info", "fas fa-exclamation-triangle", "fas fa-cookie-bite"],
        typebutton = ["fas fa-check", "fas fa-times"],
        colops = ["green", "red", "ni"];
    if (localStorage.getItem(nid+'Confirmed') != 'true') {
        if(ntype=="info"){nicon = typeicon[0]; nbutton = typebutton[1]; ncol = colops[0]}
        else if(ntype=="alert"){nicon = typeicon[1]; nbutton = typebutton[1]; ncol = colops[1]}
        else if(ntype=="cookies"){nicon = typeicon[2]; nbutton = typebutton[0]; ncol = colops[2]}
        $('.page-wrapper').append("<div id=\""+nid+"\" class=\"notification "+ncol+" "+npos+"\" style=\"display: none;\"> <div class=\"notification-content\"> <div class=\"notification-icon\"> <i class=\""+nicon+"\"></i> </div> <div class=\"notification-text\"> <p class=\"notification-title\">"+ntitle+"</p> "+ntext+" </div> </div> <div class=\"notification-close\" onclick=\"hideNotification(\'"+nid+"\');\"> <i class=\""+nbutton+"\"></i> </div> </div>");
        $('#'+nid).delay(1200).fadeIn();
    }
}

function hideNotification(i) {
    localStorage.setItem(i + "Confirmed", "true"), $("#" + i).fadeOut()
}

docinit();
