/* ===================================
   INFRASTRUCTURE.JS
   - Tooltip interactif sur les nœuds SVG
   - Légende visible uniquement au survol du pare-feu
   =================================== */
(function () {
    'use strict';

    const tooltip  = document.getElementById('tooltip');
    const legend   = document.getElementById('svg-legend');
    const firewall = document.getElementById('firewall-node');

    /* ── Tooltip ── */
    function showTooltip(event, el) {
        const name = el.dataset.name || '';
        const ip   = el.dataset.ip   || '';
        const role = el.dataset.role || '';
        const desc = el.dataset.desc || '';

        tooltip.innerHTML = `
            <h4>${name}</h4>
            <div class="tip-ip">📡 ${ip}</div>
            <div class="tip-role">${role}</div>
            <div class="tip-desc">${desc}</div>
        `;
        tooltip.classList.add('show');
        moveTooltip(event);
    }

    function hideTooltip() {
        tooltip.classList.remove('show');
    }

    function moveTooltip(e) {
        const x = e.clientX + 16;
        const y = e.clientY + 16;
        tooltip.style.left = Math.min(x, window.innerWidth  - 280) + 'px';
        tooltip.style.top  = Math.min(y, window.innerHeight - 210) + 'px';
    }

    /* Attache les événements à tous les nœuds */
    document.querySelectorAll('.node-group').forEach(el => {
        el.addEventListener('mouseenter', e => showTooltip(e, el));
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('mousemove',  moveTooltip);
    });

    /* ── Légende : visible uniquement au survol du pare-feu ── */
    if (firewall && legend) {
        firewall.addEventListener('mouseenter', () => {
            legend.classList.remove('hidden-legend');
            legend.classList.add('visible-legend');
        });
        firewall.addEventListener('mouseleave', () => {
            legend.classList.remove('visible-legend');
            legend.classList.add('hidden-legend');
        });
    }
})();
