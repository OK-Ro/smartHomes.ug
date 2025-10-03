// Smart Home Website JavaScript - Complete Scroll-Triggered Animations + Voice Assistant
document.addEventListener("DOMContentLoaded", function () {
    // ===== INITIALIZATION =====
    initHeaderScroll();
    initMobileMenu();
    initVoiceAssistant();
    initScrollAnimations();
    initDeviceCards();
    initActivityFeed();
    initMagneticButtons();
    initCardHoverEffects();
    initSmoothScrolling();
    initLazyLoading();
    initDynamicStyles();
    initPerformanceOptimizations();
    initConsoleGreeting();
    initClientsSection();
    initStatsAnimation();
    initWhatsAppWidget();
    initFooterFeatures();
});

// ===== HEADER FUNCTIONS =====
function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (header) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 100) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
}

function initMobileMenu() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", function () {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            document.body.style.overflow = navMenu.classList.contains("active") ? "hidden" : "";
        });

        const navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });

        document.addEventListener("click", function (e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
}

// ===== ANIMATION FUNCTIONS =====
function animateValue(element, start, end, duration, suffix = "") {
    const startTime = performance.now();
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (end - start) * easedProgress);

        if (suffix === "%") {
            element.textContent = (start + (end - start) * easedProgress).toFixed(1) + suffix;
        } else if (suffix === "K+") {
            element.textContent = (current / 1000).toFixed(0) + suffix;
        } else if (suffix === "+") {
            element.textContent = current + suffix;
        } else {
            element.textContent = current + suffix;
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            if (suffix === "%") {
                element.textContent = end.toFixed(1) + suffix;
            } else if (suffix === "K+") {
                element.textContent = (end / 1000).toFixed(0) + suffix;
            } else {
                element.textContent = end + suffix;
            }
        }
    }

    requestAnimationFrame(update);
}

// ===== VOICE ASSISTANT =====
function initVoiceAssistant() {
    const voiceAssistant = {
        queries: [
            "Hey Smart Home, turn on the living room lights",
            "Set the temperature to 22 degrees",
            "Lock all the doors and activate security",
            "Play some jazz music in the kitchen",
        ],
        responses: [
            "Turning on living room lights. Creating a cozy atmosphere for you.",
            "Temperature set to 22°C. Perfect comfort level activated.",
            "All doors locked and security system armed. Your home is secure.",
            "Playing smooth jazz in the kitchen. Enjoy your cooking session!",
        ],
        currentIndex: 0,
        isListening: false,

        init() {
            this.setupVoiceTrigger();
            this.setupActionCards();

            const bannerObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            this.startDemoSequence();
                            bannerObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            const banner = document.querySelector(".integration-banner");
            if (banner) bannerObserver.observe(banner);
        },

        startDemoSequence() {
            setTimeout(() => {
                this.simulateQuery(0);
            }, 1000);
        },

        simulateQuery(index) {
            const queryBubble = document.querySelector(".query-bubble");
            const queryText = document.querySelector(".query-text");
            const responseBubble = document.querySelector(".response-text");

            if (!queryBubble || !queryText || !responseBubble) return;

            queryBubble.classList.add("typing");
            queryText.textContent = "";

            this.typeText(this.queries[index], queryText, () => {
                queryBubble.classList.remove("typing");

                setTimeout(() => {
                    responseBubble.textContent = "";
                    this.typeText(this.responses[index], responseBubble, () => {
                        this.currentIndex = (index + 1) % this.queries.length;
                        setTimeout(() => {
                            this.simulateQuery(this.currentIndex);
                        }, 3000);
                    });
                }, 500);
            });
        },

        typeText(text, element, callback, speed = 30) {
            let i = 0;
            element.textContent = "";

            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else if (callback) {
                    callback();
                }
            }

            type();
        },

        setupVoiceTrigger() {
            const trigger = document.querySelector(".trigger-circle");
            const statusText = document.querySelector(".status-text");

            if (!trigger || !statusText) return;

            trigger.addEventListener("click", () => {
                this.isListening = !this.isListening;

                if (this.isListening) {
                    trigger.classList.add("listening");
                    statusText.textContent = "Listening...";
                    this.animateListening();
                } else {
                    trigger.classList.remove("listening");
                    statusText.textContent = "Ready";
                }
            });
        },

        animateListening() {
            if (this.isListening) {
                const trigger = document.querySelector(".trigger-circle");
                if (trigger) {
                    trigger.style.animation = "listeningPulse 1s ease-in-out infinite";
                }
            }
        },

        setupActionCards() {
            const actionCards = document.querySelectorAll(".action-card");

            actionCards.forEach((card) => {
                card.addEventListener("click", () => {
                    actionCards.forEach((c) => c.classList.remove("active"));
                    card.classList.add("active");

                    const wave = card.querySelector(".action-wave");
                    if (wave) {
                        wave.style.animation = "none";
                        setTimeout(() => {
                            wave.style.animation = "waveExpand 0.6s ease-out";
                        }, 10);
                    }

                    this.simulateAction(card.dataset.action);
                });
            });
        },

        simulateAction(action) {
            const actions = {
                lights: "💡 Lights activated in living room",
                climate: "🌡️ Climate set to optimal temperature",
                security: "🛡️ Security system activated",
                entertainment: "🎵 Entertainment system ready",
            };

            this.showActionNotification(actions[action]);
        },

        showActionNotification(message) {
            const notification = document.createElement("div");
            notification.className = "action-notification";
            notification.textContent = message;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 107, 0, 0.9);
                color: white;
                padding: 12px 20px;
                border-radius: 12px;
                font-weight: 600;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            `;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.transform = "translateX(0)";
            }, 100);

            setTimeout(() => {
                notification.style.transform = "translateX(100%)";
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        },
    };

    voiceAssistant.init();
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    resetAnimationClasses(entry.target);
                    setTimeout(() => {
                        handleElementAnimation(entry.target);
                    }, 50);
                } else {
                    resetAnimationClasses(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
        }
    );

    const allAnimatableElements = document.querySelectorAll(`
        .stat-number, .solution-card, .story-card, .feature-card, .section-title,
        .section-subtitle, .hero-badge, .card-icon, .feature-list, .integration-banner,
        .tech-logo, .visual-icon, .card-stats, .activity-feed, .smart-home-dashboard,
        .device-card, .btn, .hero-title, .hero-description, .visual-graph, 
        .phone-mockup, .action-card, .voice-assistant-demo, .platform-item,
        .query-bubble, .response-bubble, .slide-in-left, .slide-in-right, .fade-in
    `);

    allAnimatableElements.forEach((element) => {
        animationObserver.observe(element);
    });
}

function resetAnimationClasses(element) {
    const animationClasses = [
        "animate-in", "title-animate", "subtitle-animate", "badge-animate",
        "icon-animate", "feature-animate", "banner-animate", "logo-animate",
        "visual-icon-animate", "stat-animate", "feed-animate", "dashboard-animate",
        "device-card-animate", "button-animate", "hero-title-animate",
        "hero-description-animate", "graph-animate", "chart-animate", "phone-animate",
        "action-card-animate", "assistant-demo-animate", "platform-item-animate", "animate"
    ];

    animationClasses.forEach((className) => {
        element.classList.remove(className);
    });

    if (element.classList.contains("feature-list")) {
        const features = element.querySelectorAll("li");
        features.forEach((feature) => {
            feature.classList.remove("feature-animate");
        });
    }

    if (element.classList.contains("card-stats")) {
        const stats = element.querySelectorAll(".stat");
        stats.forEach((stat) => {
            stat.classList.remove("stat-animate");
        });
    }

    if (element.classList.contains("visual-graph")) {
        const bars = element.querySelectorAll(".graph-bar");
        bars.forEach((bar) => {
            bar.classList.remove("graph-animate");
        });
    }
}

function handleElementAnimation(element) {
    if (element.classList.contains("stat-number")) {
        const finalValue = element.textContent.trim();
        let numericValue, suffix;

        if (finalValue.includes("%")) {
            numericValue = parseFloat(finalValue);
            suffix = "%";
        } else if (finalValue.includes("K+")) {
            numericValue = parseInt(finalValue) * 1000;
            suffix = "K+";
        } else if (finalValue.includes("+")) {
            numericValue = parseInt(finalValue);
            suffix = "+";
        } else {
            numericValue = parseInt(finalValue);
            suffix = "";
        }

        animateValue(element, 0, numericValue, 2000, suffix);
    } else if (
        element.classList.contains("solution-card") ||
        element.classList.contains("story-card") ||
        element.classList.contains("feature-card")
    ) {
        element.classList.add("animate-in");
    } else if (element.classList.contains("section-title")) {
        element.classList.add("title-animate");
    } else if (element.classList.contains("section-subtitle")) {
        element.classList.add("subtitle-animate");
    } else if (element.classList.contains("hero-badge")) {
        element.classList.add("badge-animate");
    } else if (element.classList.contains("card-icon")) {
        element.classList.add("icon-animate");
    } else if (element.classList.contains("feature-list")) {
        const features = element.querySelectorAll("li");
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add("feature-animate");
            }, index * 150);
        });
    } else if (element.classList.contains("integration-banner")) {
        element.classList.add("banner-animate");
    } else if (element.classList.contains("tech-logo")) {
        element.classList.add("logo-animate");
    } else if (element.classList.contains("visual-icon")) {
        element.classList.add("visual-icon-animate");
    } else if (element.classList.contains("card-stats")) {
        const stats = element.querySelectorAll(".stat");
        stats.forEach((stat, index) => {
            setTimeout(() => {
                stat.classList.add("stat-animate");
            }, index * 200);
        });
    } else if (element.classList.contains("activity-feed")) {
        element.classList.add("feed-animate");
    } else if (element.classList.contains("smart-home-dashboard")) {
        element.classList.add("dashboard-animate");
    } else if (element.classList.contains("device-card")) {
        element.classList.add("device-card-animate");
    } else if (element.classList.contains("btn")) {
        element.classList.add("button-animate");
    } else if (element.classList.contains("hero-title")) {
        element.classList.add("hero-title-animate");
    } else if (element.classList.contains("hero-description")) {
        element.classList.add("hero-description-animate");
    } else if (element.classList.contains("visual-graph")) {
        const bars = element.querySelectorAll(".graph-bar");
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = bar.style.height;
                bar.classList.add("graph-animate");
            }, index * 100);
        });
    } else if (element.classList.contains("visual-chart")) {
        element.classList.add("chart-animate");
    } else if (element.classList.contains("phone-mockup")) {
        element.classList.add("phone-animate");
    } else if (element.classList.contains("action-card")) {
        element.classList.add("action-card-animate");
    } else if (element.classList.contains("voice-assistant-demo")) {
        element.classList.add("assistant-demo-animate");
    } else if (element.classList.contains("platform-item")) {
        element.classList.add("platform-item-animate");
    } else if (
        element.classList.contains("slide-in-left") ||
        element.classList.contains("slide-in-right") ||
        element.classList.contains("fade-in")
    ) {
        element.classList.add("animate");
    }
}

// ===== INTERACTIVE COMPONENTS =====
function initDeviceCards() {
    const deviceCards = document.querySelectorAll(".device-card");
    deviceCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
            const status = this.querySelector(".device-status");
            const icon = this.querySelector(".device-icon");

            if (status && status.textContent === "Active") {
                status.style.color = "#10b981";
                status.style.textShadow = "0 0 8px rgba(16, 185, 129, 0.5)";
            } else if (status && status.textContent === "Locked") {
                status.style.color = "#ef4444";
                status.style.textShadow = "0 0 8px rgba(239, 68, 68, 0.5)";
            } else if (status && status.textContent === "Auto") {
                status.style.color = "#3b82f6";
                status.style.textShadow = "0 0 8px rgba(59, 130, 246, 0.5)";
            }

            if (icon) {
                icon.style.animation = "enhancedPulse 0.8s ease-in-out";
            }
        });

        card.addEventListener("mouseleave", function () {
            const status = this.querySelector(".device-status");
            const icon = this.querySelector(".device-icon");

            if (status) {
                status.style.color = "#10b981";
                status.style.textShadow = "none";
            }
            if (icon) {
                icon.style.animation = "";
            }
        });

        card.addEventListener("click", function () {
            this.style.transform = "scale(0.95)";
            this.style.boxShadow = "0 0 20px rgba(255, 107, 0, 0.4)";
            setTimeout(() => {
                this.style.transform = "";
                this.style.boxShadow = "";
            }, 200);
        });
    });
}

function initActivityFeed() {
    const activityFeed = document.querySelector(".activity-feed");
    if (activityFeed) {
        const activities = [
            "💡 Living room lights adjusted - Just now",
            "🌡️ Temperature set to 22°C - 1 min ago",
            "🔒 Back door unlocked - 3 min ago",
            "📹 Backyard camera activated - 4 min ago",
            "🔊 Music volume lowered - 5 min ago",
            "🚗 Garage door closed - 6 min ago",
            "💧 Sprinkler system activated - 7 min ago",
            "🔋 Solar panels at 85% efficiency - 8 min ago",
        ];

        let activityIndex = 0;

        setTimeout(() => {
            const updateInterval = setInterval(() => {
                if (activityIndex < activities.length) {
                    const newActivity = document.createElement("div");
                    newActivity.className = "activity-item";
                    newActivity.textContent = activities[activityIndex];
                    newActivity.style.opacity = "0";
                    newActivity.style.transform = "translateX(-20px)";

                    activityFeed.appendChild(newActivity);

                    setTimeout(() => {
                        newActivity.style.opacity = "1";
                        newActivity.style.transform = "translateX(0)";
                    }, 50);

                    if (activityFeed.children.length > 1) {
                        const oldestActivity = activityFeed.children[0];
                        oldestActivity.style.opacity = "0";
                        oldestActivity.style.transform = "translateX(-20px)";
                        setTimeout(() => {
                            if (oldestActivity.parentNode) {
                                oldestActivity.remove();
                            }
                        }, 300);
                    }

                    activityIndex++;
                } else {
                    clearInterval(updateInterval);
                }
            }, 5000);
        }, 2000);
    }
}

function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll(".btn, .btn-large");
    magneticButtons.forEach((button) => {
        button.classList.add("magnetic-btn");

        button.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = ((x - centerX) / centerX) * 20;
            const deltaY = ((y - centerY) / centerY) * 20;

            this.style.setProperty("--tx", `${deltaX}px`);
            this.style.setProperty("--ty", `${deltaY}px`);
        });

        button.addEventListener("mouseleave", function () {
            this.style.setProperty("--tx", "0px");
            this.style.setProperty("--ty", "0px");
        });

        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");

            const existingRipples = this.querySelectorAll(".ripple");
            existingRipples.forEach((ripple) => ripple.remove());

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 800);
        });
    });
}

function initCardHoverEffects() {
    const modernCards = document.querySelectorAll(".solution-card, .modern-card");
    modernCards.forEach((card) => {
        card.addEventListener("mousemove", function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = (x - centerX) / 20;
            const rotateX = (centerY - y) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            this.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.15), 
                                  ${rotateY * 2}px ${rotateX * 2}px 30px rgba(0, 0, 0, 0.1)`;
        });

        card.addEventListener("mouseleave", function () {
            this.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
            this.style.boxShadow = "";
        });
    });
}

// ===== NAVIGATION & UTILITIES =====
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector(".header").offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });
}

function initLazyLoading() {
    const lazyImages = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove("lazy");
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
}

// ===== STYLES & PERFORMANCE =====
function initDynamicStyles() {
    const dynamicStyles = document.createElement("style");
    dynamicStyles.textContent = `
        /* Scroll-triggered animation classes */
        .animate-in { animation: slideUpFade 0.8s ease-out forwards; }
        .title-animate { animation: titleReveal 1s ease-out forwards; }
        .subtitle-animate { animation: subtitleReveal 1s ease-out 0.2s forwards; opacity: 0; transform: translateY(30px); }
        .badge-animate { animation: badgePulse 0.6s ease-out forwards; }
        .icon-animate { animation: iconBounce 0.8s ease-out forwards; }
        .feature-animate { animation: featureSlide 0.5s ease-out forwards; opacity: 0; transform: translateX(-20px); }
        .banner-animate { animation: bannerReveal 1s ease-out forwards; }
        .logo-animate { animation: logoFloat 0.6s ease-out forwards; }
        .visual-icon-animate { animation: visualIconGlow 1s ease-out forwards; }
        .stat-animate { animation: statPop 0.5s ease-out forwards; }
        .feed-animate { animation: feedSlide 0.8s ease-out forwards; }
        .dashboard-animate { animation: dashboardAppear 1s ease-out forwards; }
        .device-card-animate { animation: deviceCardReveal 0.6s ease-out forwards; }
        .button-animate { animation: buttonSlide 0.5s ease-out forwards; }
        .hero-title-animate { animation: heroTitleReveal 1.2s ease-out forwards; }
        .hero-description-animate { animation: heroDescriptionReveal 1s ease-out 0.3s forwards; }
        .graph-animate { animation: graphGrow 1s ease-out forwards; }
        .chart-animate { animation: chartSpin 1.5s ease-out forwards; }
        .phone-animate { animation: phoneSlide 1s ease-out forwards; }
        .action-card-animate { animation: actionCardReveal 0.6s ease-out forwards; }
        .assistant-demo-animate { animation: assistantDemoReveal 1s ease-out forwards; }
        .platform-item-animate { animation: platformItemReveal 0.5s ease-out forwards; }

        /* Animation keyframes */
        @keyframes slideUpFade { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes titleReveal { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes subtitleReveal { to { opacity: 1; transform: translateY(0); } }
        @keyframes badgePulse { 0% { transform: scale(0.8); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes iconBounce { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        @keyframes featureSlide { to { opacity: 1; transform: translateX(0); } }
        @keyframes bannerReveal { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes logoFloat { 0% { transform: translateY(20px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes visualIconGlow { 0% { transform: scale(0); box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.7); } 50% { box-shadow: 0 0 0 20px rgba(255, 107, 0, 0); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 0, 0); } }
        @keyframes statPop { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes feedSlide { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes dashboardAppear { from { opacity: 0; transform: perspective(1000px) rotateX(10deg) translateY(50px); } to { opacity: 1; transform: perspective(1000px) rotateX(0) translateY(0); } }
        @keyframes deviceCardReveal { 0% { transform: scale(0.8) rotateY(-10deg); opacity: 0; } 100% { transform: scale(1) rotateY(0); opacity: 1; } }
        @keyframes buttonSlide { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes heroTitleReveal { from { clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%); opacity: 0; } to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); opacity: 1; } }
        @keyframes heroDescriptionReveal { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes graphGrow { from { height: 0%; } }
        @keyframes chartSpin { from { transform: rotate(-90deg); opacity: 0; } to { transform: rotate(0); opacity: 1; } }
        @keyframes phoneSlide { from { transform: translateX(100px) rotate(5deg); opacity: 0; } to { transform: translateX(0) rotate(0); opacity: 1; } }
        @keyframes actionCardReveal { 0% { transform: scale(0.8) translateY(20px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
        @keyframes assistantDemoReveal { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes platformItemReveal { 0% { transform: translateY(15px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        @keyframes enhancedPulse { 0%, 100% { transform: scale(1); filter: brightness(1); } 50% { transform: scale(1.15); filter: brightness(1.3); } }
        
        .magnetic-btn { position: relative; transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1); overflow: hidden; }
        .magnetic-btn:hover { transform: translate(var(--tx, 0), var(--ty, 0)) scale(1.05); }
        
        .ripple { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%); transform: scale(0); animation: enhancedRipple 0.8s ease-out; }
        @keyframes enhancedRipple { 0% { transform: scale(0); opacity: 1; } 100% { transform: scale(4); opacity: 0; } }
        
        .stat-number { display: inline-block; }

        /* Voice Assistant Specific Animations */
        @keyframes listeningPulse { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 107, 0, 0.7); } 50% { transform: scale(1.1); box-shadow: 0 0 0 20px rgba(255, 107, 0, 0); } }
        @keyframes waveExpand { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(2); opacity: 0; } }
    `;
    document.head.appendChild(dynamicStyles);
}

function initPerformanceOptimizations() {
    let ticking = false;

    function updateOnScroll() {
        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });
}

// ===== ADDITIONAL COMPONENTS =====
function initClientsSection() {
    const clientItems = document.querySelectorAll(".client-item");
    const clientsSection = document.querySelector(".clients-section");

    if (clientItems.length > 0 && clientsSection) {
        console.log("Initializing clients section with", clientItems.length, "items");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        clientItems.forEach((item, index) => {
                            setTimeout(() => {
                                item.classList.add("animate");
                            }, index * 100);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        observer.observe(clientsSection);
    }
}

function initStatsAnimation() {
    const stats = document.querySelectorAll(".client-stat");
    const statsSection = document.querySelector(".clients-stats");

    if (stats.length > 0 && statsSection) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        stats.forEach((stat, index) => {
                            setTimeout(() => {
                                stat.classList.add("animate");
                            }, index * 500);
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.3,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        observer.observe(statsSection);
    }
}

function initWhatsAppWidget() {
    const whatsappWidget = document.querySelector(".whatsapp-widget");
    const notificationBadge = document.getElementById("whatsappNotification");

    let userEngaged = false;
    let lastScrollTop = 0;

    function hideNotification() {
        if (notificationBadge && !userEngaged) {
            notificationBadge.style.display = "none";
            userEngaged = true;
            localStorage.setItem("whatsappEngaged", "true");
        }
    }

    if (localStorage.getItem("whatsappEngaged")) {
        if (notificationBadge) {
            notificationBadge.style.display = "none";
        }
        userEngaged = true;
    }

    const whatsappLinks = document.querySelectorAll(".whatsapp-link, .action-btn");
    whatsappLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            setTimeout(hideNotification, 100);

            const linkText = this.querySelector("span")
                ? this.querySelector("span").textContent
                : "Direct Click";
            console.log("WhatsApp clicked:", linkText);
        });
    });

    setTimeout(() => {
        if (!userEngaged && notificationBadge) {
            notificationBadge.style.animation = "pulse 2s infinite";
        }
    }, 10000);

    window.addEventListener(
        "scroll",
        function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (Math.abs(scrollTop - lastScrollTop) > 50) {
                lastScrollTop = scrollTop;
            }
        },
        { passive: true }
    );

    window.addEventListener("resize", function () {
        const widget = document.querySelector(".whatsapp-widget");
        if (widget) {
            widget.style.right = "25px";
            widget.style.bottom = "25px";
        }
    });

    if ("ontouchstart" in window) {
        let tapTimer;

        whatsappWidget.addEventListener(
            "touchstart",
            function (e) {
                tapTimer = setTimeout(() => {
                    this.classList.add("long-press");
                }, 500);
            },
            { passive: true }
        );

        whatsappWidget.addEventListener(
            "touchend",
            function (e) {
                clearTimeout(tapTimer);
                this.classList.remove("long-press");
            },
            { passive: true }
        );

        whatsappWidget.addEventListener("contextmenu", function (e) {
            e.preventDefault();
        });
    }

    function ensureHighZIndex() {
        const highestZIndex = Math.max(
            ...Array.from(document.querySelectorAll("*"))
                .map((el) => parseInt(window.getComputedStyle(el).zIndex))
                .filter((zIndex) => !isNaN(zIndex))
        );

        if (highestZIndex > 10000) {
            document.querySelector(".whatsapp-widget").style.zIndex = highestZIndex + 1;
        }
    }

    setTimeout(ensureHighZIndex, 1000);
}

function initFooterFeatures() {
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });

    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.querySelector(".newsletter-input").value;

            console.log("Newsletter subscription:", email);

            const button = this.querySelector("button");
            const originalText = button.innerHTML;

            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.background = "#10b981";

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = "";
                this.reset();
            }, 3000);
        });
    }

    const footerLinks = document.querySelectorAll('.footer-link[href^="#"]');
    footerLinks.forEach((link) => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    const copyright = document.querySelector(".copyright p");
    if (copyright) {
        const currentYear = new Date().getFullYear();
        copyright.innerHTML = copyright.innerHTML.replace("2024", currentYear);
    }
}

function initConsoleGreeting() {
    console.log(
        `%c🚀 Smart Home Website Loaded Successfully!%c\n\nComplete scroll-triggered animation system activated.\nVoice assistant integration ready.\nAnimations will replay on every scroll.`,
        "color: #ff6b00; font-size: 16px; font-weight: bold;",
        "color: #64748b; font-size: 12px;"
    );
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

function preloadImages() {
    const images = [];
    images.forEach((src) => {
        const img = new Image();
        img.src = src;
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", preloadImages);
} else {
    preloadImages();
}

// Animation on scroll
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".scale-in");
    animatedElements.forEach((el) => {
        observer.observe(el);
    });
});




// JavaScript for form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const submitBtn = this.querySelector('.submit-btn-cool');
  const originalText = submitBtn.querySelector('.btn-text').textContent;
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.querySelector('.btn-text').textContent = 'Securing Message...';
  
  // Get form data
  const formData = new FormData(this);
  
  // Send to Formspree
  fetch('https://formspree.io/f/xjvqkwaa', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Show success popup
      showSuccessPopup();
      // Reset form
      this.reset();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    alert('Sorry, there was a problem sending your message. Please try again or contact us directly.');
    console.error('Error:', error);
  })
  .finally(() => {
    // Reset button state
    submitBtn.classList.remove('loading');
    submitBtn.querySelector('.btn-text').textContent = originalText;
  });
});

function showSuccessPopup() {
  const popup = document.getElementById('successPopup');
  popup.classList.add('show');
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

function closeSuccessPopup() {
  const popup = document.getElementById('successPopup');
  popup.classList.remove('show');
  
  // Restore body scroll
  document.body.style.overflow = '';
}

// Close popup when clicking outside
document.getElementById('successPopup').addEventListener('click', function(e) {
  if (e.target === this) {
    closeSuccessPopup();
  }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeSuccessPopup();
  }
});