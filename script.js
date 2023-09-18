let poly = document.querySelector(".poly");
function importGoogleFonts(fontsArray) {
	const head = document.head;
	const linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	linkElement.href = `https://fonts.googleapis.com/css?family=${fontsArray.join(
	  "|"
	)}`;
  
	head.appendChild(linkElement);
  }

let isPlaying = false;

let slider = document.querySelector(".slider");
slider.addEventListener("input", () => {
	let bpm = document.querySelector(".bpm");
	
	bpm.innerHTML = `BPM: ${slider.value}`
});

let ratio1 = document.querySelector(".ratio1");
let ratio2 = document.querySelector(".ratio2");
let slider1 = document.querySelector(".slider1");
let slider2 = document.querySelector(".slider2");
function metronome() {
	const audio = new Audio("assets/metronome.mp3");
	const lower = new Audio("assets/metronome_lower.mp3");
	if (isPlaying) {
		if (!poly.state) {
			const tempo = parseFloat(slider.value);
			const interval = 60 / tempo * 1000;
			audio.play();
	
			setTimeout(metronome, interval);
		} else {
			lower.play();
			const tempo = parseFloat(slider.value);
			const interval = 60 / tempo * 1000;
			asyncMetronome(interval, parseFloat(slider1.value), true);
			asyncMetronome(interval, parseFloat(slider2.value), false);

	
			setTimeout(metronome, interval);
		}
	}
  }

function asyncMetronome(interval, ratio, low) {
	for(let i = 1; i<ratio; i++) {
		setTimeout(() => playSingleMetronome(low), Math.round((interval/ratio)*i));
	}
}

function playSingleMetronome(low) {
	new Audio(`assets/metronome${low ? "_low" : ""}.mp3`).play();
}

  

let start = document.querySelector(".start");
start.addEventListener("click", () => {
	isPlaying = isPlaying ? false : true;
	start.innerHTML = isPlaying ? "Stop" : "Start";
	if (isPlaying) metronome();
});

slider1.addEventListener("input", () => {
	

	ratio1.innerHTML = `${slider1.value}`
});


slider2.addEventListener("input", () => {
	

	ratio2.innerHTML = `${slider2.value}`
});




poly.addEventListener("click", () => {
	document.querySelector(".ratio").style.visibility = `${poly.state ? "visible" : "hidden"}`;
	document.querySelector(".ratio1").style.visibility = `${poly.state ? "visible" : "hidden"}`;
	document.querySelector(".ratio2").style.visibility = `${poly.state ? "visible" : "hidden"}`;
	document.querySelector(".slider1").style.visibility = `${poly.state ? "visible" : "hidden"}`;
	document.querySelector(".slider2").style.visibility = `${poly.state ? "visible" : "hidden"}`;


});



