

const unsplashApiKey = "l8dXGulJhnuYqw9PUWJQgth8f--S0YNAiXBS7BvORSM";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const imageContainer = document.getElementById("imageContainer");

async function searchImages() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Please enter an image name");
    return;
  }

  searchBtn.textContent = "Loading...";
  searchBtn.disabled = true;

  imageContainer.innerHTML = `
    <p class="message">Loading images... 🔄</p>
  `;

  const url =
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=${unsplashApiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Status:", response.status);
    console.log("API Response:", data);

    if (!response.ok) {
      throw new Error(
        data.errors?.[0] || "Failed to fetch images"
      );
    }

    if (!data.results || data.results.length === 0) {
      imageContainer.innerHTML = `
        <p class="message">
          No images found 😔
        </p>
      `;
      return;
    }

    let images = "";

    data.results.forEach(function (photo) {
      images += `
        <div class="imageCard">

          <img
            src="${photo.urls.small}"
            alt="${photo.alt_description || "Image"}"
          >

        </div>
      `;
    });

    imageContainer.innerHTML = images;

  } catch (error) {

    console.error("Image Search Error:", error);

    imageContainer.innerHTML = `
      <p class="message">
        Something went wrong. Please try again later. 😔
      </p>
    `;

  } finally {

    searchBtn.textContent = "Search";
    searchBtn.disabled = false;

  }
}

searchBtn.addEventListener("click", searchImages);

searchInput.addEventListener("keydown", function (event) {

  if (event.key === "Enter") {
    searchImages();
  }

});