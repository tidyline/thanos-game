window.onload = function () {

	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}

	function removeRandomly(data, size) {
		if (data.length < size) {
			return "[Error] Size should be smaller than data length";
		}

		if (data.length === size) {
			return data;
		} else {
			const idx = getRandomInt(data.length);
			return removeRandomly([...data.slice(0, idx - 1), ...data.slice(idx)], size);
		}
	}

	/* ---- particles.js config ---- */

	particlesJS("particles-js", {
		"particles": {
			"number": {
				"value": 15,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#ffffff"
			},
			"shape": {
				"type": "image",
				"stroke": {
					"width": 0,
					"color": "#000000"
				},
				"polygon": {
					"nb_sides": 5
				},
				"images": [
					{
						"src": "https://i.pinimg.com/originals/8c/d7/24/8cd724371a6f169b977684fd69cc2339.jpg",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://appstickers-cdn.appadvice.com/1234832159/825976844/65f0edd80bc00993662746df6c4961d4-0.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://i.pinimg.com/originals/8c/d7/24/8cd724371a6f169b977684fd69cc2339.jpg",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://appstickers-cdn.appadvice.com/1234832159/825976844/65f0edd80bc00993662746df6c4961d4-0.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://i.pinimg.com/originals/8c/d7/24/8cd724371a6f169b977684fd69cc2339.jpg",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://appstickers-cdn.appadvice.com/1234832159/825976844/65f0edd80bc00993662746df6c4961d4-0.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					},
					{
						"src": "https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png",
						"width": 100,
						"height": 100
					}
				]
			},
			"opacity": {
				"value": 0.5,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 0.2,
					"opacity_min": 0.1,
					"sync": false
				}
			},
			"size": {
				"value": 15,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 20,
					"size_min": 15,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#ffffff",
				"opacity": 0.4,
				"width": 1
			},
			"move": {
				"enable": true,
				"speed": 0.2,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "bubble",
				},
				"onclick": {
					"enable": false,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
					"distance": 140,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 200,
					"size": 30,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
		"retina_detect": true
	});
};