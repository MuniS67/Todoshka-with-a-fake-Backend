let baseURl = "http://localhost:8080";
let forma = document.forms.postData;
let inp = forma.querySelector("input");
let container = document.querySelector(".container");

fetch(baseURl + "/users")
  .then((res) => res.json())
  .then((res) => reload(res));

forma.onsubmit = (e) => {
  e.preventDefault();
  // inp.value.length === 0 ? e.preventDefault() : null;
  let user = {
    name: inp.value,
    time: new Date().getHours() + ":" + new Date().getMinutes(),
    isDone: false,
  };

  fetch(baseURl + "/users", {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  fetch(baseURl + "/users")
    .then((res) => res.json())
    .then((res) => reload(res));

  inp.value = "";
};

function reload(arr) {
  container.innerHTML = "";

  for (let item of arr) {
    // a
    let mainDiv = document.createElement("div");
    let topDiv = document.createElement("div");
    let title = document.createElement("span");
    let removeBtn = document.createElement("button");
    let timeSpan = document.createElement("span");

    // b
    title.classList.toggle("done", item.isDone);

    mainDiv.classList.add("item");
    topDiv.classList.add("top");
    timeSpan.classList.add("time");

    title.innerHTML = item.name;
    removeBtn.innerHTML = "x";
    timeSpan.innerHTML = item.time;

    // c
    mainDiv.append(topDiv, timeSpan);
    topDiv.append(title, removeBtn);
    container.append(mainDiv);

    // d
    title.onclick = () => {
      item.isDone = !item.isDone;

      title.classList.toggle("done", item.isDone);
    };

    removeBtn.onclick = () => {
      fetch(baseURl + "/users")
        .then((res) => res.json())
        .then((res) => {
          res.splice(res.indexOf(item), 1);
          mainDiv.remove();
        });
    };
  }
}
