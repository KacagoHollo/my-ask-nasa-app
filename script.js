const changeDay = (event) => {

}


async function loadEvent() {
    const nasaRes = await fetch("https://api.nasa.gov/planetary/apod?api_key=rFfuSutBjglJbWQ6AczIXf7RBVh4EKgjZKlG0Tuv");
    const nasaData = await nasaRes.json();
    console.log(nasaData);

    document.getElementById("root").insertAdjacentHTML("beforeend", `
    <div id="title">${nasaData.title}</div>
    <div id="picture"><img id="nasaPic" src="${nasaData.hdurl}"></div>
    <div id="explanation"><p>${nasaData.explanation}</p></div>
    `)

    const root = document.getElementById("root");
    root.addEventListener("input", changeDay);
}

window.addEventListener("load", loadEvent);