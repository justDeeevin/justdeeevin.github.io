let theme = localStorage.getItem("theme");

const toggle = document.getElementById("toggle");

if (!theme) {
  theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  localStorage.setItem("theme", theme);
}

const snowfall_canvas = document.getElementById("snowfall");
if (theme === "light") {
  document.body.classList.add("light");
  toggle.checked = true;
}

const backgroundColor = theme !== "light" ? "#161616" : "#f2f4f8";
const starColor = theme !== "light" ? "#dde1e6" : "#262626";
const snowfall = new Starback(snowfall_canvas, {
  type: "dot",
  quantity: 200,
  direction: 0,
  backgroundColor,
  randomOpacity: true,
  width: window.innerWidth,
  height: window.innerHeight,
  starColor,
});

const bgGradient = new Rainbow();
bgGradient.setSpectrum("#161616", "#f2f4f8");
bgGradient.setNumberRange(0, 1000);

const starGradient = new Rainbow();
starGradient.setSpectrum("#dde1e6", "#262626");
starGradient.setNumberRange(0, 1000);

const transition = (t) => {
  const direction = theme === "light" ? 1 : -1;
  const startIndex = 500 - direction * 500;
  const startTime = Date.now();

  const loop = () => {
    const time = Date.now();
    if (
      snowfall.config.backgrundColor !==
        bgGradient.colorAt(500 + direction * 500) &&
      time - startTime < t
    ) {
      const progress = Math.ceil(1000 * ((time - startTime) / t));
      snowfall.config.backgroundColor = `#${bgGradient.colorAt(
        startIndex + progress * direction,
      )}`;
      snowfall.stars.config.starColor = `#${starGradient.colorAt(
        startIndex + progress * direction,
      )}`;
      setTimeout(loop, 0);
    }
  };

  loop();
};

toggle.addEventListener("change", () => {
  theme = theme === "light" ? "dark" : "light";
  localStorage.setItem("theme", theme);
  document.body.classList.toggle("light");

  transition(400);
});

document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y =
    e.clientY < window.innerHeight / 2
      ? // Reduces the rate of change of Y past the midpoint
        e.clientY + 0.6 * (window.innerHeight / 2 - e.clientY)
      : e.clientY;
  const true_angle = -((Math.atan2(y, x) * 180) / Math.PI - 90);
  const direction = true_angle < 0 ? 360 + true_angle : true_angle;

  snowfall.config.direction = direction;
  snowfall.stars.config.direction = direction;
});

window.addEventListener("resize", () => {
  snowfall_canvas.setAttribute("width", window.innerWidth);
  snowfall_canvas.setAttribute("height", window.innerHeight);
});
