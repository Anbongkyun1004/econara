document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.getElementById("mobile-nav");
  mobileNav.addEventListener("change", (e) => {
    window.location.hash = e.target.value;
  });

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        current = "#" + section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === current) {
        link.classList.add("active");
      }
    });
  });

  let session2ChartInstance = null;
  const session2Ctx = document
    .getElementById("session2-chart")
    .getContext("2d");
  const session2Data = {
    labels: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월"
    ],
    datasets: [
      {
        label: "평균 미세먼지 농도 (µg/m³)",
        data: [45, 52, 60, 55, 48, 30, 25, 22, 28, 35, 48, 50],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false
      }
    ]
  };

  function createChart(type) {
    if (session2ChartInstance) {
      session2ChartInstance.destroy();
    }
    session2ChartInstance = new Chart(session2Ctx, {
      type: type,
      data: session2Data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top"
          },
          title: {
            display: true,
            text: "서울 월별 평균 미세먼지 농도"
          }
        },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  document
    .getElementById("bar-chart-btn")
    .addEventListener("click", () => createChart("bar"));
  document
    .getElementById("line-chart-btn")
    .addEventListener("click", () => createChart("line"));

  createChart("bar");

  const session3Ctx = document
    .getElementById("session3-chart")
    .getContext("2d");
  new Chart(session3Ctx, {
    type: "line",
    data: {
      labels: ["1880", "1900", "1920", "1940", "1960", "1980", "2000", "2020"],
      datasets: [
        {
          label: "기온 편차 (°C)",
          data: [-0.2, -0.15, -0.25, -0.05, 0.0, 0.25, 0.6, 1.0],
          fill: false,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "1880-2020 전 지구 연평균 기온 편차"
        }
      }
    }
  });

  const answerBtns = document.querySelectorAll(".answer-btn");
  const answerBox = document.getElementById("answer-box");
  answerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const answer = btn.dataset.answer;
      answerBox.textContent = answer;
      answerBox.classList.remove("hidden");
    });
  });
});