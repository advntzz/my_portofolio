// ==================== PROJECT GALLERY ====================

const gallerySets = {
  cybernest: [
    "img/dashboard1.png",
    "img/pelanggan.png",
    "img/komputer.png",
    "img/billing.png",
    "img/laporan_income.png",
  ],
  bigdata: ["img/DASBORD.png", "img/DASBORRDD.png", "img/FOOTER.png"],
};

// Certificate / Study Excursion gallery
gallerySets.studyexcursion = [
  "img/JKT.png",
  "img/SMA.jpeg",
  "img/SMP.jpeg",
];

let activeGallery = "cybernest";
let currentImage = 0;

function openGallery(index, galleryKey = "cybernest") {
  activeGallery = galleryKey;
  currentImage = index;

  updateGallery();

  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.add("active");
  }
}

function openBigDataGallery(index) {
  openGallery(index, "bigdata");
}

function closeGallery() {
  const modal = document.getElementById("galleryModal");
  if (modal) {
    modal.classList.remove("active");
  }
}

function changeImage(direction) {
  const images = gallerySets[activeGallery] || gallerySets.cybernest;

  currentImage += direction;

  if (currentImage < 0) {
    currentImage = images.length - 1;
  }

  if (currentImage >= images.length) {
    currentImage = 0;
  }

  updateGallery();
}

function updateGallery() {
  const images = gallerySets[activeGallery] || gallerySets.cybernest;
  const image = document.getElementById("galleryImage");
  const counter = document.getElementById("galleryCounter");

  if (!images.length) return;

  currentImage =
    ((currentImage % images.length) + images.length) % images.length;

  if (image) {
    image.src = images[currentImage];
  }

  if (counter) {
    counter.textContent = `${currentImage + 1} / ${images.length}`;
  }
}

function openStudyExcursionGallery(index) {
  openGallery(index, "studyexcursion");
}

// Generic alias for certificate thumbnails
function openCertificateGallery(index) {
  openGallery(index, "studyexcursion");
}

// ==================== CONTACT FORM HANDLER ====================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("contactStatus");

  if (!form) return;

  // EmailJS configuration
  // 1. Create Email Service in EmailJS
  // 2. Create an Email Template
  // 3. Replace the values below with your actual EmailJS credentials
  const SERVICE_ID = "service_xxxxxxx";
  const TEMPLATE_ID = "template_xxxxxxx";
  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

  if (window.emailjs) {
    emailjs.init({ publicKey: PUBLIC_KEY });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      status.textContent = "Please provide a valid email address.";
      return;
    }

    if (
      SERVICE_ID.includes("xxxxx") ||
      TEMPLATE_ID.includes("xxxxx") ||
      PUBLIC_KEY.includes("YOUR_PUBLIC_KEY")
    ) {
      status.textContent = "EmailJS is not configured yet. Fill in SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY in script.js.";
      return;
    }

    status.textContent = "Sending...";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form, {
        publicKey: PUBLIC_KEY,
      })
      .then(() => {
        status.textContent = "Message sent — thank you!";
        form.reset();
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        status.textContent = "Failed to send message. Please try again later.";
      });
  });
});