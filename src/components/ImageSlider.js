import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const settings = {
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    speed: 500,
    dots: true,
  };
  return (
    <>
      <div className="w-full">
        <Slider {...settings}>
          {images.map((url, index) => (
            <div key={index}>
              <img src={url} alt="" className="h-40 mx-auto object-cover" />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
export default ImageSlider;
