const projects = [
    {
        image: "ai_growth_platform.jpg",
        title: "AI Professional Growth App"
    },
    {
        image: "office_suite_app.jpg",
        title: "Office Suite App"
    },
    {
        image: "fintech_dashboard.jpg",
        title: "Aura Finance Dashboard"
    }
];


const activeProject = document.getElementById("activeProject");
const nextProject = document.getElementById("nextProject");
const projectImage = document.getElementById("projectImage");
const projectTitle = document.getElementById("projectTitle");
const dots = document.querySelectorAll(".project-dot");


let currentProject = 0;
let isAnimating = false;

const duration = 600;


// ----------------------------------------
// Update dots
// ----------------------------------------

function updateDots() {

    dots.forEach((dot, index) => {

        if (index === currentProject) {

            dot.classList.remove("bg-white");
            dot.classList.add("bg-accent");

        } else {

            dot.classList.remove("bg-accent");
            dot.classList.add("bg-white");

        }

    });

}


// ----------------------------------------
// Change project
// ----------------------------------------

function changeProject(direction) {

    if (isAnimating) {
        return;
    }

    isAnimating = true;


    let nextIndex;


    // Scroll UP = FORWARD
    if (direction === "forward") {

        nextIndex = currentProject + 1;

        if (nextIndex >= projects.length) {
            nextIndex = 0;
        }

    }


    // Scroll DOWN = BACKWARD
    if (direction === "backward") {

        nextIndex = currentProject - 1;

        if (nextIndex < 0) {
            nextIndex = projects.length - 1;
        }

    }


    // ----------------------------------------
    // Prepare upcoming project
    // ----------------------------------------

    nextProject.style.transition = "none";
    nextProject.style.width = "80px";
    nextProject.style.height = "80px";
    nextProject.style.borderRadius = "8px";
    nextProject.style.opacity = "1";


    // ----------------------------------------
    // FORWARD
    // ----------------------------------------

    if (direction === "forward") {

        // Upcoming starts at the RIGHT
        nextProject.style.left = "312px";
        nextProject.style.top = "220px";

        // Current card moves LEFT + shrinks + fades
        activeProject.style.transition =
            "transform 600ms ease, opacity 600ms ease";

        activeProject.style.transform =
            "translate(-220px, 220px) scale(0.267)";

        activeProject.style.opacity = "0";


        // Upcoming card moves RIGHT → ACTIVE
        nextProject.style.transition =
            "transform 600ms ease, width 600ms ease, height 600ms ease, border-radius 600ms ease";

        nextProject.style.transform =
            "translate(-312px, -220px)";

        nextProject.style.width = "300px";
        nextProject.style.height = "300px";
        nextProject.style.borderRadius = "16px";

    }


    // ----------------------------------------
    // BACKWARD
    // ----------------------------------------

    if (direction === "backward") {

        // Upcoming starts at the LEFT
        nextProject.style.left = "-92px";
        nextProject.style.top = "220px";

        // Current card moves RIGHT + shrinks + fades
        activeProject.style.transition =
            "transform 600ms ease, opacity 600ms ease";

        activeProject.style.transform =
            "translate(220px, 220px) scale(0.267)";

        activeProject.style.opacity = "0";


        // Upcoming card moves LEFT → ACTIVE
        nextProject.style.transition =
            "transform 600ms ease, width 600ms ease, height 600ms ease, border-radius 600ms ease";

        nextProject.style.transform =
            "translate(92px, -220px)";

        nextProject.style.width = "300px";
        nextProject.style.height = "300px";
        nextProject.style.borderRadius = "16px";

    }


    // ----------------------------------------
    // After animation
    // ----------------------------------------

    setTimeout(function () {

        // Change project content
        projectImage.src = projects[nextIndex].image;
        projectTitle.textContent = projects[nextIndex].title;


        // ----------------------------------------
        // Reset active card
        // ----------------------------------------

        activeProject.style.transition = "none";
        activeProject.style.transform = "none";
        activeProject.style.opacity = "1";
        activeProject.style.left = "0px";
        activeProject.style.top = "0px";
        activeProject.style.width = "300px";
        activeProject.style.height = "300px";
        activeProject.style.borderRadius = "16px";


        // ----------------------------------------
        // Reset upcoming card
        // ----------------------------------------

        nextProject.style.transition = "none";
        nextProject.style.transform = "none";
        nextProject.style.left = "312px";
        nextProject.style.top = "220px";
        nextProject.style.width = "80px";
        nextProject.style.height = "80px";
        nextProject.style.borderRadius = "8px";
        nextProject.style.opacity = "1";


        currentProject = nextIndex;

        updateDots();

        isAnimating = false;

    }, duration);

}


// ----------------------------------------
// Scroll anywhere
// ----------------------------------------

window.addEventListener("wheel", function (event) {

    event.preventDefault();


    if (isAnimating) {
        return;
    }


    // Scroll UP = forward
    if (event.deltaY < 0) {

        changeProject("forward");

    }


    // Scroll DOWN = backward
    if (event.deltaY > 0) {

        changeProject("backward");

    }

}, {
    passive: false
});


// ----------------------------------------
// Start
// ----------------------------------------

updateDots();