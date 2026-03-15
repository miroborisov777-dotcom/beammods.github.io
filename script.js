let allMods = [];

async function loadMods() {
    const container = document.getElementById('mods');
    try {
        // Fetching with a timestamp prevents the browser from showing old, empty data
        const response = await fetch('mods.json?v=' + Date.now());
        
        if (!response.ok) {
            throw new Error("Could not find mods.json in your folder!");
        }

        allMods = await response.json();
        renderMods(allMods);

    } catch (e) {
        console.error("Critical Error:", e);
        container.innerHTML = `<div id="status-msg" style="color:#ff4d4d;">
            ⚠️ Error: ${e.message}<br>
            <small style="color:gray;">Make sure mods.json is in the same folder as index.html</small>
        </div>`;
        alert("Mod Load Error: " + e.message);
    }
}

function renderMods(mods) {
    const container = document.getElementById('mods');
    container.innerHTML = '';
    
    if (!mods || mods.length === 0) {
        container.innerHTML = `<div id="status-msg">No mods found in this category.</div>`;
        return;
    }

    mods.forEach((mod, index) => {
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.onclick = () => window.location.href = `details.html?id=${index}`;
        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/400x225?text=Image+Not+Found'">
                <div style="position:absolute; top:12px; left:12px; background:#3498db; color:white; padding:5px 10px; font-size:10px; font-weight:800; border-radius:6px; text-transform:uppercase;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:15px;">
                <h2 style="margin:0; font-size:17px; font-weight:700;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:4px 0;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="color:#8b949e; font-size:13px; margin-bottom:12px; line-height:1.4;">${mod.description ? mod.description.substring(0, 60) + '...' : 'Premium BeamNG mod.'}</p>
                <div style="display:block; text-align:center; background:#3498db; color:white; padding:10px; border-radius:8px; font-weight:700; font-size:13px;">View Mod</div>
            </div>`;
        container.appendChild(card);
    });
}

function toggleSidebar() {
    document.getElementById('sidebar-menu').classList.toggle('hidden');
}

function filterSelection(cat, element) {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(l => l.classList.remove('active'));
    if (element) element.classList.add('active');
    
    const filtered = (cat === 'all') ? allMods : allMods.filter(m => m.category.toLowerCase() === cat.toLowerCase());
    renderMods(filtered);
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = allMods.filter(m => m.name.toLowerCase().includes(term));
    renderMods(filtered);
}

window.onload = loadMods;
