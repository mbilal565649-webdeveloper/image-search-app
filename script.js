const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const imageContainer = document.getElementById("imageContainer");

async function searchImages() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    alert("Please enter an image name");
    return;
  }

  console.log(searchTerm);

  const url = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=Your Access Key !...`;

  const response = await fetch(url);
  const data = await response.json();

  console.log(data);

  let images = "";

  data.results.forEach(function (photo) {
    images += `
        <div class="imageCard">
            <img src="${photo.urls.small}" alt="${photo.alt_description || "Image"}">
        </div>
    `;
  });

  imageContainer.innerHTML = images;
}

searchBtn.addEventListener("click", searchImages);
