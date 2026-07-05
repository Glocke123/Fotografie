(function () {
  const albumGrid = document.getElementById("album-grid");

  if (albumGrid) renderAlbumGrid();

  function renderAlbumGrid() {
    ALBUMS.forEach((album) => {
      const card = document.createElement("article");
      card.className = "album-card";

      const button = document.createElement("button");
      button.className = "album-thumb-button";
      button.type = "button";
      button.setAttribute("aria-label", `Open ${album.title}`);

      const img = document.createElement("img");
      img.className = "album-thumb";
      img.src = album.cover;
      img.alt = "";
      img.loading = "lazy";

      button.append(img);
      button.addEventListener("click", () => openCarousel(album, 0));

      const caption = document.createElement("button");
      caption.className = "album-caption";
      caption.type = "button";
      caption.setAttribute("aria-label", `Open ${album.title}`);
      caption.innerHTML = `<span>${escapeHTML(album.title)}</span><br><span>${escapeHTML(album.meta || "")}</span>`;
      caption.addEventListener("click", () => openCarousel(album, 0));

      card.append(button, caption);
      albumGrid.appendChild(card);
    });
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  let activeAlbum = null;
  let currentIndex = 0;

  const carousel = document.getElementById("carousel");
  const carouselImage = document.getElementById("carousel-image");
  const carouselCaption = document.getElementById("carousel-caption");
  const carouselCounter = document.getElementById("carousel-counter");
  const closeButton = document.getElementById("carousel-close");
  const prevButton = document.getElementById("carousel-prev");
  const nextButton = document.getElementById("carousel-next");

  function openCarousel(album, index) {
    activeAlbum = album;
    currentIndex = index;
    updateCarousel();
    carousel.classList.add("is-open");
    carousel.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeCarousel() {
    if (!carousel) return;
    carousel.classList.remove("is-open");
    carousel.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    carouselImage.src = "";
  }

  function showNext() {
    if (!activeAlbum) return;
    currentIndex = (currentIndex + 1) % activeAlbum.images.length;
    updateCarousel();
  }

  function showPrev() {
    if (!activeAlbum) return;
    currentIndex = (currentIndex - 1 + activeAlbum.images.length) % activeAlbum.images.length;
    updateCarousel();
  }

  function updateCarousel() {
    const src = activeAlbum.images[currentIndex];
    carouselImage.src = src;
    carouselImage.alt = activeAlbum.title;
    carouselCaption.textContent = activeAlbum.title + (activeAlbum.meta ? `, ${activeAlbum.meta}` : "");
    carouselCounter.textContent = `${currentIndex + 1} / ${activeAlbum.images.length}`;
  }

  closeButton?.addEventListener("click", closeCarousel);
  nextButton?.addEventListener("click", showNext);
  prevButton?.addEventListener("click", showPrev);

  carousel?.addEventListener("click", (event) => {
    if (event.target === carousel) closeCarousel();
  });

  document.addEventListener("keydown", (event) => {
    if (!carousel?.classList.contains("is-open")) return;
    if (event.key === "Escape") closeCarousel();
    if (event.key === "ArrowRight") showNext();
    if (event.key === "ArrowLeft") showPrev();
  });
})();
