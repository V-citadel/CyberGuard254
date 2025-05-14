// Article data (in a real application, this would come from a backend)
const articles = [
    {
        id: 1,
        title: "Rising SIM Swap Scams in Kenya: How to Protect Yourself",
        excerpt: "Learn about the increasing threat of SIM swap fraud in Kenya and practical steps to safeguard your mobile number.",
        category: "Mobile Security",
        date: "2025-03-15",
        readTime: "5 min read"
    },
    {
        id: 2,
        title: "Phishing Attacks Targeting Kenyan Businesses",
        excerpt: "An in-depth analysis of recent phishing campaigns targeting Kenyan businesses and how to identify them.",
        category: "Business Security",
        date: "2025-03-10",
        readTime: "7 min read"
    },
    {
        id: 3,
        title: "Data Privacy Regulations in Kenya: What You Need to Know",
        excerpt: "Understanding Kenya's data protection laws and their implications for businesses and individuals.",
        category: "Privacy",
        date: "2025-03-05",
        readTime: "6 min read"
    },
    {
        id: 4,
        title: "Cybersecurity Awareness: Training Programs in Kenya",
        excerpt: "Overview of cybersecurity training initiatives and resources available in Kenya.",
        category: "Education",
        date: "2025-03-01",
        readTime: "4 min read"
    }
];

// Search functionality
const searchInput = document.querySelector('.search-input');
const articlesGrid = document.querySelector('.articles-grid');

function filterArticles(query) {
    query = query.toLowerCase();
    
    return articles.filter(article => {
        return article.title.toLowerCase().includes(query) ||
               article.excerpt.toLowerCase().includes(query) ||
               article.category.toLowerCase().includes(query);
    });
}

function displayArticles(articles) {
    if (!articlesGrid) return;
    
    articlesGrid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="article-content">
                <span class="category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <div class="article-meta">
                    <span class="date">${article.date}</span>
                    <span class="read-time">${article.readTime}</span>
                </div>
                <a href="article.html?id=${article.id}" class="btn">Read More</a>
            </div>
        </article>
    `).join('');
}

// Initial display of all articles
displayArticles(articles);

// Search input handler
searchInput?.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    const filteredArticles = query ? filterArticles(query) : articles;
    displayArticles(filteredArticles);
});

// Category filter
const categoryFilters = document.querySelectorAll('.category-filter');

categoryFilters?.forEach(filter => {
    filter.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        const filteredArticles = category === 'all' 
            ? articles 
            : articles.filter(article => article.category === category);
        
        displayArticles(filteredArticles);
        
        // Update active state
        categoryFilters.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
    });
}); 