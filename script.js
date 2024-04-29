const btns = document.querySelectorAll(".toggle-button");

btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        console.log(btn[i], i)
    })
})




function toggleContent(clickedButton) {
    const targetId = clickedButton.getAttribute("data-target");

    // Oculta todos los títulos
    document.querySelectorAll(".titleHeader").forEach(title => {
        title.style.display = "none";
    });

    // Muestra el título correspondiente al botón clicado
    const targetTitle = document.getElementById(targetId);
    targetTitle.style.display = "block";

    // Quita la clase "active" de todos los botones
    document.querySelectorAll(".toggle-button").forEach(button => {
        button.classList.remove("active");
    });

    // Añade la clase "active" al botón clicado
    clickedButton.classList.add("active");
}



/* const monthlyButton = document.querySelector('.toggle-button:nth-child(1)');
const annualButton = document.querySelector('.toggle-button:nth-child(2)');
const monthlyPrice = document.getElementById('monthlyPrice');
const annualPrice = document.getElementById('annualPrice');
const monthlyDescription = document.getElementById('monthlyDescription');
const annualDescription = document.getElementById('annualDescription');
const titleMonthly = document.getElementById('titleMonthly');
const titleAnnual = document.getElementById('titleAnnual');
const btnMonthly = document.getElementById('btnMonthly');
const btnAnnual = document.getElementById('btnAnnual');


function toggleView(view) {
if (view === 'monthly') {
    monthlyButton.classList.add('active');
    annualButton.classList.remove('active');
    monthlyPrice.style.display = 'inline-block';
    annualPrice.style.display = 'none';
    monthlyDescription.style.display = 'inline-block';
    annualDescription.style.display = 'none';
    titleMonthly.style.display = 'block';
    titleAnnual.style.display = 'none';
    btnMonthly.style.display = 'flex';
    btnAnnual.style.display = 'none';
} else {
    monthlyButton.classList.remove('active');
    annualButton.classList.add('active');
    monthlyPrice.style.display = 'none';
    annualPrice.style.display = 'inline-block';                
    monthlyDescription.style.display = 'none';
    annualDescription.style.display = 'inline-block';
    titleMonthly.style.display = 'none';
    titleAnnual.style.display = 'block';
    btnMonthly.style.display = 'none';
    btnAnnual.style.display = 'flex';
}
}

monthlyButton.addEventListener("click", () => {
     toggleView("monthly");                          
})

annualButton.addEventListener("click", () => {
     toggleView("annual");                          
}) */



document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".toggle-button");

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");

            // Oculta todos los títulos
            document.querySelectorAll(".titleHeader").forEach(title => {
                title.style.display = "none";
            });

            // Muestra el título correspondiente al botón clicado
            const targetTitle = document.getElementById(targetId);
            targetTitle.style.display = "block";

            // Quita la clase "active" de todos los botones
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Añade la clase "active" al botón clicado
            this.classList.add("active");
        });
    });
});


/*  */


const yearButtons_mobile = document.querySelectorAll(".year-button_mobile");
const yearContents_mobile = Array.from(document.querySelectorAll(".year-text_mobile"));
const yearImg_mobile = Array.from(document.querySelectorAll(".year-image_mobile")); 


    yearButtons_mobile.forEach((button, i) => {
    button.addEventListener("click", () => {
    yearButtons_mobile.forEach(btns => {
    btns.classList.remove("active");
  });
  yearButtons_mobile[i].classList.add("active")
        });
    });


yearContents_mobile.forEach(content => {
    content.style.display = "none"; // Oculta todos los contenidos al principio
});

yearContents_mobile[yearContents_mobile.length - 1].style.display = "flex"; 
yearButtons_mobile[yearButtons_mobile.length - 1].classList.add("active")
yearImg_mobile.forEach(content => {
    content.style.display = "none"; // Oculta todos los contenidos al principio
});

yearImg_mobile[yearContents_mobile.length - 1].style.display = "flex"; 

yearButtons_mobile.forEach(button => {
    button.addEventListener("click", function() {
        const year_mobile = this.getAttribute("data-year");

        
        yearContents_mobile.forEach(content => {
            content.style.display = "none";
        });

        yearImg_mobile.forEach(content => {
            content.style.display = "none";
        });
        const content_mobile = document.querySelector(`.year-text_mobile[data-year="${year_mobile}"]`);
        content_mobile.style.display = "flex";
        
        const content_mobile2 = document.querySelector(`.year-image_mobile[data-year="${year_mobile}"]`);
        content_mobile2.style.display = "flex";
    });
});