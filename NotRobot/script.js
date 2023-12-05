document.addEventListener("DOMContentLoaded", function () {
  const imageContainer = document.getElementById("image-container");
  const resetButton = document.getElementById("reset");
  const verifyButton = document.getElementById("verify");
  const para = document.getElementById("para");

  const imageURLs = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/seed/picsum/200/300",
    "https://picsum.photos/200/300?grayscale",
    "https://picsum.photos/200/300/",
    "https://picsum.photos/200/300.jpg",
  ];

  let state = 1;
  let selectedImages = [];

  shuffledImages = shuffle([
    ...imageURLs,
    imageURLs[Math.floor(Math.random() * 5)],
  ]);

  // Function to shuffle an array
  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  // Function to render images
  function renderImages() {
    imageContainer.innerHTML = "";
    shuffledImages.forEach((url, index) => {
      const img = document.createElement("img");
      img.src = url;
      img.classList.add(`img${index + 1}`);
      img.addEventListener("click", () => handleImageClick(img));
      imageContainer.appendChild(img);
    });
  }

  // Function to handle image click
  function handleImageClick(img) {
    if (selectedImages.length < 2 && !selectedImages.includes(img)) {
      selectedImages.push(img);

      if (selectedImages.length === 2) {
        state = 3;
        verifyButton.style.display = "inline-block";
      }
    }

    if (selectedImages.length > 2) {
      verifyButton.style.display = "none";
    }

    img.classList.toggle("selected");

    if (state === 4) {
      state = 1;
      para.innerHTML = "";
      verifyButton.style.display = "none";
    }
  }

  // Function to handle reset button click
  resetButton.addEventListener("click", function () {
    state = 1;
    selectedImages = [];
    // resetButton.style.display = "none";
    verifyButton.style.display = "none";
    para.innerHTML = "";
    shuffledImages = shuffle([
      ...imageURLs,
      imageURLs[Math.floor(Math.random() * 5)],
    ]);
    renderImages();
  });

  // Function to handle verify button click
  verifyButton.addEventListener("click", function () {
    state = 4;
    verifyButton.style.display = "none";
    console.log("Verify button clicked");

    let success = "You are a human. Congratulations!";
    let error =
      "We can't verify you as a human. You selected the non-identical tiles.";

    para.innerText =
      selectedImages[0].src === selectedImages[1].src ? success : error;

    // Reset selected images and hide the result after a delay (adjust timing as needed)
    // setTimeout(function () {
    //   selectedImages.forEach((selectedImg) => {
    //     selectedImg.classList.remove("selected");
    //   });

    //   state = 1;
    //   para.innerText = "";
    // }, 2000); // Delay reset by 2 seconds (adjust as needed)
  });

  // Initial rendering
  renderImages();
});
