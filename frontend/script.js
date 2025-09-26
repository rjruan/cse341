const apiUrl = "http://localhost:8080/professional";


async function getData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();
    renderData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function renderData(data) {
  document.getElementById("professionalName").textContent = data.title;
  document.getElementById("primaryDescription").textContent = data.header;
  document.getElementById("workDescription1").textContent = data.description;

  const img = document.getElementById("professionalImage");
  img.src = data.image;
  img.alt = "Professional Image";

  const linksContainer1 = document.getElementById("githubLink");
  linksContainer1.href = data.links[0].url;
  linksContainer1.textContent = data.links[0].text;

  const linksContainer2 = document.getElementById("linkedInLink");
  linksContainer2.href = data.links[1].url;
  linksContainer2.textContent = data.links[1].text;
}

window.addEventListener("DOMContentLoaded", getData);
