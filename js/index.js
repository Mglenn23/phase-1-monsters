getDataMonster();
let createMonster = document.getElementById("create-monster");
let containerMonster = document.getElementById("monster-container");
let btnForward = document.getElementById("forward");
let btnBack = document.getElementById("back");

let form = document.createElement("form");
let inputName = document.createElement("input");
let inputAge = document.createElement("input");
let inputDescription = document.createElement("input");
let btn = document.createElement("button");

inputName.setAttribute("placeholder", "name...");
inputName.setAttribute("class", "name");
inputAge.setAttribute("placeholder", "age...");
inputAge.setAttribute("class", "age");
inputDescription.setAttribute("placeholder", "description...");
inputDescription.setAttribute("class", "description");
btn.textContent = "Create";
form.appendChild(inputName);
form.appendChild(inputAge);
form.appendChild(inputDescription);

form.appendChild(btn);

createMonster.appendChild(form);

function addMonster(name, age, description) {
  const formData = {
    name: `${name}`,
    age: `${age}`,
    description: `${description}`,
  };
  const configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  fetch("http://localhost:3000/monsters", configurationObject);
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputMonsterName = document.querySelector(".name").value;
  let inputMonsterAge = document.querySelector(".age").value;
  let inputMonsterDescription = document.querySelector(".description").value;
  addMonster(inputMonsterName, inputMonsterAge, inputMonsterDescription);
  form.reset();
});
// function createMonster(name, age, desc) {}
let page = 1;

console.log(page);
function getDataMonster() {
  const configurationObject = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  fetch("http://localhost:3000/monsters", configurationObject)
    .then((resp) => {
      return resp.json();
    })
    .then(function (obj) {
      let maxPage = parseInt(Object.keys(obj).length / 50);
      console.log(Object.keys(obj).length);
      if (page === 1) {
        for (let i = 0; i < 50; i++) {
          // console.log(obj[i]);
          let div = document.createElement("div");
          let h2 = document.createElement("h2");
          let h4 = document.createElement("h4");
          let p = document.createElement("p");
          h2.textContent = `${obj[i].name}`;
          h4.textContent = `${obj[i].age}`;
          p.textContent = `${obj[i].description}`;
          div.appendChild(h2);
          div.appendChild(h4);
          div.appendChild(p);
          containerMonster.appendChild(div);
        }
      }

      btnForward.addEventListener("click", () => {
        page++;
        containerMonster.innerHTML = "";
        let indx = 0;
        let length = 50;
        if (page > 2) {
          indx = 50 * (page - 1);
          length = (page - 1) * 50 + 50;
        } else if (page === 2) {
          indx = 50;
          length = 100;
        }
        console.log(indx);
        console.log(length);

        for (let i = indx; i < length; i++) {
          // console.log(obj[i]);
          let div = document.createElement("div");
          let h2 = document.createElement("h2");
          let h4 = document.createElement("h4");
          let p = document.createElement("p");
          h2.textContent = `${obj[i].name}`;
          h4.textContent = `${obj[i].age}`;
          p.textContent = `${obj[i].description}`;
          div.appendChild(h2);
          div.appendChild(h4);
          div.appendChild(p);
          containerMonster.appendChild(div);
        }

        if (page > maxPage) {
          alert("Aint no monsters here");
          page = 20;
        }
        console.log(page);
      });

      btnBack.addEventListener("click", () => {
        page--;
        if (page === 0) {
          page = 1;
          alert("Aint no monsters here");
        }
        containerMonster.innerHTML = "";
        let indx = 0;
        let length = 50;
        if (page > 2) {
          indx = 50 * (page - 1);
          length = (page - 1) * 50 + 50;
        } else if (page === 2) {
          indx = 50;
          length = 100;
        }
        console.log(page);
        console.log(indx);
        console.log(length);

        for (let i = indx; i < length; i++) {
          // console.log(obj[i]);
          let div = document.createElement("div");
          let h2 = document.createElement("h2");
          let h4 = document.createElement("h4");
          let p = document.createElement("p");
          h2.textContent = `${obj[i].name}`;
          h4.textContent = `${obj[i].age}`;
          p.textContent = `${obj[i].description}`;
          div.appendChild(h2);
          div.appendChild(h4);
          div.appendChild(p);
          containerMonster.appendChild(div);
        }
        console.log(page);
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
