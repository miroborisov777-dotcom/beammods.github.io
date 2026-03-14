let allMods = [];

async function loadMods() {
    try {
        // Adding ?t= helps bypass the browser cache
        const response = await fetch('mods.json?t=' + Date.now());
        allMods = await response.json();
        renderMods(allMods);
    } catch (e) {
        console.error("Error loading mods:", e);
    }
}

function renderMods(mods) {
    const container = document.getElementById('mods');
    if (!container) return;
    container.innerHTML = '';
    
    mods.forEach((mod) => {
        const idx = allMods.findIndex(m => m.name === mod.name);
        const card = document.createElement('div');
        
        // Manual styling for the card
        card.style.cssText = "background:#161b22; border-radius:14px; overflow:hidden; border:1px solid #1c2128; cursor:pointer;";
        card.onclick = () => window.location.href = `details.html?id=${idx}`;

        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;">
                <div style="position:absolute; top:10px; left:10px; background:#3498db; color:white; padding:4px 8px; font-size:10px; font-weight:800; border-radius:4px;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0; font-size:18px; color:white; font-family:sans-serif;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:5px 0; font-family:sans-serif;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="color:#888; font-size:13px; margin-bottom:15px; line-height:1.4; font-family:sans-serif;">${mod.description.substring(0, 60)}...</p>
                
                <div style="display:block; background:#3498db; color:white; text-align:center; padding:12px; border-radius:10px; text-decoration:none; font-weight:700; font-size:14px; font-family:sans-serif;">
                    View Mod
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function filterSelection(cat, element) {
    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(l => l.classList.remove('active'));
    if (element) element.classList.add('active');
    renderMods(cat === 'all' ? allMods : allMods.filter(m => m.category.toLowerCase() === cat.toLowerCase()));
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    renderMods(allMods.filter(m => m.name.toLowerCase().includes(term)));
}

window.onload = loadMods;
