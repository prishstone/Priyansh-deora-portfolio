(function () {

    // ----------------------------------------
    // Supabase
    // ----------------------------------------

    async function loadProjects() {

        const { data, error } = await window.supabaseClient
            .from("projects")
            .select("*")
            .eq("published", true)
            .order("sort_order", { ascending: true });


        console.log("SUPABASE PROJECTS:", data);
        console.log("SUPABASE ERROR:", error);


        if (error) {

            console.error("Error loading projects:", error);

            return [];

        }


        return data.map(function (project) {

            return {

                id: project.id,
                slug: project.slug,
                title: project.title,
                image: project.media_url,
                type: project.media_type

            };

        });

    }


    // ----------------------------------------
    // Elements
    // ----------------------------------------

    const activeProject = document.getElementById("activeProject");
    const nextProject = document.getElementById("nextProject");

    const projectImage = document.getElementById("projectImage");
    const projectVideo = document.getElementById("projectVideo");

    const projectTitle = document.getElementById("projectTitle");

    const dotsContainer = document.getElementById("projectDots");


    // ----------------------------------------
    // Project state
    // ----------------------------------------

    let projects = [];

    let currentProject = 0;

    let isAnimating = false;

    const duration = 600;


    // ----------------------------------------
    // Create dots
    // ----------------------------------------

    function createDots() {

        dotsContainer.innerHTML = "";


        projects.forEach(function () {

            const dot = document.createElement("div");

            dot.className =
                "project-dot w-[4px] h-[4px] rounded-full bg-muted";

            dotsContainer.appendChild(dot);

        });

    }


    // ----------------------------------------
    // Update media
    // ----------------------------------------

    function updateMedia(project) {

        if (!project) {
            return;
        }


        // Hide both
        projectImage.classList.add("hidden");

        projectVideo.classList.add("hidden");


        // Stop video
        projectVideo.pause();


        // Video
        if (project.type === "video") {

            projectVideo.src = project.image;

            projectVideo.classList.remove("hidden");

            projectVideo.load();

            projectVideo.play();

        }


        // Image
        else {

            projectImage.src = project.image;

            projectImage.classList.remove("hidden");

        }

    }


    // ----------------------------------------
    // Update dots
    // ----------------------------------------

    function updateDots() {

        const dots =
            document.querySelectorAll(".project-dot");


        dots.forEach(function (dot, index) {

            if (index === currentProject) {

                dot.classList.remove("bg-muted");

                dot.classList.add("bg-accent");

            }

            else {

                dot.classList.remove("bg-accent");

                dot.classList.add("bg-muted");

            }

        });

    }


    // ----------------------------------------
    // Open project detail
    // ----------------------------------------

    function openProject() {

        const project = projects[currentProject];


        if (!project) {
            return;
        }


        window.location.href =
            "project-detail.html?slug=" + project.slug;

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


        // ----------------------------------------
        // Scroll UP = FORWARD
        // ----------------------------------------

        if (direction === "forward") {

            nextIndex = currentProject + 1;


            if (nextIndex >= projects.length) {

                nextIndex = 0;

            }

        }


        // ----------------------------------------
        // Scroll DOWN = BACKWARD
        // ----------------------------------------

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


            // Upcoming starts at RIGHT

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


            // Upcoming starts at LEFT

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

            const project = projects[nextIndex];


            updateMedia(project);

            projectTitle.textContent =
                project.title;


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


            // ----------------------------------------
            // Update state
            // ----------------------------------------

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


        if (!projects.length) {
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

    // Mobile swipe
    let touchStartY = 0;
    let touchEndY = 0;

    window.addEventListener("touchstart", function (event) {

        touchStartY = event.touches[0].clientY;

    }, {
        passive: true
    });


    window.addEventListener("touchend", function (event) {

        touchEndY = event.changedTouches[0].clientY;

        const swipeDistance = touchStartY - touchEndY;

        if (isAnimating) return;
        if (!projects.length) return;

        // Swipe UP = FORWARD
        if (swipeDistance > 50) {
            changeProject("forward");
        }

        // Swipe DOWN = BACKWARD
        if (swipeDistance < -50) {
            changeProject("backward");
        }

    }, {
        passive: true
    });


    // ----------------------------------------
    // Start
    // ----------------------------------------

    async function start() {


        projects = await loadProjects();


        if (!projects.length) {

            console.error(
                "No published projects found."
            );

            return;

        }


        // Create dots

        createDots();


        // Set initial state

        currentProject = 0;


        updateDots();


        // Load first project

        updateMedia(
            projects[currentProject]
        );


        projectTitle.textContent =
            projects[currentProject].title;


        // Click project → detail page

        activeProject.addEventListener(
            "click",
            openProject
        );


    }


    // Start app

    start();


})();