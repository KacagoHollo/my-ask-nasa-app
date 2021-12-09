function loadEvent() { 
    changeDay();
    document.getElementById("root").insertAdjacentHTML("beforeend", `
    <form class="datIng">
    <label>Choose your preferred date:</label>
    <input type="date" name="dateSelector" required pattern="\d{4}-\d{2}-\d{2}">>
    </form>
    <div id="title"></div>
    <div id="picture"></div>
    <div><p id="explanation"></p></div>
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

    // let title = selectedDate.title;
    // let hdurl = selectedDate.hdurl;
    // let explanation = selectedDate.explanation;
    
    document.querySelector("#title").innerHTML = selectedDate.title;
    let imageke = document.querySelector("#picture");
    // document.body.style.backgroundImage = `${selectedDate.hdurl}`;
    // imageke.appendChild(document.createElement('img')).src = selectedDate.hdurl; 
        // document.getElementById("picture").insertAdjacentHTML("beforeend", `
        //     <img src="${selectedDate.hdurl}">
        // `);
    imageke.style.backgroundImage = `url(${selectedDate.url})`;
    document.querySelector("#explanation").innerHTML = selectedDate.explanation;
    // imageke.removeChild(imageke.firstChild);
    
    return dateOfSelect;
}

async function callNasa(date) {
    const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=rFfuSutBjglJbWQ6AczIXf7RBVh4EKgjZKlG0Tuv&date=${date}`);
    const nasaData = await nasaRes.json();
    
    console.log(nasaData);
    
    return nasaData;
} 


window.addEventListener("load", loadEvent);