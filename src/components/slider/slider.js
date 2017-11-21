import Swiper from 'swiper';
export const Slider = () => {
	return new Swiper('.swiper-container', {
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		}
	});
}