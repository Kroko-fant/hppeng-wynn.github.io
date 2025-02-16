/*
<div class = "headerleft">      
    <a href = "./index.html" class = "nomarginp iconlink tooltip">
        <img src = "/media/icons/new/builder.png" class = "left linkoptions headericon">
            <div class = "tooltiptext center">WynnBuilder</div>
        </img>
    </a>
    <a href = "./crafter.html" class = "nomarginp iconlink tooltip">
        <img src = "/media/icons/new/crafter.png" class = "left linkoptions headericon">
            <div class = "tooltiptext center">WynnCrafter</div>    
        </img>
    </a>
    <a href = "./items.html" class = "nomarginp iconlink tooltip">
        <img src = "/media/icons/new/searcher.png" class = "left linkoptions headericon">
            <div class = "tooltiptext center">WynnAtlas</div>
        </img>
    </a>
    <a href = "./customizer.html" class = "nomarginp iconlink tooltip">
        <img src = "/media/icons/new/custom.png" class = "left linkoptions headericon">
            <div class = "tooltiptext center">WynnCustom</div>
        </img>
    </a> <a href = "./map.html" class = "nomarginp iconlink tooltip">
        <img src = "/media/icons/new/compass.png" class = "left linkoptions headericon">
        </img>
        <div class = "tooltiptext center">WynnGPS</div>
    </a>
</div>
<div class = "headerright">
    <button class = "button" id = "toggle-icon-button" onclick="toggleIcons();">
        Use Old Icons
    </button>
</div>
*/
let header_icon_map_left = new Map([
    ["index",["builder","WynnBuilder"]],
    ["crafter",["crafter","WynnCrafter"]],
    ["items",["searcher","WynnAtlas"]],
    ["customizer",["custom","WynnCustom"]],
    ["map",["compass","WynnGPS"]],
    ["wynnfo/index",["book","Wynnfo"]]
]);

function setHeaders() {
    let headerleft = document.getElementById("headerleft");
    let headerright = document.getElementById("headerright");

    for (const [name,data] of header_icon_map_left) {
        let a_elem = document.createElement("a");
        let img = document.createElement("img");
        let div = document.createElement("div");
        a_elem.classList.add("nomarginp");
        a_elem.classList.add("iconlink");
        a_elem.classList.add("tooltip");
        a_elem.href = "../" + name + ".html";
        img.classList.add("left");
        img.classList.add("linkoptions");
        img.classList.add("headericon");
        img.src = "/media/icons/new/" + data[0] + ".png";
        div.classList.add("tooltiptext");
        div.classList.add("header-tooltip");
        div.classList.add("center");
        div.textContent = data[1];
        a_elem.appendChild(img);
        a_elem.appendChild(div);
        headerleft.appendChild(a_elem);
    }

    let toggle_icon_button = document.createElement("button");
    toggle_icon_button.classList.add("button");
    toggle_icon_button.id = "toggle-icon-button";
    toggle_icon_button.onclick = function() {toggleIcons()};
    toggle_icon_button.textContent = "Use Old Icons";
    headerright.appendChild(toggle_icon_button);

    let reload_div = document.createElement("div");
    let reload_button = document.createElement("button");
    reload_button.classList.add("button");
    reload_button.style.left = '0px';
    reload_button.style.top = '0px';
    reload_button.style.width = '48px';
    reload_button.style.height = '48px';
    reload_button.style.padding = '0px';
    reload_button.onclick = hardReload;
    let reload_img = document.createElement("img");
    reload_img.src = "/media/icons/new/reload.png"
    reload_img.style.width = "100%";
    let reload_tooltip;
    reload_tooltip = createTooltip(reload_tooltip, "p", "Reload", reload_button, ["center","reloadtooltip"]);
    //reload_tooltip.style.position = "relative";
    reload_tooltip.style.left = "-50%";
    reload_tooltip.style.top = "70%";

    reload_div.appendChild(reload_button); 
    reload_button.appendChild(reload_img);
    headerright.appendChild(reload_div);
 

    console.log("Set Header");
}


setHeaders();
