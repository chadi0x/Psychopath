/**
 * ==============================================================================
 *  PSYCHOPATH CONSOLE - THREAT EMULATION & OSINT FRAMEWORK
 * ==============================================================================
 *  Architect / Developer: chadi0x
 *  Official Repository  : https://github.com/chadi0x
 *  License              : Educational & Research Purposes Only
 *  Notice               : Unlawful use, copyright stripping, and distribution
 *                         without attribution are strictly prohibited.
 * ==============================================================================
 */

// DevTools Console Signature & Banner
(function () {
    const bannerStyle = 'color: #ef4444; font-weight: bold; font-size: 14px;';
    const subStyle = 'color: #94a3b8; font-size: 11px;';
    const linkStyle = 'color: #38bdf8; text-decoration: underline; font-weight: bold;';

    console.log(
        `%c\n` +
        `  ██████╗ ███████╗██╗   ██╗ ██████╗██╗  ██╗ ██████╗ ██████╗  █████╗ ████████╗██╗  ██╗\n` +
        `  ██╔══██╗██╔════╝╚██╗ ██╔╝██╔════╝██║  ██║██╔═══██╗██╔══██╗██╔══██╗╚══██╔══╝██║  ██║\n` +
        `  ██████╔╝███████╗ ╚████╔╝ ██║     ███████║██║   ██║██████╔╝███████║   ██║   ███████║\n` +
        `  ██╔═══╝ ╚════██║  ╚██╔╝  ██║     ██╔══██║██║   ██║██╔═══╝ ██╔══██║   ██║   ██╔══██║\n` +
        `  ██║     ███████║   ██║   ╚██████╗██║  ██║╚██████╔╝██║     ██║  ██║   ██║   ██║  ██║\n` +
        `  ╚═╝     ╚══════╝   ╚═╝    ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝\n` +
        `\n%c  [+] Core Architect : chadi0x\n` +
        `  [+] GitHub         : %chttps://github.com/chadi0x%c\n` +
        `  [+] License        : Strictly for authorized educational & security auditing purposes.\n` +
        `  [+] Disclaimer     : Zero liability for misuse.\n`,
        bannerStyle,
        subStyle,
        linkStyle,
        subStyle
    );
})();

// Dashboard & UI Interactions
document.addEventListener('DOMContentLoaded', () => {
    // 3D Tilt Effect
    const cards = document.querySelectorAll('.profile-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3; // Subtle tilt
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Initialize System Integrity Guardian
    initSystemIntegrityGuardian();
});

// Modal Logic
function openPersonModal(person) {
    const modal = document.getElementById('personModal');
    if (!modal) return;

    // Populate Data
    const modalImg = document.getElementById('modalImg');
    if (modalImg) {
        modalImg.src = person.image_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random`;
    }
    const modalName = document.getElementById('modalName');
    if (modalName) modalName.textContent = person.name;

    const modalJob = document.getElementById('modalJob');
    if (modalJob) modalJob.textContent = person.job || 'Unknown Classification';

    // Country & IP
    const countryEl = document.getElementById('modalCountry');
    if (countryEl) {
        if (person.country) {
            countryEl.style.display = 'flex';
            countryEl.querySelector('span').textContent = person.country;
        } else {
            countryEl.style.display = 'none';
        }
    }

    const ipEl = document.getElementById('modalIp');
    if (ipEl) {
        if (person.ip_address) {
            ipEl.style.display = 'flex';
            ipEl.querySelector('span').textContent = person.ip_address;
        } else {
            ipEl.style.display = 'none';
        }
    }

    // Sticky Note
    const noteContainer = document.getElementById('modalNoteContainer');
    if (noteContainer) {
        if (person.note) {
            noteContainer.style.display = 'block';
            document.getElementById('modalNote').textContent = person.note;
        } else {
            noteContainer.style.display = 'none';
        }
    }

    // Email
    const modalEmail = document.getElementById('modalEmail');
    if (modalEmail) {
        modalEmail.querySelector('span').textContent = person.email || 'No contact info';
    }

    // Social Links (Generic Text)
    const linkRow = document.getElementById('modalLinkRow');
    if (linkRow) {
        if (person.social_links) {
            linkRow.style.display = 'flex';
            document.getElementById('modalLinks').querySelector('span').textContent = person.social_links;
        } else {
            linkRow.style.display = 'none';
        }
    }

    // Vault
    const vaultEmail = document.getElementById('modalSocialEmail');
    if (vaultEmail) vaultEmail.textContent = person.social_email || 'N/A';

    const vaultPass = document.getElementById('modalSocialPass');
    if (vaultPass) vaultPass.textContent = person.social_password || 'N/A';

    const vaultContent = document.getElementById('vaultContent');
    if (vaultContent) vaultContent.classList.add('hidden'); // Reset vault state

    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('personModal');
    if (modal) modal.classList.remove('show');
}

// Copy Logic
function copyText(elementId, isSpan = false) {
    const el = document.getElementById(elementId);
    if (!el) return;
    let text = '';

    if (isSpan) {
        const spanEl = el.querySelector('span');
        text = spanEl ? spanEl.textContent : '';
    } else {
        text = el.textContent;
    }

    if (!text || text === 'N/A' || text === 'No contact info') {
        showToast('Nothing to copy!');
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function showToast(message) {
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(function () { toast.className = toast.className.replace('show', ''); }, 3000);
}

// Close on outside click
window.onclick = function (event) {
    const modal = document.getElementById('personModal');
    if (event.target === modal) {
        closeModal();
    }
};

function toggleVault() {
    const content = document.getElementById('vaultContent');
    if (!content) return;
    content.classList.toggle('hidden');

    // Toggle visual lock state
    const items = content.querySelectorAll('.data-row');
    items.forEach(item => {
        if (content.classList.contains('hidden')) {
            item.classList.remove('unlocked-content');
            item.classList.add('locked-content');
        } else {
            item.classList.remove('locked-content');
            item.classList.add('unlocked-content');
        }
    });
}

/**
 * ==============================================================================
 *  SYSTEM INTEGRITY & AUTHOR WATERMARK GUARDIAN
 * ==============================================================================
 *  Monitors the developer watermarks in the DOM. Detects tampering, deletion,
 *  or hiding, and automatically restores attribution to chadi0x.
 * ==============================================================================
 */
function initSystemIntegrityGuardian() {
    const EXPECTED_AUTHOR = "chadi0x";
    const EXPECTED_GITHUB = "https://github.com/chadi0x";

    function createOrRepairWatermark() {
        let watermark = document.getElementById('chadi0x-watermark');
        const contentHTML = `
            <div class="container">
                <div class="d-flex flex-wrap justify-content-center align-items-center gap-2">
                    <span>Psychopath Console v2.5</span>
                    <span class="text-secondary">&bull;</span>
                    <span>Architect: <a href="${EXPECTED_GITHUB}" target="_blank" rel="noopener noreferrer" class="text-danger fw-bold text-decoration-none" id="chadi0x-author-link">${EXPECTED_AUTHOR}</a></span>
                    <span class="text-secondary">&bull;</span>
                    <a href="${EXPECTED_GITHUB}" target="_blank" rel="noopener noreferrer" class="text-secondary text-decoration-none">
                        <i class="fa-brands fa-github me-1"></i>${EXPECTED_GITHUB}
                    </a>
                    <span class="text-secondary">&bull;</span>
                    <span class="badge bg-secondary bg-opacity-25 text-secondary">Educational Purposes Only</span>
                </div>
            </div>`;

        if (!watermark) {
            watermark = document.createElement('footer');
            watermark.id = 'chadi0x-watermark';
            watermark.className = 'chadi0x-protected-footer text-center py-3 border-top border-secondary border-opacity-25 text-secondary small mt-5';
            watermark.innerHTML = contentHTML;
            const contentWrapper = document.getElementById('page-content-wrapper') || document.body;
            contentWrapper.appendChild(watermark);
            return;
        }

        // Check if content was stripped or altered
        if (!watermark.innerHTML.includes(EXPECTED_AUTHOR) || !watermark.innerHTML.includes(EXPECTED_GITHUB)) {
            watermark.innerHTML = contentHTML;
        }

        // Check if styles were altered to hide the watermark
        if (watermark.style.display === 'none' || watermark.style.visibility === 'hidden' || watermark.style.opacity === '0') {
            watermark.style.display = 'block';
            watermark.style.visibility = 'visible';
            watermark.style.opacity = '1';
        }
    }

    // Run verification immediately
    createOrRepairWatermark();

    // DOM Mutation Observer to detect and undo tampering
    const observer = new MutationObserver((mutations) => {
        let shouldRepair = false;
        mutations.forEach((mutation) => {
            if (mutation.removedNodes) {
                mutation.removedNodes.forEach((node) => {
                    if (node.id === 'chadi0x-watermark' || (node.querySelector && node.querySelector('#chadi0x-watermark'))) {
                        shouldRepair = true;
                    }
                });
            }
            if (mutation.target && (mutation.target.id === 'chadi0x-watermark' || mutation.target.id === 'chadi0x-author-link')) {
                shouldRepair = true;
            }
        });
        if (shouldRepair) {
            createOrRepairWatermark();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class', 'hidden']
    });

    // Heartbeat check every 4 seconds
    setInterval(createOrRepairWatermark, 4000);
}
