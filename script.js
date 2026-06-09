
document
.getElementById("contactForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    // Get Input Values

    const name = document
    .getElementById("name")
    .value;

    const email = document
    .getElementById("email")
    .value;

    const message = document
    .getElementById("message")
    .value;

    // Validation

    if(name === "" || email === "" || message === ""){

        alert("Please fill all fields");

        return;
    }

    try{

        // Send Data To Backend

        const response = await fetch(
            "http://localhost:5000/contact",
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({
                    name,
                    email,
                    message
                })
            }
        );

        // Get Response

        const data = await response.text();

        // Success Message

        alert(data);

        // Reset Form

        document
        .getElementById("contactForm")
        .reset();

    }
    catch(error){

        console.log(error);

        alert("Server connection failed");

    }

});


// Smooth Scroll Effect

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const targetId = this.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth"
        });

    });

});


// Simple Welcome Message

window.addEventListener("load", () => {

    console.log("Portfolio Website Loaded Successfully");

});