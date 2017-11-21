import { Slider } from '../components/slider/slider';
import $ from 'jquery';

console.log('first');

let firstSlider = Slider();

$('.hide').on('click', () => {
	$('.text-to-hide').slideToggle();
});
