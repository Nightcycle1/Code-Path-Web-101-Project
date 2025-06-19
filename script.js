// ########################################
// #           Navigation Sidebar         #
// ########################################

// Get navigation elements
const navBtn = document.getElementById("nav-btn");
const navSidebar = document.getElementById("nav-sidebar");

// Toggle the "open" class on the sidebar when the button is clicked
navBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent triggering the document click handler
    navSidebar.classList.toggle("open");
});

// Close the menu when clicking outside of it
document.addEventListener("click", (event) => {
    if (!navSidebar.contains(event.target) && !navBtn.contains(event.target)) {
        navSidebar.classList.remove("open");
    }
});

// ########################################
// #       Tooltip and Pop-up Logic       #
// ########################################

// Tooltip Elements
const detailsBox = document.getElementById('details-box');
const descriptionBox = document.createElement('div');
descriptionBox.classList.add('description-box');
document.body.appendChild(descriptionBox);

// Tooltip Functions
function showTooltip(event) {
    const stateName = event.target.getAttribute("data-name");
    detailsBox.innerHTML = `<strong>${stateName}</strong>`;
    detailsBox.style.display = "block";
    detailsBox.style.opacity = "100%";
}

function moveTooltip(event) {
    detailsBox.style.left = `${event.pageX + 10}px`; // Offset to avoid overlapping
    detailsBox.style.top = `${event.pageY + 10}px`;
}

function hideTooltip() {
    detailsBox.style.display = "none";
}

// Pop-up Description Functions
function showDescription(event) {
    const state = event.target;
    const name = state.getAttribute('data-name');
    const population = state.getAttribute('data-population');
    const capital = state.getAttribute('data-capital');
    const area = state.getAttribute('data-area');

    // Fill description box with detailed information
    descriptionBox.innerHTML = `
        <strong>${name}</strong><br>
        Population: ${population}<br>
        Capital: ${capital}<br>
        Area: ${area}<br>
        Voting Issue: [Add details here]
    `;

    // Position description box near the clicked state
    descriptionBox.style.top = `${event.pageY}px`;
    descriptionBox.style.left = `${event.pageX}px`;
    descriptionBox.style.display = 'block';
}

function hideDescription(event) {
    if (event.target.tagName !== 'path') {
        descriptionBox.style.display = 'none';
    }
}

// Add tooltip and description box events once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#us-map path').forEach(path => {
        path.addEventListener('mouseenter', showTooltip);
        path.addEventListener('mousemove', moveTooltip);
        path.addEventListener('mouseleave', hideTooltip);
        path.addEventListener('click', showDescription);
    });

    // Event listener for hiding description box on map-section click
    document.getElementById('map-section').addEventListener('click', hideDescription);
});

// ########################################
// #           Form Validation            #
// ########################################

function validateForm(event) {
    event.preventDefault(); // Prevent form submission if validation fails

    // Get form values
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;

    // Reset previous invalid states
    resetInvalidFields();

    // Check if all required fields are filled
    if (!name || !email || !city || !state) {
        highlightInvalidFields([name, email, city, state]);
        alert("Please fill out all required fields.");
        return false;
    }

    // Validate email format using a regular expression
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
        highlightInvalidFields([email]);
        alert("Please enter a valid email address.");
        return false;
    }

    // If everything is valid, submit the form
    // Add the name to the list of signed names
    const signedNamesList = document.getElementById("signed-names-list");
    const listItem = document.createElement("li");
    listItem.textContent = name;
    signedNamesList.appendChild(listItem);

    // Display modal with personalized message
    showModal(name, city, state);

    return true;
}

function showModal(name, city, state) {
    const modal = document.getElementById("modal");
    const modalMessage = document.getElementById("modal-message");

    // Set personalized message
    modalMessage.textContent = `Thank you, ${name}, from ${city}, ${state}! Your petition has been successfully submitted.`;

    // Show the modal
    modal.style.display = "block";

    // Hide the modal after 5 seconds
    setTimeout(() => {
        modal.style.display = "none";
    }, 5000);
}

function highlightInvalidFields(fields) {
    fields.forEach(field => {
        if (field) {
            document.getElementById(field).classList.add("invalid");
        }
    });
}

function resetInvalidFields() {
    const invalidFields = document.querySelectorAll(".invalid");
    invalidFields.forEach(field => field.classList.remove("invalid"));
}


// ########################################
// #           Toggle Light/Dark Mode     #
// ########################################

function toggleMode() {
    const body = document.body;
    const toggleButton = document.getElementById("mode-toggle");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        toggleButton.textContent = "Switch to Dark Mode";
    } else {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        toggleButton.textContent = "Switch to Light Mode";
    }
}

// ########################################
// #           Toggle Content/Details     #
// ########################################

// Toggle content visibility
function toggleContent(id) {
    const content = document.getElementById(id);
    content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
}

// Toggle details visibility (for timeline)
function toggleDetails(element) {
    const details = element.querySelector('.details');
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
}

// ########################################
// #        Scrolling Animation Script    #
// ########################################

function handleScrollAnimation() {
    const sections = document.querySelectorAll("section");
    const windowHeight = window.innerHeight;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();

        // If the section is within the visible viewport (scrolled into view)
        if (rect.top < windowHeight && rect.bottom >= 0) {
            section.classList.add("visible");
        } else {
            section.classList.remove("visible");
        }
    });
}

// Listen for scroll events
window.addEventListener("scroll", handleScrollAnimation);

// Initial check on load
document.addEventListener("DOMContentLoaded", handleScrollAnimation);

// Ensure details box opacity is 100%
document.getElementById('details-box').style.opacity = 1;
