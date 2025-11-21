// LabOS Theme - Interactive Features

document.addEventListener('DOMContentLoaded', () => {

    /* --- FEATURE 1: RAW MODE TOGGLE --- */
    const rawToggle = document.getElementById('raw-mode-toggle');
    if(rawToggle) {
        rawToggle.addEventListener('click', () => {
            document.body.classList.toggle('raw-mode');
            const isRaw = document.body.classList.contains('raw-mode');
            rawToggle.innerText = isRaw ? 'GUI_MODE' : 'RAW_MODE';
        });
    }

    /* --- FEATURE 2: KEYBOARD NAVIGATION (VIM STYLE) --- */
    document.addEventListener('keydown', (e) => {
        // Prevent if typing in form
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        switch(e.key.toLowerCase()) {
            case 'j': // Scroll Down
                window.scrollBy({ top: 100, behavior: 'smooth' });
                break;
            case 'k': // Scroll Up
                window.scrollBy({ top: -100, behavior: 'smooth' });
                break;
            case '/': // Focus Search or CTA
                e.preventDefault();
                // Just demoing focus on the first primary button
                const cta = document.querySelector('.btn-primary');
                if(cta) cta.focus();
                break;
        }
    });

    /* --- FEATURE 3: INTELLIGENT SIDENOTES --- */
    // Concept: Look for span.sidenote-source in content.
    // If Desktop: Move text to sidebar container.
    // If Mobile: Toggle visibility inline.

    const sidenoteSources = document.querySelectorAll('.sidenote-source');
    const sidebarContainer = document.getElementById('sidenotes-container');

    if (sidenoteSources.length > 0) {
        sidenoteSources.forEach((note, index) => {
            const num = index + 1;

            // Create reference number in text
            const ref = document.createElement('sup');
            ref.className = 'sidenote-ref';
            ref.innerText = `[${num}]`;
            note.parentNode.insertBefore(ref, note);

            // 1. Mobile Logic: Click ref to toggle note below
            const mobileNote = document.createElement('div');
            mobileNote.className = 'sidenote-content sidenote-mobile-expanded hidden lg:hidden';
            mobileNote.innerHTML = note.innerHTML;
            note.parentNode.insertBefore(mobileNote, note.nextSibling);

            ref.addEventListener('click', () => {
                mobileNote.classList.toggle('hidden');
            });

            // 2. Desktop Logic: Move to sidebar
            if (sidebarContainer) {
                const sideDiv = document.createElement('div');
                sideDiv.className = 'sidebar-note';
                sideDiv.innerHTML = `<span class="sidebar-note-number">${num}.</span> ${note.innerHTML}`;

                // Attempt to align sidebar note with the text position
                // (Simple version: just append, advanced version requires math)
                sidebarContainer.appendChild(sideDiv);
            }

            // Remove original hidden span source
            note.style.display = 'none';
        });
    }
});
