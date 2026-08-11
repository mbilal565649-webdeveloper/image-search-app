
const apiKey = "l8dXGulJhnuYqw9PUWJQgth8f--S0YNAiXBS7BvORSM";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const imageContainer = document.getElementById("imageContainer");

const apiKey = "l8dXGulJhnuYqw9PUWJQgth8f--S0YNAiXBS7BvORSM";

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

<<<<<<< HEAD
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    searchTerm
  )}&client_id=${apiKey}`;
=======
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchTerm)}&client_id=${apiKey}`;
>>>>>>> 45d08e6 (Add Unsplash API key)

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await response.json();

    console.log(data);

    if (data.results.length === 0) {
      imageContainer.innerHTML = `
        <p class="message">No images found 😔</p>
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
    console.log(error);

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

// Search button
searchBtn.addEventListener("click", searchImages);

// Enter key
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchImages();
  }
});