const projects = [
    {
        name: "Movie Hub",
        image: "images/MovieHub.png",
        alt: "Movie Hub",
        technologies: [
            "React",
            "MongoDB",
            "REST API"
        ],
        description:
            "A full-stack movie and television review aggregation website with user authentication, reviews, movies, and television shows.",
        github:
            "https://github.com/itsh1ghn00n/CSC3916_Assignment5"
    },

    {
        name: "SnakeBoy",
        image: "images/SnakeIcon.png",
        alt: "SnakeBoy",
        technologies: [
            "C++",
            "Arduino",
            "Hardware"
        ],
        description:
            "A team-developed recreation of the classic game Snake using an Arduino Uno, physical controls, and a custom 3D-printed enclosure.",
        github:
            "https://github.com/itsh1ghn00n/Snake-Final"
    },

    {
        name: "PantryPal",
        image: "images/PantryPal.png",
        alt: "PantryPal",
        technologies: [
            "Web",
            "API",
            "Kroger API"
        ],
        description:
            "A team-developed web application for tracking household groceries, pantry inventory, expiration information, and spending insights.",
        github: "#"
    }
];

const projectGrid = document.getElementById("project-grid");

projects.forEach(project => {

    const projectCard = document.createElement("article");

    projectCard.classList.add("project");

    const tags = project.technologies
        .map(technology => `<span>${technology}</span>`)
        .join("");

    projectCard.innerHTML = `
        <img src="${project.image}" alt="${project.alt}">

        <h3>${project.name}</h3>

        <div class="tags">
            ${tags}
        </div>

        <p>
            ${project.description}
        </p>

        <a href="${project.github}"
           target="_blank"
           rel="noopener noreferrer">
            View Project →
        </a>
    `;

    projectGrid.appendChild(projectCard);
});
