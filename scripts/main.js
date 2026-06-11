/**
 * 高级个人简历网站 - 交互逻辑
 */

(function() {
    'use strict';
    
    // ===== 配置 =====
    const CONFIG = {
        typingSpeed: 80,
        typingDeleteSpeed: 50,
        typingPause: 2000,
        countUpDuration: 2000,
        scrollThreshold: 50
    };
    
    // 打字机文字
    const TYPING_TEXTS = [
        '前端开发工程师',
        'React 技术专家',
        'Vue.js 开发者',
        '全栈架构师',
        '开源贡献者'
    ];
    
    // ===== 主题切换 =====
    function initTheme() {
        const html = document.documentElement;
        const themeBtn = document.querySelector('.theme-btn');
        const icon = themeBtn?.querySelector('i');
        
        // 默认暗色模式
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-bs-theme', savedTheme);
        updateIcon(savedTheme, icon);
        
        themeBtn?.addEventListener('click', () => {
            const current = html.getAttribute('data-bs-theme');
            const next = current === 'light' ? 'dark' : 'light';
            html.setAttribute('data-bs-theme', next);
            localStorage.setItem('theme', next);
            updateIcon(next, icon);
        });
    }
    
    function updateIcon(theme, icon) {
        if (!icon) return;
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.className = theme === 'light' ? 'bi bi-sun-stars' : 'bi bi-moon-stars';
            icon.style.transform = 'rotate(0deg)';
        }, 200);
    }
    
    // ===== 导航栏 =====
    function initNavbar() {
        const navbar = document.querySelector('.glass-nav');
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');
        
        // 滚动监听
        window.addEventListener('scroll', () => {
            // 背景变化
            if (window.scrollY > CONFIG.scrollThreshold) {
                navbar?.classList.add('scrolled');
            } else {
                navbar?.classList.remove('scrolled');
            }
            
            // 活跃导航项
            let current = '';
            sections.forEach(section => {
                const top = section.offsetTop - 100;
                if (window.scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === '#' + current) {
                    item.classList.add('active');
                }
            });
        });
        
        // 平滑滚动
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const href = item.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    target?.scrollIntoView({ behavior: 'smooth' });
                    
                    // 关闭移动端菜单
                    const collapse = document.querySelector('#navMenu');
                    if (collapse?.classList.contains('show')) {
                        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
                    }
                }
            });
        });
    }
    
    // ===== 打字机效果 =====
    function initTyping() {
        const element = document.getElementById('typingText');
        if (!element) return;
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const text = TYPING_TEXTS[textIndex];
            
            if (isDeleting) {
                element.textContent = text.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % TYPING_TEXTS.length;
                    setTimeout(type, CONFIG.typingPause);
                } else {
                    setTimeout(type, CONFIG.typingDeleteSpeed);
                }
            } else {
                element.textContent = text.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === text.length) {
                    isDeleting = true;
                    setTimeout(type, CONFIG.typingPause);
                } else {
                    setTimeout(type, CONFIG.typingSpeed);
                }
            }
        }
        
        setTimeout(type, 800);
    }
    
    // ===== 数字滚动 =====
    function initCountUp() {
        const counters = document.querySelectorAll('.counter');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseInt(target.getAttribute('data-target')) || 0;
                    animateCount(target, value);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    function animateCount(element, target) {
        const start = performance.now();
        
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / CONFIG.countUpDuration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);
            
            element.textContent = value;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // ===== 技能进度条 =====
    function initSkillBars() {
        const bars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const progress = bar.getAttribute('data-progress') || 0;
                    bar.style.width = progress + '%';
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });
        
        bars.forEach(bar => observer.observe(bar));
    }
    
    // ===== 作品筛选 =====
    function initProjectFilter() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projects = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                
                // 更新按钮状态
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 筛选项目
                projects.forEach(project => {
                    const category = project.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        project.classList.remove('hidden');
                        project.style.display = '';
                    } else {
                        project.classList.add('hidden');
                        setTimeout(() => {
                            if (project.classList.contains('hidden')) {
                                project.style.display = 'none';
                            }
                        }, 400);
                    }
                });
            });
        });
    }
    
    // ===== 表单处理 =====
    function initContactForm() {
        const form = document.getElementById('contactForm');
        
        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = form.querySelector('#name')?.value;
            const email = form.querySelector('#email')?.value;
            const message = form.querySelector('#message')?.value;
            
            if (!name || !email || !message) {
                alert('请填写所有字段');
                return;
            }
            
            // 模拟提交
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="bi bi-check-circle"></i> 已发送';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                form.reset();
                alert('感谢您的留言！我会尽快回复。');
            }, 1500);
        });
    }
    
    // ===== 返回顶部 =====
    function initBackToTop() {
        const btn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                btn?.classList.add('visible');
            } else {
                btn?.classList.remove('visible');
            }
        });
        
        btn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // ===== 入场动画 =====
    function initFadeIn() {
        const elements = document.querySelectorAll('.glass-card, .stat-item, .timeline-item');
        
        elements.forEach(el => el.classList.add('fade-in'));
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        elements.forEach(el => observer.observe(el));
    }
    
    // ===== 初始化 =====
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initNavbar();
        initTyping();
        initCountUp();
        initSkillBars();
        initProjectFilter();
        initContactForm();
        initBackToTop();
        initFadeIn();
    });
    
})();