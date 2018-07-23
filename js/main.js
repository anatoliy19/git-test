$(document).ready(function() {

	// Возвращение даты
	var getDate = function() {
		var d = new Date(),
				day = d.getDate(),
				hrs = d.getHours(),
				min = d.getMinutes(),
				//sec = d.getSeconds(),
				month = d.getMonth(),
				year = d.getFullYear();

		var monthArray = new Array("января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря");

		//if (day <= 9) day "0" + day; 

		//var actualDate = day + ' ' + monthArray[month] + ' ' + year + ' г.,' + hrs + ' :' + min;
		var actualDate = `${day} ${monthArray[month]} ${year}, ${hrs}:${min}`;
		return actualDate;
	};

	// Подсчет твитов
	var countTweets = function() {
		var tweetCounter = $('.tweet-card').length;
		$('#tweetsCounter').text(tweetCounter);
	}

	// Обработка ссылок. Источник: https://gist.github.com/ryansmith94/0fb9f6042c1e0af0d74f
	var wrapURLs = function (text, new_window) {
	  var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
	  var target = (new_window === true || new_window == null) ? '_blank' : '';
	  
	  return text.replace(url_pattern, function (url) {
	    var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
	    var href = protocol_pattern.test(url) ? url : 'http://' + url;
	    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
	  });
	};

	// Создание твитов
	var createTweet = function(date, text) {

		var $tweetBox = $('<div class="card tweet-card">');	// создаем обертку для твита
		var $tweetDate = $('<div class="tweet-date">').text(date); // создаем дату
		var $tweetText = $('<div class="tweet-text">').html(wrapURLs(text)).wrapInner('<p></p>'); // блок с текстом твита
		
		var additionalClassName;

		if(text.length < 100) {
			additionalClassName = 'font-size-large';
		} else if (text.length > 150) {
			additionalClassName = 'font-size-small';
		} else {
			additionalClassName = 'font-size-normal';
		}

		$tweetText.addClass(additionalClassName);

		$tweetBox.append($tweetDate).append($tweetText); // получаем разметку твита с датой и текстом
		$('#tweetsList').prepend($tweetBox); // добавление твита на страницу
		countTweets();
	};

	// Массив твитов, аналог БД
	var tweetsBase = [
		{
			date: '21 мая 2018, 16:03',
			text: 'Сегодня я сдала свой первый проект. Было очень трудно, учитывая, что я почти не знаю WP. Проект выполняла около двух недель. Но я справилась благодаря другу. Если бы не он, я бы бросила проект. Вот ссылка, если интересно: http://butuzov.pro'
		},
		{
			date: '6 июля 2018, 22:10',
			text: 'Сегодня я начала проходить интенсив по созданию аналога твиттера от Юрия Ключевского. Думаю, будет интересно!'
		},
		{
			date: '7 июля 2018, 17:32',
			text: 'Сегодня я сверстала страничку твиттера. Нетерпится уже начать часть программирования. Это интересно, но сложно. Никак не могу взять себя в руки и заняться программированием ;)'
		},
		{
			date: '8 июля 2018, 12:28',
			text: 'Успела на вебинар Юрия Ключевского. Приятно видеть, что твою работу оценивают)'
		},

		{
			date: '9 июля 2018, 13:45',
			text: 'Ура, моя страничка твиттера готова!'
		}

	];

	// Формирование твитов
	tweetsBase.forEach(function(tweet) {
		createTweet(tweet.date, tweet.text);
	});

	

	// Форма отправки твита
	$('#postNewTweet').on('submit', function(e){
		e.preventDefault(); // отменяем отправку формы
		var tweetText = $('#tweetText').val(); // получаем текст твита
		createTweet(getDate(), tweetText);
		$('#tweetText').val('');

	});

});