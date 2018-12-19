window.onload = function () {

	var originData = null,
		originLength = null,
		data = null,
		particleOptions = null,
		gameStep = [
			'start',
			'particle',
			'remove',
			'remove',
			'remove',
			'remove',
			'remove',
			'remove',
			'remove'
		].values(),

		shuffle = function (array) {
			var j, x, i;
			for (i = array.length - 1; i > 0; i--) {
				j = Math.floor(Math.random() * (i + 1));
				x = array[i];
				array[i] = array[j];
				array[j] = x;
			}
			return array;
		},

		loadJSON = function (path, cb) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', path);
			xhr.onreadystatechange = function (data) {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						if (cb) cb(JSON.parse(data.currentTarget.response));
					} else {
						console.log('Error ' + xhr.status);
					}
				}
			};
			xhr.send();
		},

		loadParticles = function (options) {
			loadJSON('./assets/members.json', function (member) {
				var list = Object.keys(member.list);
				data = list;
				originLength = list.length;
				originData = member.list;

				options.particles.shape.images = list.map(k => ({
					src: `./img/${k}.jpg`,
					width: 100,
					height: 125
				}));
				options.particles.number.value = list.length;
				particleOptions = options;

				renderCount(list.length);
				particlesJS('particles-js', options);
			})
		},

		toggleFinger = function (isShow) {
			document.getElementById('game-finger').style.display = isShow ? 'flex' : 'none';
		},

		renderCount = function (count) {
			document.getElementById('game-count').innerText = count;
		},

		game = function (step) {
			var item = step.next();

			if (item.done) {
				return 'done';
			} else {
				switch (item.value) {
					case 'start':
						var options = {
							strings: ['THE<br/>THANOS<br/>GAME'],
							typeSpeed: 100,
							showCursor: false,
						};
						new Typed('.game-title', options);
						break;

					case 'particle':
						document.getElementById('game-start').style.display = 'none';
						document.getElementById('particles-js').style.display = 'block';
						loadJSON('./assets/options.json', loadParticles);
						break;

					case 'remove':
						var percent = Math.round(data.length / originLength * 100);
						var isOver25Percent = percent > 25;

						renderCount([
							`${data.length} 명`,
							percent < 7 ? data.map(k => originData[k].split(', ')[0]).join('/') : ''
						].join(' '));

						particlesJS('particles-js', {
							...particleOptions,
							particles: {
								...particleOptions.particles,
								number: {
									...particleOptions.particles.number,
									value: data.length
								},
								shape: {
									...particleOptions.particles.shape,
									images: data.map(v => ({
										...v,
										src: `./img/${v}.jpg`,
										width: 100,
										height: 125
									}))
								},
								size: {
									...particleOptions.particles.size,
									value: Math.min(Math.max(Math.round(originLength / data.length) * 10, 50), 70),
									random: isOver25Percent,
								},
								move: {
									...particleOptions.particles.move,
									enable: !!percent,
									speed: (100 / percent || 1) * 0.1
								}
							}
						});
						break;
				}
			}
		};

	game(gameStep);

	document.getElementById('game-start-btn').onclick = function () {
		game(gameStep);
	};

	document.body.onkeydown = function () {
		data = shuffle(data).slice(0, data.length / 2);
		toggleFinger(true);
		setTimeout(function () {
			game(gameStep);
			toggleFinger(false);
		}, 950);
	}
};