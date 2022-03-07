function loadEvent() { 
    changeDay();
    document.getElementById("root").insertAdjacentHTML("beforeend", `
    <form class="datIng">
        <h1>My 'Ask NASA' App </h1>
        <label>Choose your preferred date:</label>
        <input type="date" name="dateSelector" required pattern="\d{4}-\d{2}-\d{2}">>
    </form>
    <div id="title"></div>
    <div class="media">
        <iframe id="video" media_type:"video" src""></iframe>
        <img id="picture" media_type:"image" src=""> 
    </div>
    <div id="exp">
        <p id="explanation">
    </p></div>
    `
    );

    const inputka = document.querySelector("input");
    inputka.addEventListener("input", changeDay);

}
async function changeDay (event) {
    event.preventDefault();
    event.stopPropagation();
    const selectedDate = await callNasa(event.target.value);
    let dateOfSelect = selectedDate.date;

    document.querySelector("#title").innerHTML = selectedDate.title;
    
    let imageke = document.querySelector("#picture");
    let vidio = document.querySelector("#video");

    if (selectedDate.media_type === "image") {
    imageke.style.backgroundImage = `url(${selectedDate.url})`;
    vidio.src = "";
    vidio.autoplay = false; 

    }
    if (selectedDate.media_type === "video") {
    imageke.style.backgroundColor = "";
    imageke.style.opacity = "";
    vidio.src = `${selectedDate.url}`;
    vidio.autoplay = true;
    }
    document.querySelector("#explanation").innerHTML = selectedDate.explanation;
       
    return dateOfSelect;
}

async function callNasa(date) {
    const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=rFfuSutBjglJbWQ6AczIXf7RBVh4EKgjZKlG0Tuv&date=${date}`);
    const nasaData = await nasaRes.json();

    if (nasaData.code === 400) {
        document.querySelector("#title").innerHTML = "Date must be between Jun 16, 1995 and Mar 07, 2022.!";
        document.querySelector("#picture").style.backgroundImage = "url(./images/yoda.jpg)";
        document.querySelector("#picture").style.backgroundSize = "900px 600px";
    }
    else {
        return nasaData;
    }
} 

window.addEventListener("load", loadEvent);