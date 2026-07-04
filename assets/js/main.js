// 主要的JavaScript功能文件

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航菜单切换
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuButton && navMenu) {
        mobileMenuButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
        });
    }
    
    // 选项卡功能
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // 移除所有激活状态
                tabButtons.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // 添加当前激活状态
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                performSearch(this.value);
            }
        });
    }
    
    // 产品筛选功能
    const filterOptions = document.querySelectorAll('.filter-option');
    if (filterOptions) {
        filterOptions.forEach(option => {
            option.addEventListener('click', function() {
                // 移除所有激活状态
                filterOptions.forEach(opt => opt.classList.remove('active'));
                
                // 添加当前激活状态
                this.classList.add('active');
                
                // 过滤产品
                const filterValue = this.getAttribute('data-filter');
                filterProducts(filterValue);
            });
        });
    }
    
    // 表单验证
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('请填写所有必填字段');
            }
        });
    });
    
    // 添加到购物车动画
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 添加动画效果
                this.textContent = '已添加';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = '添加到购物车';
                    this.disabled = false;
                }, 2000);
                
                // 更新购物车计数
                updateCartCount();
            });
        });
    }
    
    // 平滑滚动到锚点
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    if (anchorLinks) {
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    // 这里可以添加图片加载逻辑
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // 购物车功能
    function updateCartCount() {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            let count = parseInt(cartCountElement.textContent) || 0;
            cartCountElement.textContent = count + 1;
        }
    }
    
    // 产品过滤功能
    function filterProducts(category) {
        const products = document.querySelectorAll('.product-card, .guide-card, .article-card');
        
        products.forEach(product => {
            if (category === 'all' || product.classList.contains(category)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
    
    // 搜索功能
    function performSearch(query) {
        if (query.length < 2) {
            alert('请输入至少2个字符进行搜索');
            return;
        }
        
        // 这里可以实现实际的搜索逻辑
        console.log(`搜索: ${query}`);
        alert(`搜索功能将在后续版本中实现，搜索词: ${query}`);
    }
    
    // 交互式轮播图功能（如果存在）
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        let currentIndex = 0;
        const slides = carousel.querySelectorAll('.slide');
        const dots = carousel.querySelectorAll('.dot');
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // 自动播放
        setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        }, 5000);
        
        // 点击指示器
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });
    }
    
    // 评论功能（如果存在）
    const commentForm = document.querySelector('#comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.querySelector('#comment-name').value;
            const email = document.querySelector('#comment-email').value;
            const comment = document.querySelector('#comment-text').value;
            
            if (name && email && comment) {
                // 在这里添加提交评论的逻辑
                alert('评论提交成功！');
                commentForm.reset();
            } else {
                alert('请填写所有必填字段');
            }
        });
    }
});

// 工具函数
const Utils = {
    // 格式化货币
    formatCurrency: function(amount, currency = 'CNY') {
        return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // 验证邮箱格式
    validateEmail: function(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 获取URL参数
    getUrlParameter: function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
};

// 页面特定功能
const PageFeatures = {
    // 博客页面功能
    initBlogPage: function() {
        const shareButtons = document.querySelectorAll('.share-btn');
        if (shareButtons) {
            shareButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const platform = this.getAttribute('data-platform');
                    const url = encodeURIComponent(window.location.href);
                    const title = encodeURIComponent(document.title);
                    
                    let shareUrl = '';
                    switch(platform) {
                        case 'twitter':
                            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                            break;
                        case 'facebook':
                            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                            break;
                        case 'weibo':
                            shareUrl = `https://service.weibo.com/share/share.php?url=${url}&title=${title}`;
                            break;
                    }
                    
                    if (shareUrl) {
                        window.open(shareUrl, '_blank', 'width=600,height=400');
                    }
                });
            });
        }
    },
    
    // 产品页面功能
    initProductPage: function() {
        const colorOptions = document.querySelectorAll('.color-option');
        if (colorOptions) {
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    colorOptions.forEach(opt => opt.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }
        
        // 图片放大功能
        const productImages = document.querySelectorAll('.product-image img, .thumbnail-image');
        if (productImages) {
            productImages.forEach(img => {
                img.addEventListener('click', function() {
                    // 创建模态框显示大图
                    const modal = document.createElement('div');
                    modal.className = 'image-modal';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <img src="${this.src}" alt="${this.alt}">
                        </div>
                    `;
                    
                    document.body.appendChild(modal);
                    
                    modal.querySelector('.close').addEventListener('click', function() {
                        document.body.removeChild(modal);
                    });
                    
                    modal.addEventListener('click', function(e) {
                        if (e.target === modal) {
                            document.body.removeChild(modal);
                        }
                    });
                });
            });
        }
    }
};

// 如果是博客页面，初始化博客功能
if (document.body.classList.contains('blog-page')) {
    PageFeatures.initBlogPage();
}

// 如果是产品页面，初始化产品功能
if (document.body.classList.contains('product-page')) {
    PageFeatures.initProductPage();
}

// 滚动事件监听
let ticking = false;

function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header');
    
    if (header) {
        if (scrolled > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
});