const kaupungit = {
    Helsinki: { lat: 60.17, lon: 24.94 },
    Tampere: { lat: 61.50, lon: 23.76 },
    Oulu: { lat: 65.01, lon: 25.47 }
};

document.getElementById("hae").addEventListener("click", async function () {
    const kaupunki = document.getElementById("kaupunki").value;
    const tulos= document.getElementById("tulos");

    tulos.textContent = "Haetaan säätietoja...";

    const sijainti = kaupungit[kaupunki];

    try {
        const vastaus = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${sijainti.lat}&longitude=${sijainti.lon}&current=temperature_2m`
        );

        const data = await vastaus.json();

        tulos.textContent = `${kaupunki}: ${data.current.temperature_2m} C`;
        

        console.log(data);

    } catch (virhe) {
        tulos.textContent = "Säätietojen hakeminen epäonnistui.";
        console.error(virhe);
    }
});
