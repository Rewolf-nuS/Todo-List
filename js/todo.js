const inpTask = document.querySelector(".inpTask");
const btnTask = document.querySelector(".btnTask");
const ul = document.querySelectorAll(".list-todo");

// Doneを押すとそのタスクを消す
function deleteData() {
  const btnDeleteArr = document.querySelectorAll(".finish");
  for (let i = 0; i < btnDeleteArr.length; i++) {
    const arr = btnDeleteArr[i];
    arr.addEventListener("click", function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You are trying to delete the task!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (!result.isConfirmed) {
          return false;
        }
        const listItem = this.parentNode;
        listItem.remove();
        localStorage.clear();
        Swal.fire("You did it!", "You've accomplished that.", "success");
        const afterDeleteDataLists = ul[0].innerHTML;
        jsonData = JSON.stringify(afterDeleteDataLists);
        localStorage.setItem("data", jsonData);
      });
    });
  }
}

// 初期表示
const jsonItems = localStorage.getItem("data");
const jsonObj = JSON.parse(jsonItems);
document.querySelector(".list-todo").innerHTML = jsonObj;
deleteData();

// 追加
btnTask.addEventListener("click", (e) => {
  e.preventDefault();

  if (inpTask.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "This is Invalid value.",
    });
    return false;
  }

  Swal.fire({
    position: "bottom-end",
    icon: "success",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
  });

  const li = document.createElement("li");
  const p = document.createElement("p");
  p.textContent = inpTask.value;

  const btnDelete = document.createElement("button");
  btnDelete.classList.add("finish");
  btnDelete.innerHTML = '<i class="far fa-trash-alt"></i>';

  li.append(btnDelete);
  li.append(p);
  ul[0].appendChild(li);

  inpTask.value = null;

  const dataLists = ul[0].innerHTML;
  let jsonData = JSON.stringify(dataLists);
  localStorage.setItem("data", jsonData);

  deleteData();

  return false;
});

// 全削除
const btnDeleteAll = document.querySelector(".btnDeleteAll");
btnDeleteAll.addEventListener("click", (e) => {
  e.preventDefault();
  Swal.fire({
    title: "Are you sure?",
    text: 'You are trying to delete "ALL TASKS"!!!',
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then((result) => {
    if (!result.isConfirmed) {
      return false;
    }

    const ulChild = ul[0].childNodes;
    [...ulChild].forEach((list) => {
      list.remove();
    });
    localStorage.clear();
    Swal.fire("Deleted.", "All tasks has been deleted.", "success");
  });
});
