// Function to load mods from JSON
async function loadMods() {
    try {
        const response = await fetch('mods.json');
        const modsData = await response.json();
        const modsContainer = document.getElementById('mods');
        
        modsContainer.innerHTML = ''; // Clear container

        modsData.forEach(mod => {
            const card = document.createElement('div');
            card.className = 'mod-card';
            card.setAttribute('data-category', mod.category);

            card.innerHTML = `
                <div class="img-container">
                    <img src="${mod.image}" alt="${mod.name}">
                    ${mod.tag ? `<div class="tag">${mod.tag}</div>` : ''}
                </div>
                <div class="card-info">
                    <h2>${mod.name}</h2>
                    <p>${mod.description}</p>
                    <a href="${mod.download}" class="download" target="_blank">Download</a>
                </div>
            `;
            modsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading mods:", error);
    }
}

// Filter logic
function filterSelection(category) {
    const mods = document.getElementsByClassName("mod-card");
    const links = document.getElementsByClassName("sidebar-link");

    for (let link of links) { link.classList.remove("active"); }
    event.currentTarget.classList.add("active");

    for (let mod of mods) {
        const itemCategory = mod.getAttribute("data-category");
        mod.style.display = (category === "all" || itemCategory === category) ? "block" : "none";
    }
}

// Search logic
function searchMods() {
    const input = document.getElementById("search").value.toLowerCase();
    const mods = document.getElementsByClassName("mod-card");

    for (let mod of mods) {
        const title = mod.querySelector("h2").innerText.toLowerCase();
        mod.style.display = title.includes(input) ? "block" : "none";
    }
}

// Run the loader when page opens
window.onload = loadMods;
