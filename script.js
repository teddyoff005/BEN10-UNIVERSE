document.addEventListener('DOMContentLoaded', () => {
    // --- CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        cursorDot.style.left = `${e.clientX}px`; 
        cursorDot.style.top = `${e.clientY}px`;
        cursorOutline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
    });

    const interact = () => {
        const items = document.querySelectorAll('a, button, input, select, .alien-card, .omnitrix-dial-container, .log-filter-btn');
        items.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    };
    interact();

    // --- ELEMENTS ---
    const loader = document.getElementById('loader');
    const authScreen = document.getElementById('auth-screen');
    const welcomeScreen = document.getElementById('welcome-screen');
    const pageWrapper = document.getElementById('page-wrapper');
    const mainContent = document.getElementById('main-content');
    const logsPage = document.getElementById('logs-page');
    const galvanPage = document.getElementById('galvan-page');
    const avatarWrapper = document.getElementById('avatar-svg-wrapper');
    const avatarName = document.getElementById('avatar-name');
    const activateBtn = document.getElementById('activate-btn');
    const authSubmit = document.getElementById('auth-submit');
    const themeSong = document.getElementById('theme-song');
    const coreReadySfx = document.getElementById('core-ready-sfx');
    const transformSfx = document.getElementById('transform-sfx');
    const albedoTheme = document.getElementById('albedo-theme');
    const audioToggle = document.getElementById('audio-toggle');
    const codenameInput = document.getElementById('codename-input');
    const userDisplay = document.getElementById('user-display');
    const welcomeText = document.getElementById('welcome-text');
    const loadingFill = document.querySelector('.loading-bar-fill');
    const flashOverlay = document.getElementById('flash-overlay');
    const alienGrid = document.getElementById('alien-grid');
    const logsGrid = document.getElementById('logs-grid');
    const searchBar = document.getElementById('search-bar');
    const filterSeries = document.getElementById('filter-series');
    const filterPower = document.getElementById('filter-power');
    const sortAliens = document.getElementById('sort-aliens');
    const modal = document.getElementById('alien-modal');
    const modalDetails = document.getElementById('modal-details');
    const closeModal = document.querySelector('.close-modal');
    const securityBypass = document.getElementById('security-bypass');
    const siteLogo = document.querySelector('.glitch');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Page IDs in order for navigation
    const pages = ['dna', 'logs', 'galvan'];
    let currentPageIndex = 0;

    if (themeSong) themeSong.volume = 0.5;
    if (coreReadySfx) coreReadySfx.volume = 0.8;
    if (transformSfx) transformSfx.volume = 1.0;

    let userCodename = "UNKNOWN";

    // --- REALISTIC AVATAR ASSETS ---
    const azmuthSVG = `
        <svg viewBox="0 0 100 120" class="galvan-svg">
            <defs>
                <linearGradient id="azmuth-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:var(--neon-green);stop-opacity:0.1" />
                    <stop offset="100%" style="stop-color:var(--neon-green);stop-opacity:0" />
                </linearGradient>
            </defs>
            <g class="galvan-head">
                <path fill="url(#azmuth-glow)" d="M25,50 Q25,20 50,15 Q75,20 75,50 Q75,80 50,95 Q25,80 25,50 Z" />
                <path class="laser-print-path" d="M25,50 Q25,20 50,15 Q75,20 75,50 Q75,80 50,95 Q25,80 25,50 Z" stroke-width="1.2" />
                <path class="laser-print-path" d="M30,25 Q50,10 70,25" opacity="0.5" stroke-dasharray="2,2" />
                <path class="laser-print-path" d="M42,20 Q50,17 58,20" opacity="0.7" />
                <path class="laser-print-path" d="M38,28 Q50,24 62,28" opacity="0.8" />
                <path class="laser-print-path" d="M35,36 Q50,32 65,36" />
                <path class="laser-print-path" d="M30,52 Q42,42 50,52" opacity="0.4" />
                <path class="laser-print-path" d="M70,52 Q58,42 50,52" opacity="0.4" />
                <g class="galvan-eyes">
                    <g>
                        <path class="laser-print-path" d="M32,55 Q42,45 52,55 Q42,65 32,55 Z" stroke-width="1.5" />
                        <rect class="laser-print-path" x="37" y="54" width="10" height="2" rx="1" fill="currentColor" />
                        <path class="laser-print-path" d="M35,58 Q42,62 49,58" opacity="0.3" />
                    </g>
                    <g>
                        <path class="laser-print-path" d="M58,55 Q68,45 78,55 Q68,65 58,55 Z" stroke-width="1.5" />
                        <rect class="laser-print-path" x="63" y="54" width="10" height="2" rx="1" fill="currentColor" />
                        <path class="laser-print-path" d="M61,58 Q68,62 75,58" opacity="0.3" />
                    </g>
                </g>
                <path class="laser-print-path" d="M48,70 L48,75 M52,70 L52,75" opacity="0.6" />
                <path class="laser-print-path" d="M44,82 Q50,86 56,82" stroke-width="1.2" />
                <path class="laser-print-path" d="M40,92 Q50,98 60,92" opacity="0.8" />
                <path class="laser-print-path" d="M35,98 L30,115 L70,115 L65,98" stroke-width="1" opacity="0.6" />
                <circle class="laser-print-path" cx="50" cy="108" r="4" opacity="0.5" />
            </g>
        </svg>
    `;

    const albedoSVG = `
        <svg viewBox="0 0 100 120" class="galvan-svg">
            <defs>
                <linearGradient id="albedo-glow" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style="stop-color:#ff1414;stop-opacity:0.15" />
                    <stop offset="100%" style="stop-color:#ff1414;stop-opacity:0" />
                </linearGradient>
            </defs>
            <g class="galvan-head">
                <path fill="url(#albedo-glow)" d="M25,50 Q25,20 50,15 Q75,20 75,50 Q75,85 50,100 Q25,85 25,50 Z" />
                <path class="laser-print-path" d="M25,50 Q25,20 50,15 Q75,20 75,50 Q75,85 50,100 Q25,85 25,50 Z" stroke-width="1.5" />
                <path class="laser-print-path" d="M35,40 Q50,48 65,40" stroke-width="2.5" />
                <path class="laser-print-path" d="M38,35 L48,44" stroke-width="1.5" />
                <path class="laser-print-path" d="M62,35 L52,44" stroke-width="1.5" />
                <path class="laser-print-path" d="M46,30 L46,38 M54,30 L54,38" opacity="0.7" />
                <path class="laser-print-path" d="M28,45 Q35,40 42,43" opacity="0.5" />
                <path class="laser-print-path" d="M72,45 Q65,40 58,43" opacity="0.5" />
                <g class="galvan-eyes">
                    <g>
                        <path class="laser-print-path" d="M30,55 Q40,48 50,55 Q40,62 30,55 Z" stroke-width="2" />
                        <rect class="laser-print-path" x="35" y="54" width="12" height="3" rx="1" fill="currentColor" />
                    </g>
                    <g>
                        <path class="laser-print-path" d="M60,55 Q70,48 80,55 Q70,62 60,55 Z" stroke-width="2" />
                        <rect class="laser-print-path" x="63" y="54" width="12" height="3" rx="1" fill="currentColor" />
                    </g>
                </g>
                <path class="laser-print-path" d="M40,82 Q50,78 60,82" stroke-width="2" />
                <path class="laser-print-path" d="M45,92 Q50,95 55,92" />
                <path class="laser-print-path" d="M32,70 Q38,85 48,92" opacity="0.6" />
                <path class="laser-print-path" d="M68,70 Q62,85 52,92" opacity="0.6" />
                <path class="laser-print-path" d="M35,102 L20,118 L80,118 L65,102" stroke-width="1.2" opacity="0.8" />
            </g>
        </svg>
    `;

    function updateAvatar(mode = 'azmuth') {
        if (!avatarWrapper) return;
        avatarWrapper.innerHTML = mode === 'azmuth' ? azmuthSVG : albedoSVG;
        avatarName.innerText = mode === 'azmuth' ? 'AZMUTH' : 'ALBEDO';
        const paths = avatarWrapper.querySelectorAll('.laser-print-path');
        paths.forEach(p => {
            p.style.animation = 'none';
            p.offsetHeight;
            p.style.animation = null;
        });
    }

    updateAvatar('azmuth');

    // --- NAVIGATION ---
    function navigateTo(pageId) {
        document.body.classList.remove('show-logs', 'show-galvan');
        
        if (pageId === 'logs') {
            document.body.classList.add('show-logs');
            renderLogs('aliens');
        } else if (pageId === 'galvan') {
            document.body.classList.add('show-galvan');
        }

        // Update Nav Links Active State
        navLinks.forEach((link, idx) => {
            link.classList.remove('active');
            if (pages[idx] === pageId) {
                link.classList.add('active');
                currentPageIndex = idx;
            }
        });

        interact();
    }

    navLinks.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(pages[idx]);
        });
    });

    // --- TRACKPAD GESTURE (SWIPE) ---
    let isSwiping = false;
    let swipeThreshold = 50; 

    window.addEventListener('wheel', (e) => {
        if (Math.abs(e.deltaX) > swipeThreshold && !isSwiping && pageWrapper.style.display === 'block') {
            isSwiping = true;
            if (e.deltaX > 0 && currentPageIndex < pages.length - 1) {
                navigateTo(pages[currentPageIndex + 1]);
            } else if (e.deltaX < 0 && currentPageIndex > 0) {
                navigateTo(pages[currentPageIndex - 1]);
            }
            setTimeout(() => { isSwiping = false; }, 800);
        }
    }, { passive: true });

    // --- ALBEDO MODE ---
    if (securityBypass) {
        securityBypass.addEventListener('click', () => {
            const isRed = !document.body.classList.contains('red-mode');
            if (isRed) {
                document.body.classList.add('red-mode', 'breach-active');
                updateAvatar('albedo');
                if (themeSong) themeSong.pause();
                if (albedoTheme) {
                    albedoTheme.currentTime = 0;
                    albedoTheme.play().catch(() => {});
                }
                if (siteLogo) {
                    siteLogo.innerHTML = `ALB<span class="green">EDO</span>`;
                    siteLogo.setAttribute('data-text', 'ALBEDO');
                }
                setTimeout(() => document.body.classList.remove('breach-active'), 3000);
            } else {
                document.body.classList.remove('red-mode');
                document.body.classList.add('restoring-active');
                updateAvatar('azmuth');
                if (albedoTheme) albedoTheme.pause();
                if (themeSong) {
                    themeSong.currentTime = 0;
                    themeSong.play().catch(() => {});
                }
                if (siteLogo) {
                    siteLogo.innerHTML = `IAM<span class="green">GENIUS</span>`;
                    siteLogo.setAttribute('data-text', 'IAMGENIUS');
                }
                setTimeout(() => document.body.classList.remove('restoring-active'), 3000);
            }
        });
    }

    // --- TRANSITIONS ---
    const unlockAudio = () => {
        if (themeSong && themeSong.paused) themeSong.play().catch(() => {});
        if (coreReadySfx) coreReadySfx.play().then(() => coreReadySfx.pause()).catch(() => {});
        document.removeEventListener('mousedown', unlockAudio);
    };
    document.addEventListener('mousedown', unlockAudio);

    // --- RECHARGE SYSTEM ---
    const rechargeOverlay = document.getElementById('recharge-overlay');
    const rechargeFill = document.getElementById('recharge-fill');
    const chargeStatus = document.getElementById('charge-status');
    const manualRecharge = document.getElementById('manual-recharge');
    let rechargeTimer, drainInterval, energyLevel = 100;

    function updateEnergyDisplay() {
        if (chargeStatus) chargeStatus.innerText = `CORE ENERGY: ${Math.floor(energyLevel)}%`;
    }

    function startRechargeCycle() {
        if (document.body.classList.contains('recharging')) return;
        clearInterval(drainInterval);
        clearTimeout(rechargeTimer);
        if (energyLevel < 100) { energyLevel = 100; updateEnergyDisplay(); }
        rechargeTimer = setTimeout(() => {
            drainInterval = setInterval(() => {
                energyLevel -= 1; 
                updateEnergyDisplay();
                if (energyLevel <= 0) {
                    energyLevel = 0;
                    clearInterval(drainInterval);
                    triggerRecharge();
                }
            }, 5000);
        }, 5000); 
    }

    function triggerRecharge() {
        if (document.body.classList.contains('recharging') || document.body.classList.contains('red-mode')) {
            energyLevel = 100; updateEnergyDisplay(); return;
        }
        document.body.classList.add('recharging');
        if (rechargeOverlay) rechargeOverlay.style.display = 'flex';
        let charge = 0;
        const chargeInt = setInterval(() => {
            charge += 2;
            if (rechargeFill) rechargeFill.style.width = charge + '%';
            if (charge >= 100) {
                clearInterval(chargeInt);
                document.body.classList.remove('recharging');
                if (rechargeOverlay) rechargeOverlay.style.display = 'none';
                energyLevel = 100;
                updateEnergyDisplay();
                if (coreReadySfx) coreReadySfx.play().catch(() => {});
                startRechargeCycle();
            }
        }, 100); 
    }

    if (manualRecharge) {
        manualRecharge.addEventListener('click', () => {
            clearInterval(drainInterval);
            energyLevel = 0;
            updateEnergyDisplay();
            triggerRecharge();
        });
    }

    window.addEventListener('mousemove', startRechargeCycle);
    window.addEventListener('click', startRechargeCycle);
    window.addEventListener('keypress', startRechargeCycle);
    startRechargeCycle();

    activateBtn.addEventListener('mouseenter', () => {
        if (coreReadySfx) {
            coreReadySfx.currentTime = 0;
            coreReadySfx.play().catch(() => {});
        }
    });

    activateBtn.addEventListener('click', () => {
        if (transformSfx) transformSfx.play().catch(() => {});
        if (themeSong) themeSong.play().catch(() => {});

        const core = document.querySelector('.core-dial');
        const hourglass = document.querySelector('.hourglass');
        const statusText = document.getElementById('loader-status');
        
        core.style.boxShadow = '0 0 150px #39ff14';
        core.style.background = '#39ff14';
        if (hourglass) {
            hourglass.style.transform = 'rotate(180deg) scale(1.2)';
            hourglass.style.background = '#000';
        }
        
        statusText.style.opacity = '0';
        setTimeout(() => {
            statusText.innerText = 'ULTIMATRIX SYSTEM ONLINE';
            statusText.style.color = '#39ff14';
            statusText.style.textShadow = '0 0 20px #39ff14';
            statusText.style.opacity = '1';
            document.querySelector('.status-message').innerText = 'MASTER CONTROL INITIALIZED...';
        }, 400);

        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transform = 'scale(1.5)';
            setTimeout(() => {
                loader.style.display = 'none';
                authScreen.style.display = 'flex';
                setTimeout(() => authScreen.style.opacity = '1', 50);
                codenameInput.focus();
            }, 800);
        }, 1200);
    });

    if (audioToggle && themeSong) {
        audioToggle.addEventListener('click', () => {
            const isMuted = !themeSong.muted;
            themeSong.muted = isMuted;
            if (albedoTheme) albedoTheme.muted = isMuted;
            audioToggle.innerText = isMuted ? '🔇' : '🔊';
        });
    }

    authSubmit.addEventListener('click', () => {
        const val = codenameInput.value.trim();
        if (!val) return;
        userCodename = val.toUpperCase();
        if (flashOverlay) {
            flashOverlay.classList.remove('flash-active');
            void flashOverlay.offsetWidth;
            flashOverlay.classList.add('flash-active');
        }
        authScreen.style.opacity = '0';
        setTimeout(() => {
            authScreen.style.display = 'none';
            welcomeScreen.style.display = 'flex';
            setTimeout(() => welcomeScreen.style.opacity = '1', 50);
            startWelcomeSequence();
        }, 800);
    });

    function startWelcomeSequence() {
        welcomeText.innerText = `SYNCING...`;
        let w = 0;
        const intr = setInterval(() => {
            if (w >= 100) {
                clearInterval(intr);
                welcomeText.innerText = `WELCOME\n${userCodename}`;
                welcomeText.style.color = "#39ff14";
                setTimeout(() => {
                    welcomeScreen.style.opacity = '0';
                    setTimeout(() => {
                        welcomeScreen.style.display = 'none';
                        pageWrapper.style.display = 'block';
                        userDisplay.innerHTML = `OPERATOR IDENTIFIED: <span class="highlight">${userCodename}</span> // SEC: MILKY WAY // [TECH LEVEL: 20]`;
                        
                        const galvanUserId = document.getElementById('galvan-user-id');
                        if (galvanUserId) galvanUserId.innerText = `UID_${userCodename}_${Math.floor(Math.random() * 10000)}`;

                        renderAliens(aliens);
                        interact();
                        setTimeout(() => {
                            pageWrapper.style.opacity = '1';
                            document.body.classList.add('avatar-active');
                            startAzmuthTerminal();
                        }, 100);
                    }, 800);
                }, 1500);
            } else {
                w += 5;
                loadingFill.style.width = w + '%';
            }
        }, 50);
    }

    function startAzmuthTerminal() {
        const term = document.getElementById('azmuth-terminal');
        if (!term) return;
        const msgs = [
            `> ANALYZING DNA SAMPLES...`,
            `> GALVAN PRIME RELAY ACTIVE.`,
            `> ENCRYPTED STREAM DETECTED.`,
            `> BENJAMIN KIRBY TENNYSON LOGS ACCESSED.`,
            `> CAUTION: MASTER CONTROL IS ACTIVE.`,
            `> DNA INTEGRITY: 100%.`,
            `> RECOGNIZING ${userCodename}...`,
            `> ACCESS GRANTED BY FIRST THINKER.`
        ];
        let i = 0;
        setInterval(() => {
            const m = msgs[Math.floor(Math.random() * msgs.length)];
            const div = document.createElement('div');
            div.innerHTML = m;
            term.appendChild(div);
            term.scrollTop = term.scrollHeight;
            if (term.childNodes.length > 15) term.removeChild(term.childNodes[0]);
        }, 3000);
    }

    function renderAliens(data) {
        alienGrid.innerHTML = '';
        data.forEach((alien, i) => {
            const isLocked = alien.unlock_status === 'LOCKED';
            const imgUrl = alien.image_url || 'https://via.placeholder.com/200x200/0a1a0a/39FF14?text=DNA+ERROR';
            const card = document.createElement('div');
            card.className = `alien-card ${isLocked ? 'locked-dna' : ''} glitch-out`;
            card.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.05}s, filter-glitch 0.4s ease-out forwards`;
            card.innerHTML = `
                <div class="card-image-container">
                    <img src="${imgUrl}" alt="${alien.name}" onerror="this.src='https://via.placeholder.com/200x200/0a1a0a/39FF14?text=DNA+ERROR'">
                    ${isLocked ? '<div class="lock-overlay"><div class="lock-icon">🔒</div></div>' : ''}
                </div>
                <div class="card-info">
                    <div style="font-size: 0.6rem; color: var(--neon-green); letter-spacing: 1px; margin-bottom: 5px;">THREAT LEVEL: ${Math.floor(Math.random() * 5) + 5}/10</div>
                    <div style="font-size: 0.7rem; color: #444; letter-spacing: 2px;">${alien.series.toUpperCase()}</div>
                    <h3>${alien.name}</h3>
                </div>
            `;
            card.addEventListener('mousemove', (e) => {
                if (card.classList.contains('flipping')) return;
                const r = card.getBoundingClientRect();
                const x = ((e.clientX - r.left - r.width/2) / r.width * 20);
                const y = -((e.clientY - r.top - r.height/2) / r.height * 20);
                card.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('flipping')) return;
                card.style.transform = '';
            });
            card.addEventListener('click', () => {
                if (isLocked) {
                    openDecryption(alien);
                } else {
                    card.classList.add('flipping');
                    if (transformSfx) {
                        transformSfx.currentTime = 0;
                        transformSfx.play().catch(() => {});
                    }
                    setTimeout(() => {
                        openModal(alien);
                        card.classList.remove('flipping');
                        card.style.transform = '';
                    }, 800);
                }
            });
            alienGrid.appendChild(card);
        });
        updateBadges();
    }

    function renderLogs(type = 'aliens') {
        if (!logsGrid) return;
        logsGrid.innerHTML = '';
        const data = database[type];
        data.forEach((item, i) => {
            const timestamp = new Date().toLocaleTimeString();
            const card = document.createElement('div');
            card.className = 'log-card';
            card.style.animation = `fadeInUp 0.5s ease forwards ${i * 0.05}s`;
            card.innerHTML = `
                <div style="font-size: 0.6rem; color: #444; margin-bottom: 5px;">TIMESTAMP: ${timestamp} // SOURCE: GALVAN_DATABASE_${type.toUpperCase()}</div>
                <h5>${item.name.toUpperCase()}</h5>
                <div class="log-meta">
                    <span>${item.species || item.role}</span>
                    <span style="color: var(--neon-green-dim); font-size: 0.7rem;">[ ${item.planet || 'UNKNOWN'} ]</span>
                </div>
                <p class="log-desc">${item.description}</p>
            `;
            logsGrid.appendChild(card);
        });
        interact();
    }

    const logFilterBtns = document.querySelectorAll('.log-filter-btn');
    logFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            logFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderLogs(btn.dataset.type);
        });
    });

    function updateBadges() {
        const badgeContainer = document.getElementById('badge-container');
        if (!badgeContainer) return;
        badgeContainer.innerHTML = '';
        const unlockedCount = aliens.filter(a => a.unlock_status === 'ACTIVE').length;
        if (unlockedCount >= 1) addBadge('RECRUIT');
        if (unlockedCount >= 5) addBadge('HELPER');
        if (unlockedCount >= 10) addBadge('MAGISTER');
        if (unlockedCount >= 12) addBadge('GALVAN-PRIME ELITE');
        function addBadge(text) {
            const b = document.createElement('div');
            b.className = 'plumber-badge';
            b.innerText = text;
            badgeContainer.appendChild(b);
        }
    }

    const decryptModal = document.getElementById('decryption-modal');
    const decryptInput = document.getElementById('decrypt-input');
    const decryptSubmit = document.getElementById('decrypt-submit');
    const decryptMsg = document.getElementById('decrypt-msg');
    const closeDecrypt = document.querySelector('.close-decrypt');
    let targetAlien = null;

    function openDecryption(alien) {
        targetAlien = alien;
        decryptModal.style.display = 'flex';
        decryptInput.value = '';
        decryptMsg.innerText = '';
        decryptInput.focus();
    }

    if (closeDecrypt) {
        closeDecrypt.addEventListener('click', () => {
            decryptModal.style.display = 'none';
        });
    }

    if (decryptSubmit) {
        decryptSubmit.addEventListener('click', () => {
            const code = decryptInput.value.trim().toUpperCase();
            decryptMsg.innerText = 'ACCESSING GALVAN SECURE DATABASE...';
            decryptMsg.style.color = '#ff1414';
            decryptSubmit.disabled = true;
            setTimeout(() => {
                if (code === 'AZMUTH' || code === 'OMNITRIX' || code === 'PRIMUS') {
                    decryptMsg.style.color = '#39ff14';
                    decryptMsg.innerText = 'DECRYPTION SUCCESSFUL. DNA STREAM RESTORED.';
                    const pool = [...database.aliens, ...database.characters];
                    const currentUnlockedNames = aliens.map(a => a.name);
                    const available = pool.filter(p => !currentUnlockedNames.includes(p.name));
                    const source = available.length > 0 ? available : pool;
                    const randomDNA = source[Math.floor(Math.random() * source.length)];
                    const newEntry = {
                        id: Date.now(),
                        name: randomDNA.name,
                        species: randomDNA.species || randomDNA.role || "LEGENDARY ENTITY",
                        planet: randomDNA.planet,
                        series: randomDNA.series || "BEN 10 UNIVERSE",
                        image_url: randomDNA.image_url || "https://via.placeholder.com/200x200/0a1a0a/39FF14?text=CHARACTER",
                        powers: randomDNA.powers || ["Unique Character Abilities"],
                        weaknesses: randomDNA.weaknesses || ["Standard Vulnerabilities"],
                        description: randomDNA.description,
                        unlock_status: 'ACTIVE'
                    };
                    const targetIdx = aliens.findIndex(a => a.id === targetAlien.id);
                    if (targetIdx !== -1) {
                        aliens[targetIdx] = newEntry;
                        aliens.push({
                            id: Date.now() + 1,
                            name: "LOCKED DNA",
                            species: "UNKNOWN",
                            planet: "UNKNOWN",
                            series: "???",
                            image_url: "",
                            powers: [],
                            weaknesses: [],
                            description: "DNA SEQUENCE ENCRYPTED. CLICK TO DECRYPT A RANDOM DNA STREAM FROM THE DATABASE.",
                            unlock_status: "LOCKED"
                        });
                    }
                    setTimeout(() => {
                        decryptModal.style.display = 'none';
                        decryptSubmit.disabled = false;
                        if (flashOverlay) {
                            flashOverlay.style.background = '#39ff14';
                            flashOverlay.classList.remove('flash-active');
                            void flashOverlay.offsetWidth;
                            flashOverlay.classList.add('flash-active');
                        }
                        applyFilters();
                    }, 1500);
                } else {
                    decryptMsg.style.color = '#ff1414';
                    decryptMsg.innerText = 'ERR: INVALID SECURITY KEY. ACCESS DENIED.';
                    decryptSubmit.disabled = false;
                }
            }, 1500);
        });
    }

    function applyFilters() {
        const s = searchBar.value.toLowerCase().trim();
        const ser = filterSeries.value;
        const p = filterPower.value;
        const sortVal = sortAliens ? sortAliens.value : 'id';
        let filtered = aliens.filter(a => {
            const mS = a.name.toLowerCase().includes(s) || a.species.toLowerCase().includes(s) || (a.planet && a.planet.toLowerCase().includes(s));
            const mSer = !ser || a.series === ser;
            const mP = !p || (a.powers && a.powers.some(pw => pw.toLowerCase().includes(p.toLowerCase())));
            return mS && mSer && mP;
        });
        filtered.sort((a, b) => {
            if (sortVal === 'name') return a.name.localeCompare(b.name);
            if (sortVal === 'series') return a.series.localeCompare(b.series);
            return a.id - b.id;
        });
        renderAliens(filtered);
        interact();
    }

    [searchBar, filterSeries, filterPower, sortAliens].forEach(el => {
        if (el) el.addEventListener('input', applyFilters);
    });

    function openModal(alien) {
        const visualContent = alien.model_url 
            ? `<model-viewer src="${alien.model_url}" poster="${alien.image_url}" auto-rotate camera-controls shadow-intensity="1" style="width: 100%; height: 100%;" background-color="#000"></model-viewer>`
            : `<div class="pan-container" id="pan-box"><img src="${alien.image_url}" class="pan-image" id="pan-img"></div>`;

        modalDetails.innerHTML = `
            <div class="modal-visual">
                <div class="laser-scan"></div>
                <div class="biometric-box">
                    <div style="font-size: 0.5rem; color: var(--neon-green);">BPM: 72</div>
                    <div class="heartbeat-line"></div>
                </div>
                ${visualContent}
            </div>
            <div class="modal-data">
                <div class="data-header">
                    <h2 id="modal-alien-name" style="font-family: 'Orbitron'; font-size: 2.5rem;">${alien.name}</h2>
                    <div id="modal-alien-species" style="color: var(--neon-green); letter-spacing: 3px;">${alien.species} | ${alien.planet}</div>
                </div>
                <div style="margin-top: 20px;"><span style="color: #666; font-size: 0.8rem; letter-spacing: 2px;">DATABASE ENTRY</span><p class="text-content" id="type-text"></p></div>
                <div><span style="color: #666; font-size: 0.8rem; letter-spacing: 2px;">COMBAT ABILITIES</span><div id="modal-powers">${alien.powers.map(p => `<span class="ability-tag">${p}</span>`).join('')}</div></div>
                <div style="margin-top: 20px;"><span style="color: #666; font-size: 0.8rem; letter-spacing: 2px;">KNOWN WEAKNESSES</span><div id="modal-weaknesses" style="color: #ff5555; border-left: 2px solid #ff5555; padding-left: 10px; margin-top: 10px;">${alien.weaknesses.join(' • ')}</div></div>
                ${alien.can_evolve ? `<button id="evolve-btn" class="evolve-btn">ULTIMATE EVOLUTION</button>` : ''}
            </div>
        `;

        const evolveBtn = document.getElementById('evolve-btn');
        if (evolveBtn) {
            evolveBtn.addEventListener('click', () => {
                const ult = alien.ultimate_data;
                if (!ult) return;
                if (flashOverlay) {
                    flashOverlay.style.background = '#ff1414';
                    flashOverlay.classList.remove('flash-active');
                    void flashOverlay.offsetWidth;
                    flashOverlay.classList.add('flash-active');
                }
                if (transformSfx) transformSfx.play().catch(() => {});
                document.getElementById('modal-alien-name').innerText = ult.name;
                document.getElementById('modal-powers').innerHTML = ult.powers.map(p => `<span class="ability-tag" style="border-color: #ff1414; color: #ff1414;">${p}</span>`).join('');
                document.getElementById('type-text').innerText = ult.description;
                document.getElementById('modal-alien-name').style.color = '#ff1414';
                const modalImg = document.querySelector('.pan-image');
                if (modalImg) modalImg.src = ult.image_url;
                evolveBtn.style.display = 'none';
            });
        }
        
        const panBox = document.getElementById('pan-box');
        const panImg = document.getElementById('pan-img');
        if (panBox && panImg) {
            panBox.addEventListener('mousemove', (e) => {
                const rect = panBox.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const moveX = x * -50; 
                const moveY = y * -50;
                panImg.style.transform = `translate(${moveX}%, ${moveY}%)`;
            });
            panBox.addEventListener('mouseleave', () => { panImg.style.transform = `translate(-25%, -25%)`; });
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        let j = 0;
        const type = () => { 
            if (j < alien.description.length) { 
                document.getElementById('type-text').innerHTML += alien.description.charAt(j); 
                j++; 
                const progress = j / alien.description.length;
                if (panImg) panImg.style.opacity = progress;
                const modelViewer = document.querySelector('model-viewer');
                if (modelViewer) modelViewer.style.opacity = progress;
                setTimeout(type, 2); 
            }
        };
        type();
    }

    closeModal.addEventListener('click', () => { modal.style.display = 'none'; document.body.style.overflow = 'auto'; });
    window.addEventListener('click', (e) => { if (e.target.classList.contains('modal-overlay')) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; } });

    const cvs = document.getElementById('bg-canvas');
    const ctx = cvs.getContext('2d');
    let pts = [];
    cvs.width = window.innerWidth; cvs.height = window.innerHeight;
    let m = { x: null, y: null, r: (cvs.height/80)*(cvs.width/80) };
    window.addEventListener('mousemove', (e) => { m.x = e.clientX; m.y = e.clientY; });

    class Pt {
        constructor(x,y,dx,dy,s){this.x=x;this.y=y;this.dx=dx;this.dy=dy;this.s=s;}
        draw(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.s,0,Math.PI*2);
            const color = document.body.classList.contains('red-mode') ? '#ff1414' : '#39FF14';
            ctx.fillStyle = color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
        update(){
            if(this.x>cvs.width||this.x<0)this.dx=-this.dx;
            if(this.y>cvs.height||this.y<0)this.dy=-this.dy;
            let d = Math.sqrt((m.x-this.x)**2+(m.y-this.y)**2);
            if(d < 150){ 
                const forceX = (this.x - m.x) / 10;
                const forceY = (this.y - m.y) / 10;
                this.x += forceX;
                this.y += forceY;
            }
            this.x+=this.dx;this.y+=this.dy;this.draw();
        }
    }
    const init = () => {
        pts=[]; let n=(cvs.height*cvs.width)/9000;
        for(let k=0;k<n;k++){let s=(Math.random()*2)+1;pts.push(new Pt(Math.random()*cvs.width,Math.random()*cvs.height,(Math.random()*2)-1,(Math.random()*2)-1,s));}
    };
    const anim = () => {
        requestAnimationFrame(anim); ctx.clearRect(0,0,cvs.width,cvs.height);
        pts.forEach(p=>p.update());
        for(let a=0;a<pts.length;a++){for(let b=a;b<pts.length;b++){
            let d=((pts[a].x-pts[b].x)**2)+((pts[a].y-pts[b].y)**2);
            if(d<(cvs.width/7)*(cvs.height/7)){
                const color = document.body.classList.contains('red-mode') ? '255,20,20' : '57,255,20';
                ctx.strokeStyle=`rgba(${color},${1-(d/20000)})`;
                ctx.lineWidth=1;
                ctx.beginPath();
                ctx.moveTo(pts[a].x,pts[a].y);
                ctx.lineTo(pts[b].x,pts[b].y);
                ctx.stroke();
            }
        }}
    };
    window.addEventListener('resize',()=>{cvs.width=window.innerWidth;cvs.height=window.innerHeight;init();});
    init(); anim();
});
