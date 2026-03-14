let allMods = [];

// 1. Load data from mods.json
async function loadMods() {
    try {
        const response = await fetch('mods.json');
        if (!response.ok) throw new Error("Could not find mods.json");
        
        allMods = await response.json();
        renderMods(allMods);
    } catch (error) {
        console.error("Error loading mods:", error);
        const container = document.getElementById('mods');
        if (container) {
            container.innerHTML = `<p style="color:red; padding:20px;">Error loading mods. Check if mods.json exists!</p>`;
        }
    }
}

// 2. Render the cards to the screen
function renderMods(modsToDisplay) {
    const modsContainer = document.getElementById('mods');
    if (!modsContainer) return;

    modsContainer.innerHTML = ''; 

    if (modsToDisplay.length === 0) {
        modsContainer.innerHTML = `<p style="color:#555; padding:20px;">No mods found matching your search.</p>`;
        return;
    }

    modsToDisplay.forEach((mod) => {
        // Find the index of this mod in the main list to use for the Detail Page link
        const originalIndex = allMods.findIndex(m => m.name === mod.name);
        
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.setAttribute('data-category', mod.category.toLowerCase().trim());

        card.innerHTML = `
            <div class="img-container">
                <img src="${mod.image}" alt="${mod.name}">
                ${mod.tag ? `<div class="tag">${mod.tag}</div>` : ''}
            </div>
            <div class="card-info">
                <h2>${mod.name}</h2>
                <p style="color: #3498db; font-size: 13px; margin-bottom: 5px; font-weight: 600;">by ${mod.author || 'Unknown'}</p>
                <p>${mod.description.substring(0, 80)}...</p>
                <a href="details.html?id=${originalIndex}" class="download">View Mod</a>
            </div>
        `;
        modsContainer.appendChild(card);
    });
}

// 3. Category Filter Logic
function filterSelection(category) {
    const links = document.querySelectorAll(".sidebar-link");
    const target = category.toLowerCase().trim();

    // Update active UI state
    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute('onclick').includes(`'${category}'`)) {
            link.classList.add("active");
        }
    });

    // Filter data
    if (target === "all") {
        renderMods(allMods);
    } else {
        const filtered = allMods.filter(mod => mod.category.toLowerCase().trim() === target);
        renderMods(filtered);
    }
}

// 4. Search Bar Logic
function searchMods() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    
    const filtered = allMods.filter(mod => 
        mod.name.toLowerCase().includes(searchTerm) || 
        mod.author.toLowerCase().includes(searchTerm) ||
        mod.description.toLowerCase().includes(searchTerm)
    );

    renderMods(filtered);
}

// Initial Load
window.onload = loadMods;
