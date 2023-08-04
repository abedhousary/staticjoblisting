const filterbtns = [];
let filteredContainer = document.querySelector(".filtered-items");
let clear = document.querySelector(".clear");
document.addEventListener("DOMContentLoaded", function () {
    // Fetch the data.json file
    fetch("data.json")
        .then(response => response.json())
        .then(data => createHTMLElements(data))
        .catch(error => console.error("Error fetching data:", error));
});





function createElementWithClass(tag, className) {
    const element = document.createElement(tag);
    element.classList.add(className);
    return element;
}


clear.onclick = () => {
    let itemstoremove = document.querySelectorAll("#chosenItems");
    let getAllJobs = document.querySelectorAll(".job-container");
    itemstoremove.forEach((e) => {
        e.style.display = "none";
    })

    getAllJobs.forEach((e) => {
        e.classList.remove("hidden");
    })
};





function createHTMLElements(data) {
    const contentDiv = document.querySelector(".jobs-container");

    // Loop through the data array and create HTML elements
    data.forEach(item => {
        const jobContainer = document.createElement("div");
        jobContainer.classList.add("job-container");

        const leftCon = document.createElement("div");
        leftCon.classList.add("left-con");

        const companyLogo = createElementWithClass("div", "company");

        logoimg = createElementWithClass("img", "cmplogo");
        logoimg.src = item.logo;
        leftCon.appendChild(companyLogo);
        companyLogo.appendChild(logoimg);
        jobContainer.appendChild(leftCon);

        // End Of the left container 

        const rightCon = createElementWithClass("div", "right-con");
        const topContent = createElementWithClass("div", "top-content");
        const companyName = createElementWithClass("div", "company-name");
        companyName.innerHTML = item.company;
        const isNew = createElementWithClass("div", "new");
        isNew.innerHTML = "New!";
        const isFeatured = createElementWithClass("div", "Featured");
        isFeatured.innerHTML = "Featured";
        const middlepart = createElementWithClass("div", "middle-part");
        middlepart.innerHTML = item.position
        const bottompart = createElementWithClass("div", "bottom-part");
        const cutter = createElementWithClass("div", "cutter");
        cutter.innerHTML = "."
        const published = createElementWithClass("div", "published");
        published.innerHTML = item.postedAt;

        const period = createElementWithClass("div", "period");
        period.innerHTML = item.contract;
        const location = createElementWithClass("div", "location");
        location.innerHTML = item.location;
        bottompart.appendChild(published);
        bottompart.appendChild(cutter);
        bottompart.appendChild(period);
        bottompart.appendChild(cutter);
        bottompart.appendChild(location);
        const jobFilters = createElementWithClass("div", "job-filters");



        const jobFiltersarr = item.languages

        jobFiltersarr.forEach((e) => {
            const itemFilter = createElementWithClass("div", "item");
            jobFilters.appendChild(itemFilter);
            const lang = createElementWithClass("div", "item-title");
            lang.id = "filterbtns";
            lang.innerHTML = e;
            lang.onclick = getinnerText;
            itemFilter.id = "ChosenItem"
            itemFilter.appendChild(lang);
            filterbtns.push(lang);
            jobContainer.classList.add(`${e}`)
            // console.log(itemFilter);
        })


        topContent.appendChild(companyName);
        if (item.new) {
            topContent.appendChild(isNew);
            jobContainer.classList.add("new-job")

        }
        if (item.featured) {
            topContent.appendChild(isFeatured)
        }

        rightCon.appendChild(topContent);
        rightCon.appendChild(middlepart);
        rightCon.appendChild(bottompart);
        // rightCon.appendChild(jobFilters);

        jobContainer.appendChild(rightCon);
        jobContainer.appendChild(jobFilters);

        contentDiv.appendChild(jobContainer);
    });
}
function getinnerText() {
    const itemElement = createElementWithClass("div", "item");
    itemElement.id = "chosenItems"
    const itemTitle = createElementWithClass("div", "item-title");
    itemTitle.innerHTML = event.target.innerHTML;
    const imgElement = createElementWithClass("div", "cancel-item");
    const insideImg = createElementWithClass("img", "cross");
    insideImg.src = "./images/icon-remove.svg";
    itemElement.appendChild(itemTitle)
    imgElement.appendChild(insideImg);
    itemElement.appendChild(imgElement);
    filteredContainer.appendChild(itemElement);

    let jobsToGet = document.querySelectorAll(`.${event.target.innerHTML}`);
    let getAllJobs = document.querySelectorAll(".job-container");
    getAllJobs.forEach((e) => {
        e.classList.add("hidden");
    })
    jobsToGet.forEach((e) => {
        e.style.display = "flex";
    })
    console.log(jobsToGet);
}

