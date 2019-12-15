// 进度条
$(".ui input[type=range]").on("input", function (e) {
	e.preventDefault();
	console.log($(this).val());
	$(".ui .progress").css("width", $(this).val() + "%");
	audio.currentTime = ($(this).val() / 100) * audio.duration;
});

// 音量
$(".ui .volume input[type=range1]").on("input", function (e) {
	// e.preventDefault();
	// audio.muted = 100;     

	console.log($(this).val());
	$(".ui .pro").css("width", $(this).val() + "%");
	audio.onvolumechange = ($(this).val() / 100) * audio.muted;
});

var playlist = [
	{
		file: "assets/01.flac",
		thumb: "assets/01.jpg",
		trackName: "安静",
		trackArtist: "周杰伦",
		trackTime: "05:34",
		trackAlbum: "Single"
	},
	{
		file: "assets/02.flac",
		thumb: "assets/02.jpg",
		trackName: "说好不哭",
		trackArtist: "周杰伦&五月天阿信",
		trackTime: "03:42",
		trackAlbum: "Single"
	},
	{
		file: "assets/03.flac",
		thumb: "assets/03.jpg",
		trackName: "一路向北",
		trackArtist: "周杰伦",
		trackTime: "04:55",
		trackAlbum: "Single"
	},
	{
		file: "assets/04.mp3",
		thumb: "assets/04.jpg",
		trackName: "不能说的秘密",
		trackArtist: "周杰伦",
		trackTime: "04:47",
		trackAlbum: "Single"
	},
	{
		file: "assets/05.flac",
		thumb: "assets/05.jpg",
		trackName: "退后",
		trackArtist: "周杰伦",
		trackTime: "04:30",
		trackAlbum: "Single"
	},
	{
		file: "assets/06.flac",
		thumb: "assets/06.jpg",
		trackName: "蒲公英的约定",
		trackArtist: "周杰伦",
		trackTime: "04:05",
		trackAlbum: "Single"
	},
	{
		file: "assets/07.flac",
		thumb: "assets/07.jpg",
		trackName: "星晴",
		trackArtist: "周杰伦",
		trackTime: "04:16",
		trackAlbum: "Single"
	},
	{
		file: "assets/08.flac",
		thumb: "assets/09.jpg",
		trackName: "听妈妈的话",
		trackArtist: "周杰伦&",
		trackTime: "04:23",
		trackAlbum: "Single"
	},
	{
		file: "assets/09.flac",
		thumb: "assets/03.jpg",
		trackName: "等你下课",
		trackArtist: "周杰伦&杨瑞代",
		trackTime: "04:30",
		trackAlbum: "Single"
	}
];

$.each(playlist, function (i, e) {
	$(".playlist").append(
		'<li><div class="thumb"><img src=" ' +
		e.thumb +
		' " alt="" /></div><div class="text"><h5>' +
		e.trackName +
		"</h5><p>" +
		e.trackArtist +
		"</p></div></li>"
	);
});

var audio = $("audio")[0];
var current = 0;

function play() {
	$(".playlist li")
		.eq(current)
		.addClass("playing")
		.siblings()
		.removeClass("playing");
	$(".playlist .playing").removeClass("paused")
}
// 初始化 播放第一首歌
$("audio").attr("src", playlist[current].file);
$(".ui .logo").css("background-image", "url(" + playlist[current].thumb + ")");
$(".playlist li").eq(current).addClass('playing paused')

audio.oncanplay = function () {
	console.log("可以播放");
};
audio.onloadedmetadata = function () {
	console.log("加载到了");
	audio.play();
};

// 控制

// 播放
$(".controls .fa-play").click(function () {

	$(".ui .logo").css("background-image", "url(" + playlist[current].thumb + ")");
	play();
	audio.play();
	$(this).fadeOut();
	$(".controls .fa-pause").fadeIn();
});

// 暂停
$(".controls .fa-pause")
	.click(function () {
		audio.pause();
		$(".playlist .playing").addClass("paused");
		$(this).fadeOut();
		$(".controls .fa-play").fadeIn();
	})
	.fadeOut();

//下一首
$(".controls .fa-forward").click(function () {
	current++;
	current = current > playlist.length - 1 ? 0 : current;

	$("audio").attr("src", playlist[current].file);
	$(".ui .logo").css("background-image", "url(" + playlist[current].thumb + ")");
	$(".ui .title h3").text(" " + playlist[current].trackName + " ");
	$(".ui .title p").text(" " + playlist[current].trackArtist + " ");
	$(".ui .time .duration").text(" " + playlist[current].trackTime + " ");
	play();
});

//上一首
$(".controls .fa-backward").click(function () {
	current--;
	current = current < 0 ? playlist.length - 1 : current

	$("audio").attr("src", playlist[current].file);
	$(".ui .logo").css("background-image", "url(" + playlist[current].thumb + ")");
	$(".ui .title h3").text(" " + playlist[current].trackName + " ");
	$(".ui .title p").text(" " + playlist[current].trackArtist + " ");
	$(".ui .time .duration").text(" " + playlist[current].trackTime + " ");
	play();
});


// 点击歌单
$(".playlist li").click(function () {
	current = $(this).index();
	$("audio").attr("src", playlist[current].file);
	$(".ui .logo").css("background-image", "url(" + playlist[current].thumb + ")");
	$(".ui .title h3").text(" " + playlist[current].trackName + " ");
	$(".ui .title p").text(" " + playlist[current].trackArtist + " ");
	$(".ui .time .duration").text(" " + playlist[current].trackTime + " ");
	play();
});


//切换播放模式

// 随机播放模式
$(".order .fa-align-justify").click(function () {  //列表
	console.log("随机播放模式");
	$(".order .fa-align-justify").css("display", "none")
	$(".order .fa-random").css("display", "block")
	$(".order .fa-refresh").css("display", "none")
	audio.loop = false;

	var index = playlist.index = Math.floor(Math.random() * 9);

	play(index);
})
// 单曲播放模式
$(".order .fa-random").click(function () { //随机
	console.log("单曲播放模式");
	$(".order .fa-align-justify").css("display", "none")
	$(".order .fa-random").css("display", "none")
	$(".order .fa-refresh").css("display", "block")
	audio.loop = true;

})
// 列表播放模式
$(".order .fa-refresh").click(function () { //单曲
	console.log("列表播放模式");
	$(".order .fa-align-justify").css("display", "block")
	$(".order .fa-random").css("display", "none")
	$(".order .fa-refresh").css("display", "none")
	audio.loop = false;
})


// 监听

//打开声音
$(".vo-up .fa-volume-off").click(function () {
	$(".vo-up .fa-volume-off").css("display", "none");
	$(".vo-up .fa-volume-up").css("display", "block");
	$(".volume .pro").css("width", "80%")
	console.log("打开音量");
	audio.muted = false;
})

//关闭声音
$(".vo-up .fa-volume-up").click(function () {
	$(".vo-up .fa-volume-up").css("display", "none");
	$(".vo-up .fa-volume-off").css("display", "block");
	$(".volume .pro").css("width", "0%")
	console.log("关闭音量");
	audio.muted = true;
})

//控制音量
audio.onvolumechange = function () {
	// audio.muted= 100;
	console.log(audio.onvolumechange / audio.muted * 100 + '%');
	$(".volume .pro").css("width", audio.onvolumechange / audio.muted * 100 + '%');
}


//播放进度条
audio.ontimeupdate = function () {
	// console.log(audio.currentTime / audio.duration * 100 + '%');
	$(".ui .progress").css("width", audio.currentTime / audio.duration * 100 + '%');

	//时间更新
	curMinutes = Math.floor(audio.currentTime / 60);
	curSeconds = Math.floor(audio.currentTime - curMinutes * 60);

	$(".time .current").text("0" + curMinutes + ":" + curSeconds)
}


audio.onended = function () {
	//  自动下一曲
	current++;
	$("audio").attr("src", playlist[current].file);
	$(".ui .logo").css("background-image", "url(" + playlist[current].thumb + ")");
	$(".ui .title h3").text(" " + playlist[current].trackName + " ");
	$(".ui .title p").text(" " + playlist[current].trackArtist + " ");
	$(".ui .time .duration").text(" " + playlist[current].trackTime + " ");
	play();
}
