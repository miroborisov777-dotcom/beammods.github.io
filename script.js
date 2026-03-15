// 1. YOUR CONVERTED GOOGLE SHEET LINK
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1O-ShYPauFxMhzSSMtBtjYNJWiRSucc0yIKweex6fgis/gviz/tq?tqx=out:csv';

let allMods = [];

async function loadMods() {
    const container = document.getElementById('mods');
    try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        // Convert CSV rows into a mod list
        allMods = parseCSV(csvText);
        renderMods(allMods);

    } catch (e) {
        console.error("Sheet Error:", e);
        container.innerHTML = `<div id="status-msg">⚠️ Failed to connect to Google Sheets. Check your 'Publish to Web' settings.</div>`;
    }
}

// INTELLIGENT PARSER: Handles commas inside quotes (like descriptions)
function parseCSV(text) {
    const lines = text.split(/\r?\n/);
    const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim().toLowerCase());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i]) continue;
        
        // Regex to split by comma but ignore commas inside quotes
        const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
        const obj = {};
        
        headers.forEach((header, index) => {
            let val = values[index] || "";
            obj[header] = val.replace(/^"|"$/g, '').trim(); // Remove surrounding quotes
        });
        result.push(obj);
    }
    return result;
}

function renderMods(mods) {
    const container = document.getElementById('mods');
    container.innerHTML = '';
    
    if (mods.length === 0) {
        container.innerHTML = `<div id="status-msg">No mods found.</div>`;
        return;
    }

    mods.forEach((mod) => {
        const card = document.createElement('div');
        card.className = 'mod-card';
        
        // FIX: We pass the EXACT name of the mod to the URL instead of a number
        const modIdentifier = encodeURIComponent(mod.name); 
        card.onclick = () => window.location.href = `details.html?id=${modIdentifier}`;
        
        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden; background:#000;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;" 
                     onerror="this.src='https://via.placeholder.com/400x225?text=Image+Error'">
                <div style="position:absolute; top:12px; left:12px; background:#3498db; color:white; padding:5px 10px; font-size:10px; font-weight:800; border-radius:6px; text-transform:uppercase;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0; font-size:18px; font-weight:700;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:6px 0;">by ${mod.author || 'Author'}</p>
                <p style="color:#8b949e; font-size:13px; margin-bottom:15px; line-height:1.4;">${mod.description ? mod.description.substring(0, 70) + '...' : ''}</p>
                <div style="display:block; text-align:center; background:#3498db; color:white; padding:12px; border-radius:8px; font-weight:700; font-size:14px;">View Mod</div>
            </div>`;
        container.appendChild(card);
    });
}
    }

    mods.forEach((mod, index) => {
        const card = document.createElement('div');
        card.className = 'mod-card';
        card.onclick = () => window.location.href = `details.html?id=${index}`;
        card.innerHTML = `
            <div style="position:relative; aspect-ratio:16/9; overflow:hidden;">
                <img src="${mod.image}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='https://via.placeholder.com/400x225?text=Image+URL+Error'">
                <div style="position:absolute; top:12px; left:12px; background:#3498db; color:white; padding:5px 10px; font-size:10px; font-weight:800; border-radius:6px; text-transform:uppercase;">${mod.tag || 'NEW'}</div>
            </div>
            <div style="padding:20px;">
                <h2 style="margin:0; font-size:18px; font-weight:700;">${mod.name}</h2>
                <p style="color:#3498db; font-size:12px; font-weight:600; margin:6px 0;">by ${mod.author || 'Author'}</p>
                <p style="color:#8b949e; font-size:13px; margin-bottom:15px; line-height:1.4;">${mod.description ? mod.description.substring(0, 70) + '...' : ''}</p>
                <div style="display:block; text-align:center; background:#3498db; color:white; padding:12px; border-radius:8px; font-weight:700; font-size:14px;">View Mod</div>
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
    
    const filtered = (cat === 'all') ? allMods : allMods.filter(m => m.category.toLowerCase().includes(cat.toLowerCase()));
    renderMods(filtered);
}

function searchMods() {
    const term = document.getElementById('search').value.toLowerCase();
    const filtered = allMods.filter(m => m.name.toLowerCase().includes(term));
    renderMods(filtered);
}

window.onload = loadMods;
