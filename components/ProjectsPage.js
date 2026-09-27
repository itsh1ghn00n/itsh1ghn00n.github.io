// ======================================================
// PROJECT DATA
// ======================================================

const projects = [
    {
        name: "Movie Hub",

        images: [
            "images/MovieHub1.png",
            "images/MovieHub2.png",
            "images/MovieHub3.png"
        ],

        alt: "Movie Hub",

        technologies: [
            "React",
            "MongoDB",
            "REST API",
            "JavaScript",
            "Node.js",
            "Express.js"
        ],

        description:
            "A full-stack movie and television review aggregation website with user authentication, reviews, movies, and television shows.",

        demo:
            "https://csc3916-react-6fl6.onrender.com/#/movielist",
        github:
            "https://github.com/itsh1ghn00n/CSC3916_Assignment5"
    },

    {
        name: "SnakeBoy",

        icon: "images/SnakeIcon.png",

        images: [
            "images/SnakeBoy-shell.jpg",
            "images/SnakeBoy2.jpg"
        ],

        alt: "SnakeBoy",

        technologies: [
            "C++",
            "Arduino UNO",
            "Hardware"
        ],

        description:
            "A team-developed recreation of the classic game Snake using an Arduino Uno, physical controls, and a custom 3D-printed enclosure.",
        
        github:
            "https://github.com/itsh1ghn00n/Snake-Final"
    },

    {
        name: "PantryPal",

        images: [
            "images/pantrypal.png"
        ],

        alt: "PantryPal",

        technologies: [
            "Python",
            "JavaScript",
            "SupaBase",
            "React",
            "Kroger API"
        ],

        description:
            "A team-developed web application for tracking household groceries, pantry inventory, expiration information, and spending insights.",

        github: "#"
    }
];



// ======================================================
// CAROUSEL ELEMENTS
// ======================================================

const projectTrack =
    document.getElementById("project-track");

const previousButton =
    document.getElementById("previous-projects");

const nextButton =
    document.getElementById("next-projects");


// Number of projects currently moved past
let currentProjectIndex = 0;


// Number of projects visible at once
const projectsVisible = 2;


// This should match the gap in your CSS
const projectGap = 25;



// ======================================================
// CREATE PROJECT CARDS
// ======================================================

projects.forEach(project => {

    // Create project card
    const projectCard =
        document.createElement("article");

    projectCard.classList.add("project");


    // Add special class if this project has an icon
    if (project.icon) {
        projectCard.classList.add("has-icon");
    }


    // Create technology tags
    const tags = project.technologies
        .map(technology =>
            `<span>${technology}</span>`
        )
        .join("");


    // Build project HTML
    projectCard.innerHTML = `

        ${project.icon ? `
            <img
                class="project-icon"
                src="${project.icon}"
                alt="${project.name} icon"
            >
        ` : ""}


        <div class="project-content">

            <div class="project-title">

                <h3>
                    ${project.name}
                </h3>

            </div>


            <div class="tags">
                ${tags}
            </div>


            <p>
                ${project.description}
            </p>
            <div class="project-links">
                ${project.demo ? `
                    <a
                        href="${project.demo}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        View Demo →
                    </a>
                ` : ""}

                <a
                    href="${project.github}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub ↗
                </a>
            </div>

        </div>


        <div class="project-image-container">

            <img
                class="project-image"
                src="${project.images[0]}"
                alt="${project.alt}"
            >

        </div>
    `;


    // Add project to horizontal track
    projectTrack.appendChild(projectCard);



    // ==================================================
    // PROJECT IMAGE CAROUSEL
    // ==================================================

    const projectImage =
        projectCard.querySelector(".project-image");


    let currentImage = 0;

    let imageCarouselInterval;


    // Start cycling images when mouse enters card
    projectCard.addEventListener("mouseenter", () => {

        // No reason to start carousel if only one image exists
        if (project.images.length <= 1) {
            return;
        }


        // Prevent multiple intervals from accidentally starting
        clearInterval(imageCarouselInterval);


        imageCarouselInterval = setInterval(() => {

            // Fade current image out
            projectImage.style.opacity = 0;


            setTimeout(() => {

                // Move to next image
                currentImage =
                    (currentImage + 1) %
                    project.images.length;


                // Change image
                projectImage.src =
                    project.images[currentImage];


                // Fade new image in
                projectImage.style.opacity = 1;

            }, 250);

        }, 2000);

    });



    // Stop carousel when mouse leaves card
    projectCard.addEventListener("mouseleave", () => {

        clearInterval(imageCarouselInterval);


        // Reset to first image
        currentImage = 0;

        projectImage.src =
            project.images[0];

        projectImage.style.opacity = 1;

    });

});

function updateProjectPosition() {

    const projectCards =
        projectTrack.querySelectorAll(".project");


    // Safety check
    if (projectCards.length === 0) {
        return;
    }


    // Get actual rendered width of one project
    const cardWidth =
        projectCards[0].getBoundingClientRect().width;


    // Calculate how far track needs to move
    const offset =
        currentProjectIndex *
        (cardWidth + projectGap);


    // Move entire track
    projectTrack.style.transform =
        `translateX(-${offset}px)`;


    // Update arrow states
    updateButtons();
}

function updateButtons() {

    // Disable previous arrow at beginning
    previousButton.disabled =
        currentProjectIndex === 0;


    // Disable next arrow when final projects are visible
    nextButton.disabled =
        currentProjectIndex >=
        projects.length - projectsVisible;
}

nextButton.addEventListener("click", () => {

    const maximumIndex =
        projects.length - projectsVisible;


    if (currentProjectIndex < maximumIndex) {

        currentProjectIndex++;

        updateProjectPosition();
    }

});

previousButton.addEventListener("click", () => {

    if (currentProjectIndex > 0) {

        currentProjectIndex--;

        updateProjectPosition();
    }

});

// The project width changes when the browser changes size,
// so recalculate the carousel position.

window.addEventListener("resize", () => {

    updateProjectPosition();

});

updateProjectPosition();