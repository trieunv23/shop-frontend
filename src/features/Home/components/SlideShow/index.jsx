import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

SlideShow.propTypes = {};

function SlideShow(props) {  
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [dragStartTime, setDragStartTime] = useState(0);
    const slideContainerRef = useRef(null);
    
    const slides = [
        { id: 1, color: 'pink', imgSrc: ''}, // Thêm src cho hình ảnh ở đây
        { id: 2, color: 'red', imgSrc: ''},
        { id: 3, color: 'dark-blue', imgSrc: ''},
    ];

    const totalSlides = slides.length;

    const startDrag = (e) => {
        setIsDragging(true);
        const position = getPositionX(e);
        setStartPos(position);
        setPrevTranslate(currentTranslate);
        setDragStartTime(Date.now());
    };

    const onDrag = (e) => {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(e);
        const diff = currentPosition - startPos;
        setCurrentTranslate(prevTranslate + diff);
    };

    const endDrag = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;

        const slideWidth = slideContainerRef.current.clientWidth;
        const threshold = slideWidth * 0.2; // Giảm ngưỡng threshold cho phép chuyển slide nhẹ hơn
        const dragDuration = Date.now() - dragStartTime; // Tính toán thời gian kéo

        let newSlide = currentSlide;

        // Tính tốc độ kéo: quãng đường di chuyển chia cho thời gian kéo (px/ms)
        const dragSpeed = Math.abs(movedBy / dragDuration); 

        console.log(movedBy);
        console.log(threshold);

        const shortThreshold = 30;

        if (dragSpeed > 0.5) {
            if (movedBy < - shortThreshold) {
                if (currentSlide === totalSlides - 1) {
                    newSlide = 0;
                } else {
                    newSlide = currentSlide + 1;
                }
            } else if (movedBy > shortThreshold && currentSlide > 0) {
                newSlide = currentSlide - 1;
            }
        } else {
            if (movedBy < -threshold && currentSlide < totalSlides - 1) {
                newSlide = currentSlide + 1;
            } else if (movedBy > threshold && currentSlide > 0) {
                newSlide = currentSlide - 1;
            }
        }

        console.log(newSlide);  

        // Cập nhật vị trí mới cho slide
        const newTranslate = -newSlide * slideWidth;
        setCurrentSlide(newSlide);
        setCurrentTranslate(newTranslate);
        setPrevTranslate(newTranslate);
    };

    const getPositionX = (e) => {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    };

    // Cập nhật transform cho swiper-wrapper
    const style = {
        transform: `translateX(${currentTranslate}px)`,
        transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
    };

    return (
      <div className="slide-container"
            onMouseDown={startDrag}
            onMouseMove={onDrag}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            onTouchStart={startDrag}
            onTouchMove={onDrag}
            onTouchEnd={endDrag}
            ref={slideContainerRef}
      >    
          <div className="slide-wrapper" style={style}>                    
              {slides.map((slide, index) => (    
                  <div 
                      key={slide.id}
                      className={`slide ${currentSlide === slide.id - 1 ? 'active' : ''} ${slide.color}`}
                      aria-label={`${slide.id} / ${totalSlides}`}
                      data-index={`${index}`}
                  >
                      <img src={slide.imgSrc} alt={`Slide ${slide.id}`} />
                  </div>
              ))}
          </div>

          <div className="slide-indicators">
              { slides.map((slide, index) => (
                  <span
                      key={slide.id}
                      className={`indicator ${currentSlide === index ? 'active' : ''}`}
                  > 
                  </span>
              ))}
          </div>
      </div>
    );
}

export default SlideShow;
