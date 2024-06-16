/* import AstroIcon from '../icons/Astro.astro';
import Css from '../icons/Css.astro';
import Github from '../icons/Github.astro';
import Html from '../icons/Html.astro';
import Javascript from '../icons/Javascript.astro';
import NextJS from '../icons/NextJS.astro';
import React from '../icons/React.astro';
import Tailwind from '../icons/Tailwind.astro';
import Vue from '../icons/Vue.astro';
import Wordpress from '../icons/Wordpress.astro';
import Hubspot from '../icons/Hubspot.astro';

import 'swiper/css';
import Swiper from 'swiper';
import { register } from 'swiper/element/bundle';

register();

const LOGOS = {
  NEXT: { name: "Next.js", class: "bg-black text-white", icon: <NextJS /> },
  TAILWIND: { name: "Tailwind CSS", class: "bg-[#003159] text-white", icon: <Tailwind /> },
  JAVASCRIPT: { name: "Javascript", class: "bg-[#FBFF00] text-black", icon: <Javascript /> },
  HTML: { name: "HTML5", class: "bg-[#003159] text-white", icon: <Html /> },
  CSS: { name: "css3", class: "bg-[#003159] text-white", icon: <Css /> },
  WORDPRESS: { name: "Wordpress", class: "bg-[#003159] text-white", icon: <Wordpress /> },
};

const ITEMS = [
  { logo: <Css /> },
  { logo: <Html /> },
  { logo: <Javascript /> },
  { logo: <Wordpress /> },
  { logo: <Tailwind /> },
  { logo: <React /> },
  { logo: <Vue /> },
  { logo: <AstroIcon /> },
  { logo: <Github /> },
  { logo: <Hubspot /> }
];

const MyComponent = () => {
  useEffect(() => {
    new Swiper("#controls-carousel", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }, []);

  return (
    <div className="">
      <div id="controls-carousel" className="swiper mySwiper relative w-full" data-carousel="static">
        <div className="flex justify-center items-center gap-12 px-10 swiper-wrapper">
          {ITEMS.map((item, index) => (
            <div key={index} className="swiper-slide size-10 lg:size-10">
              {item.logo}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComponent;

 */