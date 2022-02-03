const jobsWrapper = document.querySelector("#jobs-wrapper");
const filtersWrapper = document.querySelector("#filters-wrapper");
const filtersEl = document.querySelector("#filters");
const clearButton = document.querySelector("#clear-button");

const app = {
  currentFilters: [],
  data: [],
  async getData() {
    const res = await fetch("./data.json");
    const json = await res.json();

    this.data = json;
  },
  renderJobs() {
    this.data.forEach((job) => {
      const newJob = `
        <div class="card ${job.featured ? "featured" : ""}">
          <div class="left">
            <div class="logo">
              <img src="${job.logo}" alt="${job.company}" />
            </div>
            <div class="info">
              <div class="card-header">
                <h3>${job.company}</h3>
                ${job.new ? '<p class="is-new">NEW!</p>' : ""}
                ${job.featured ? '<p class="is-featured">FEATURED</p>' : ""}
              </div>
              <h2>${job.position}</h2>
              <p class="specifications">
                <span>${job.postedAt}</span>
                <span class="dot">.</span>
                <span>${job.contract}</span>
                <span class="dot">.</span>
                <span>${job.location}</span>
              </p>
            </div>
          </div>
          <div class="tags">
            ${job.languages
              .map(
                (language) =>
                  `<button data-language="${language}" class="tag">${language}</button>`
              )
              .join("")}
          </div>
        </div>
      `;

      jobsWrapper.innerHTML += newJob;
    });
  },
  addFiltersWhenClicked() {
    const tagButtons = document.querySelectorAll(".tag");
    tagButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (!filtersWrapper.classList.contains("active")) {
          filtersWrapper.classList.add("active");
        }

        const language = e.target.dataset["language"]

        if (this.currentFilters.includes(language)) return;

        this.currentFilters.push(language)

        filtersEl.innerHTML = "";

        this.currentFilters.forEach((filter) => {
          const newFilter = `
            <div class="filter">
              ${filter}
              <button data-delete="${filter}" class="delete">
                <img src="./images/icon-remove.svg" alt="Remove filter" />
              </button>
            </div>
          `;

          filtersEl.innerHTML += newFilter;
        });
      });
    });
  },
};

// const fetchData = async () => {
//   const tagButtons = document.querySelectorAll(".tag");

//   tagButtons.forEach((button) => {
//     button.addEventListener("click", (e) => {
//       const language = e.target.dataset["language"];

//       if (currentFilters.includes(language)) {
//         return;
//       } else {
//         currentFilters.push(language);

//         filtersEl.innerHTML = "";

//         filtersWrapper.classList.add("active");

//         currentFilters.forEach((filter) => {
//           const newFilter = `
//             <div class="filter">
//               ${filter}
//               <button data-delete="${filter}" class="delete">
//                 <img src="./images/icon-remove.svg" alt="Remove filter" />
//               </button>
//             </div>
//           `;

//           filtersEl.innerHTML += newFilter;

//           const deleteFilter = document.querySelectorAll(".filter .delete");

//           deleteFilter.forEach((button) => {
//             button.addEventListener("click", () => {
//               const filterToDelete = currentFilters.findIndex(
//                 button.dataset["delete"]
//               );
//               currentFilters.splice(filterToDelete);

//               filtersEl.innerHTML = "";

//               currentFilters.forEach((filter) => {
//                 const newFilter = `
//                 <div class="filter">
//                   ${filter}
//                   <button data-delete="${filter}" class="delete">
//                     <img src="./images/icon-remove.svg" alt="Remove filter" />
//                   </button>
//                 </div>
//               `;

//                 filtersEl.innerHTML += newFilter;
//               });
//             });
//           });
//         });
//       }
//     });

//     clearButton.addEventListener("click", () => {
//       currentFilters = [];

//       filtersEl.innerHTML = "";

//       filtersWrapper.classList.remove("active");
//     });
//   });
// };

// fetchData();

// 1. Add filters when tags are clicked

app.getData();

setTimeout(() => {
  app.renderJobs();
}, 100);

app.addFiltersWhenClicked();
