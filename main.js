var root = document.documentElement;

const portfolio  = document.getElementById("Portfolio");

const title  = document.getElementById("title");

const container = document.getElementById("container_section");
container.addEventListener('scroll', handleScroll);

const leftButton = document.getElementById("leftButton");
const rightButton = document.getElementById("rightButton");

const pagination = document.getElementById("pagination_section");

let current_child = 0;
let number_of_children = container.children.length;

isNavigating = false;

portfolio.addEventListener("wheel", (event) => {
    event.preventDefault();
    const deltaY = event.deltaY;
    const direction = Math.sign(deltaY);
    scrollToChild(direction);
});

updatePagination();
navHandler();
titleHandler();

function handleScroll() {
    if(!isNavigating)
    {
        isNavigating = true;
        navHandler();
        titleHandler();
        setTimeout(() => {
            isNavigating = false;
        }, 0);        
    }
}

function navHandler(){    
    if (current_child === 0) {
        leftButton.classList.remove('fade_in');
        leftButton.classList.add('fade_out');
    } else {
        leftButton.classList.remove('fade_out');
        leftButton.classList.add('fade_in');
    }

    if (current_child === number_of_children - 1) {
        rightButton.classList.remove('fade_in');
        rightButton.classList.add('fade_out');
    } else {
        rightButton.classList.remove('fade_out');
        rightButton.classList.add('fade_in');
    }
}

function titleHandler() {
    title.classList.add("delete");

    setTimeout(function () {
        title.textContent = container.children[current_child].getAttribute('title');
        title.classList.remove("delete");
        title.classList.add("write");
    }, 900);
}

function scrollToChild(direction) {
    if(!isNavigating)
    {
        isNavigating = true;
        const nextDesignIndex = current_child + direction;

        if (nextDesignIndex >= 0 && nextDesignIndex < number_of_children) {
            current_child = nextDesignIndex;
            updatePagination();
            const scrollAmount = container.clientWidth * direction;
            container.scrollTo({
            left: container.scrollLeft + scrollAmount,
            behavior: 'smooth'
            });
        }
        setTimeout(() => {
            isNavigating = false;
        }, 0);        
    }
}

function goToChild(index) {
    current_child = index;
    const targetChild = container.children[index];
    if (targetChild) {
      updatePagination();
      smoothScroll(targetChild);
    }
}

function smoothScroll(child) {
    if (child) {
        child.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "start",
        });
    }
}

function updatePagination() {
    pagination.innerHTML = "";
    for (let i = 0; i < number_of_children; i++) {
      const pagination_page = document.createElement("div");
      pagination_page.classList.add("pagination_page");
      if (i === current_child) {
        pagination_page.classList.add("pagination_active");
      }
      pagination_page.addEventListener("click", () => goToChild(i));
      pagination.appendChild(pagination_page);
    }
}