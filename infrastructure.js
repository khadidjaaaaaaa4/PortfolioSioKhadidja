/* ===================================
   INFRASTRUCTURE.JS
   Tooltip interactif sur les nœuds SVG
   =================================== */

(function () {
    const tooltip = document.getElementById('tooltip');

    function showTooltip(event, el) {
        const n = el.dataset.n || '';
        const i = el.dataset.i || '';
        const r = el.dataset.r || '';
        const d = el.dataset.d || '';

        tooltip.innerHTML = `
            <h4>${n}</h4>
            <div class="tip-ip">📡 ${i}</div>
            <div class="tip-role">${r}</div>
            <div class="tip-desc">${d}</div>
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

    document.querySelectorAll('.node-group').forEach(el => {
        el.addEventListener('mouseenter', e => showTooltip(e, el));
        el.addEventListener('mouseleave', hideTooltip);
        el.addEventListener('mousemove',  moveTooltip);
    });
})();
