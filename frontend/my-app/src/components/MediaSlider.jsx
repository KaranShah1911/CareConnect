// MediaSlider.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  "/slider1.jpeg",
  "/slider2.jpeg",
  "/slider3.jpeg",
  "/slider1.jpeg"
];

export default function MediaSlider() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-r-xl overflow-hidden ">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((src, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
