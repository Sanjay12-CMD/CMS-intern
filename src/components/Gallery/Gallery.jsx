import React, { useState } from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

// Local images
import buildingImg from '../../assets/images/building.png';
import classroomImg from '../../assets/images/classroom.png';
import canteenImg from '../../assets/images/canteen.png';

export default function Gallery() {
  const galleryItems = [
    {
      id: 0,
      title: "College Building",
      category: "Infrastructure",
      src: buildingImg,
      description: "Our modern main administrative and engineering block, showcasing glass architecture."
    },
    {
      id: 1,
      title: "Classroom",
      category: "Academics",
      src: classroomImg,
      description: "Equipped with high-tech smart boards, comfortable seating, and bright ventilation."
    },
    {
      id: 2,
      title: "Canteen",
      category: "Campus Life",
      src: canteenImg,
      description: "A hygienic, bright cafeteria offering nutritional meals and comfortable social zones."
    },
    {
      id: 3,
      title: "Hostel",
      category: "Campus Life",
      src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      description: "Well-furnished student rooms with dedicated workspaces and standard housing comforts."
    },
    {
      id: 4,
      title: "Library",
      category: "Academics",
      src: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1000&q=80",
      description: "A quiet hub housing thousands of technical reference books, research journals, and e-learning units."
    },
    {
      id: 5,
      title: "Laboratory",
      category: "Research",
      src: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80",
      description: "Advanced engineering laboratories with high-precision experimental setups and analysis systems."
    },
    {
      id: 6,
      title: "Playground",
      category: "Sports",
      src: "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=1000&q=80",
      description: "Lush green athletic fields supporting football, track events, cricket, and outdoor fitness."
    }
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Infrastructure', 'Academics', 'Campus Life', 'Research', 'Sports'];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  const openLightbox = (idx) => {
    // We map back to the true item id to support filters
    const trueIdx = galleryItems.findIndex(item => item.id === idx);
    setActivePhotoIdx(trueIdx);
  };

  const closeLightbox = () => {
    setActivePhotoIdx(null);
  };

  const showNext = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev + 1) % galleryItems.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setActivePhotoIdx((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <div className="gallery-container bg-orbs animate-fade-in">
      <div className="gallery-header">
        <h2 className="gallery-title">Campus Gallery</h2>
        <p className="gallery-subtitle">A visual tour of our state-of-the-art campus, learning centers, and vibrant student life.</p>
        
        {/* Category Filters */}
        <div className="gallery-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${filter === cat ? 'active-filter' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of gallery cards */}
      <div className="gallery-grid">
        {filteredItems.map((item) => (
          <div 
            key={item.id} 
            className="gallery-card glass-panel glass-panel-hover"
            onClick={() => openLightbox(item.id)}
          >
            <div className="gallery-image-wrapper">
              <img src={item.src} alt={item.title} className="gallery-image" loading="lazy" />
              <div className="gallery-hover-overlay">
                <ZoomIn className="zoom-icon" size={24} />
                <span className="hover-category">{item.category}</span>
              </div>
            </div>
            <div className="gallery-card-body">
              <h4 className="gallery-card-title">{item.title}</h4>
              <p className="gallery-card-desc">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIdx !== null && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button type="button" className="lightbox-close-btn" onClick={closeLightbox}>
            <X size={28} />
          </button>
          
          <button type="button" className="lightbox-nav-btn prev-btn" onClick={showPrev}>
            <ChevronLeft size={36} />
          </button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryItems[activePhotoIdx].src} 
              alt={galleryItems[activePhotoIdx].title} 
              className="lightbox-image animate-zoom-in" 
            />
            <div className="lightbox-caption">
              <div className="caption-header">
                <span className="caption-category">{galleryItems[activePhotoIdx].category}</span>
                <h4>{galleryItems[activePhotoIdx].title}</h4>
              </div>
              <p>{galleryItems[activePhotoIdx].description}</p>
            </div>
          </div>
          
          <button type="button" className="lightbox-nav-btn next-btn" onClick={showNext}>
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
}
