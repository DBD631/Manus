document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    let filteredItems = [...galleryItems];
    
    // Initialize gallery
    function initGallery() {
        // Add placeholder images directory
        createPlaceholderImages();
        
        // Add click event to gallery items
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });
        });
        
        // Lightbox controls
        closeLightbox.addEventListener('click', closeLightboxHandler);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightboxHandler();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });
        
        // Filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterGallery(filter);
                
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
    
    // Create placeholder images directory and images
    function createPlaceholderImages() {
        // This function would normally create or check for placeholder images
        // In a real implementation, you would upload your actual photos
        console.log('Placeholder images would be created here in a real implementation');
    }
    
    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        updateLightboxContent();
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
    }
    
    // Close lightbox
    function closeLightboxHandler() {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Update lightbox content
    function updateLightboxContent() {
        const item = filteredItems[currentIndex];
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-item-caption h3').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
    }
    
    // Show previous image
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        updateLightboxContent();
    }
    
    // Show next image
    function showNextImage() {
        currentIndex = (currentIndex + 1) % filteredItems.length;
        updateLightboxContent();
    }
    
    // Filter gallery items
    function filterGallery(filter) {
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        // Update filtered items array for lightbox navigation
        filteredItems = [...galleryItems].filter(item => {
            const category = item.getAttribute('data-category');
            return filter === 'all' || category === filter;
        });
    }
    
    // Initialize the gallery
    initGallery();
});
