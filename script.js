function searchMods() {

let input = document.getElementById("search").value.toLowerCase();
let mods = document.getElementsByClassName("mod-card");

for (let i = 0; i < mods.length; i++) {

let title = mods[i].innerText.toLowerCase();

if (title.includes(input)) {
mods[i].style.display = "";
} else {
mods[i].style.display = "none";
}

}

}
