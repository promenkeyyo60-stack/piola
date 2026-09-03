const photos = [
  ["photo_2026-09-03_23-53-01.jpg","P-001","klasik","Klasik kesim","Pamuklu poplin"],
  ["photo_2026-09-03_23-54-08.jpg","P-002","oversize","Relaxed oversize","Keten karışım"],
  ["photo_2026-09-03_23-54-52.jpg","P-003","desenli","Çizgili seri","Pamuklu dokuma"],
  ["photo_2026-09-03_23-55-00.jpg","P-004","klasik","Oxford gömlek","Oxford pamuk"],
  ["photo_2026-09-03_23-55-05.jpg","P-005","oversize","Geniş kalıp","Tencel karışım"],
  ["photo_2026-09-03_23-55-19.jpg","P-006","desenli","Dokulu seri","Viskon dokuma"],
  ["photo_2026-09-03_23-55-27.jpg","P-007","klasik","Essential gömlek","Pamuklu poplin"],
  ["photo_2026-09-03_23-55-30.jpg","P-008","oversize","Günlük kalıp","Keten karışım"],
  ["photo_2026-09-03_23-55-33.jpg","P-009","desenli","Geometrik seri","Pamuk saten"],
  ["photo_2026-09-03_23-55-38.jpg","P-010","klasik","Modern klasik","Oxford pamuk"],
  ["photo_2026-09-03_23-55-47.jpg","P-011","oversize","Relaxed gömlek","Viskon karışım"],
  ["photo_2026-09-03_23-55-49.jpg","P-012","desenli","Minimal desen","Pamuklu dokuma"],
  ["photo_2026-09-03_23-55-56.jpg","P-013","klasik","Tek cep seri","Pamuklu poplin"],
  ["photo_2026-09-03_23-56-19.jpg","P-014","oversize","Boxy fit","Keten karışım"],
  ["photo_2026-09-03_23-56-33.jpg","P-015","desenli","Kareli seri","Flanel pamuk"],
  ["photo_2026-09-03_23-56-53.jpg","P-016","klasik","Premium basic","Pamuk saten"],
  ["photo_2026-09-03_23-58-08.jpg","P-017","oversize","Utility gömlek","Twill pamuk"]
];
const videos = ["IMG_7123.mp4","IMG_7124.mp4","IMG_7432.mp4","IMG_7437.mp4","IMG_7450.mp4","IMG_7461.mp4"];
const sliderPhotos = [
  ["yeni-sezon-3.jpg", "Yeni sezon 01", "Koyu lacivert"],
  ["yeni-sezon-4.jpg", "Yeni sezon 02", "Kiremit ton"],
  ["yeni-sezon-5.jpg", "Yeni sezon 03", "Doğal bej"],
  ["yeni-sezon-6.jpg", "Yeni sezon 04", "Adaçayı yeşili"],
  ["yeni-sezon-7.jpg", "Yeni sezon 05", "Klasik mavi"],
  ["yeni-sezon-8.jpg", "Yeni sezon 06", "Kahve ton"],
  ["photo_2026-09-03_23-54-08.jpg", "Relaxed oversize", "Keten karışım"],
  ["photo_2026-09-03_23-54-52.jpg", "Çizgili seri", "Pamuklu dokuma"],
  ["photo_2026-09-03_23-55-05.jpg", "Geniş kalıp", "Tencel karışım"],
  ["photo_2026-09-03_23-55-33.jpg", "Geometrik seri", "Pamuk saten"],
  ["photo_2026-09-03_23-56-53.jpg", "Premium basic", "Pamuk saten"],
  ["photo_2026-09-03_23-58-08.jpg", "Utility gömlek", "Twill pamuk"]
];
const grid = document.querySelector("#productGrid");
const count = document.querySelector("#productCount");
const empty = document.querySelector("#emptyState");
const sliderWrapper = document.querySelector("#sliderWrapper");
let category = "all";

function renderProducts() {
  const query = document.querySelector("#searchInput").value.trim().toLocaleLowerCase("tr");
  const visible = photos.filter(([, code, type, name, fabric]) =>
    (category === "all" || type === category) &&
    `${code} ${name} ${fabric}`.toLocaleLowerCase("tr").includes(query)
  );
  count.textContent = visible.length;
  empty.hidden = visible.length !== 0;
  grid.innerHTML = visible.map(([file, code, type, name, fabric]) => `
    <article class="product-card">
      <div class="product-image">
        <img src="assets/media/${file}" alt="${code} ${name}" loading="lazy" />
        <span class="tag">${code}</span>
      </div>
      <div class="product-info">
        <h3>${name}</h3>
        <div class="product-meta"><span>${fabric}</span><span>${type}</span></div>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".filter").forEach((button) => button.addEventListener("click", () => {
  document.querySelector(".filter.active").classList.remove("active");
  button.classList.add("active");
  category = button.dataset.filter;
  renderProducts();
}));
document.querySelector("#searchInput").addEventListener("input", renderProducts);
document.querySelector("#videoList").innerHTML = videos.map((file, index) => `
  <div class="video-card">
    <video controls playsinline preload="metadata">
      <source src="assets/media/${file}" type="video/mp4" />
      Tarayıcınız bu videoyu oynatmayı desteklemiyor.
    </video>
  </div>
`).join("");

sliderWrapper.innerHTML = sliderPhotos.map(([file, name, color]) => `
  <div class="swiper-slide">
    <img src="assets/media/${file.includes("yeni-sezon") ? "telegram/" : ""}${file}?v=2" alt="${name} gömlek" />
    <div class="slide-caption"><span>2026 / YENİ SEZON</span><strong>${name}</strong><small>${color}</small></div>
  </div>
`).join("");

new Swiper(".piolaSlider", {
  slidesPerView: 1.2,
  spaceBetween: 14,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  breakpoints: {
    640: { slidesPerView: 2.2 },
    980: { slidesPerView: 3.2 }
  }
});
renderProducts();
