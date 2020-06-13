window.addEventListener('DOMContentLoaded', () => {

	setTimeout(function () {
		document.body.classList.add('body_visible');
	}, 200);

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

	function fontsStyle(params) {

		let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
		if (file_content == '') {
			fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
			return fs.readdir(path.build.fonts, function (err, items) {
				if (items) {
					let c_fontname;
					for (var i = 0; i < items.length; i++) {
						let fontname = items[i].split('.');
						fontname = fontname[0];
						if (c_fontname != fontname) {
							fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
						}
						c_fontname = fontname;
					}
				}
			})
		}
	}

	//===========================================================================
	//Адаптив картинок
	function ibg() {
		let ibg = document.querySelectorAll(".ibg");
		for (let i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img')) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
	ibg();

	//===========================================================================
	//Меню бургер
	let iconMenu = document.querySelector('.icon-menu');
	let body = document.querySelector('body');
	let menuBody = document.querySelector('.menu__body');
	iconMenu.addEventListener('click', (e) => {
		iconMenu.classList.toggle('active');
		menuBody.classList.toggle('active');
		body.classList.toggle('lock');
	})

	//===========================================================================
	//Timer
	const deadLine = '2020-06-30';

	function getTimeRemaning(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor((t / (1000 * 60 * 60 * 24))),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60) % 24));

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function getZero(num) {
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector("#days"),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock() {
			const t = getTimeRemaning(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer__clock', deadLine);

	//===========================================================================
	//МОДАЛЬНОЕ ОКНО

	const modalTrigger = document.querySelector('[data-modal]'),
		modal = document.querySelector('.popup');

	function openModal() {
		modal.classList.add('open');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
	}

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('open');
		document.body.style.overflow = '';
	}

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === "Escape" && modal.classList.contains('open')) {
			closeModal();
		}
	});

	const form = document.querySelector('form'),
		inputName = form.querySelector('[type="text"]'),
		inputDate = form.querySelector('[type="date"]'),
		inputTel = form.querySelector('[type="tel"]');

	function chekModal() {
		modalTrigger.addEventListener('click', (e) => {
			if (inputName.value.length != 0 && inputDate.value.length != 0 && inputTel.value.length != 0) {
				e.preventDefault();
				openModal();
				form.reset();
			}
		});
	}
	chekModal();

});