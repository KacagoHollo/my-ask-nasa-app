function loadEvent() { 
    changeDay();
    document.getElementById("root").insertAdjacentHTML("beforeend", `
    <div id="title"></div>
    <div id="picture"></div>
    <div><p id="explanation"></p></div>
    <form class="datIng">
    <label>Choose your preferred date:</label>
    <input type="date" name="dateSelector" required pattern="\d{4}-\d{2}-\d{2}">>
    </form>
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
    imageke.appendChild(document.createElement('img')).src = selectedDate.hdurl;
    document.querySelector("#explanation").innerHTML = selectedDate.explanation;
    // imageke.removeChild(imageke.firstChild);
    
    return dateOfSelect;
}

async function callNasa(date) {
    const nasaRes = await fetch(`https://api.nasa.gov/planetary/apod?api_key=rFfuSutBjglJbWQ6AczIXf7RBVh4EKgjZKlG0Tuv&date=${date}`);
    const nasaData = await nasaRes.json();
    
    // let nasaObj = {
    //     date: nasaData.date,
    //     title: nasaData.title,
    //     image: nasaData.hdurl,
    //     exp: nasaData.explanation
    // };
    console.log(nasaData);
    
    return nasaData;
} 


window.addEventListener("load", loadEvent);