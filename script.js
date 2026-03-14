let allMods = [];

async function loadMods() {
    try {
        const response = await fetch('mods.json?t=' + Date.now());
        allMods = await response.json();
        renderMods(allMods);
    } catch (e) {
        document.getElementById('mods').innerHTML = `<p style="color:red; padding:20px;">Error loading data.</p>`;
    }
}

function renderMods(mods) {
    const container = document.getElementById('mods');
    container.innerHTML = '';
    mods.forEach((mod) => {
        const idx = allMods.findIndex(m => m.name === mod.name);
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.onclick = () => window.location.href = `details.html?id=${idx}`;
        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;">
                <div style="position:absolute; top:12px; left:12px; background:#3498db; color:white; padding:5px 10px; font-size:10px; font-weight:800; border-radius:6px; text-transform:uppercase;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0; font-size:18px; font-weight:700;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:6px 0;">by ${mod.author || 'Royal Renderings'}</p>
                <p style="color:#888; font-size:13px; margin-bottom:15px; line-height:1.4;">${mod.description.substring(0, 65)}...</p>
                <div style="display:block; text-align:center; background:#3498db; color:white; padding:12px; border-radius:10px; font-weight:700; font-size:14px;">View Mod</div>
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
    const filtered = cat === 'all' ? allMods : allMods.filter(m => m.category.toLowerCase() === cat.toLowerCase());
    renderMods(filtered);
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    renderMods(allMods.filter(m => m.name.toLowerCase().includes(term)));
}

window.onload = loadMods;
