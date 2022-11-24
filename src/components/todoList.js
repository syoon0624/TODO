export default (element = undefined, data = []) => {
  if (element !== undefined) {
    const el = document.querySelector(element);
    return (el.innerHTML = /* html */ `
    <ul class="todo-ul"> 
      ${data
        .map((item) => {
          return `
        <li id=${item.id} class="todo-li" draggable="true">
          <div class="title-wrap ${item.done ? 'done' : ''}">
            <div class="edit-item">
              <form class="edit-form">
                <input class="edit" value="${
                  item.title
                }" disabled placeholder="수정할 TODO를 적어주세요." />
              </form>
            </div>
          </div>
          <div class="tool-wrap">
            <div class="done-wrap">
              ${
                item.done
                  ? `<button class="done-button done">✔️</button>`
                  : `<button class="done-button">✔️</button>`
              }
            </div>
            <button class="edit-button">수정하기</button>
            <button class="delete-item">X</button>
          </div>
        </li>`;
        })
        .join('')}
    </ul>
    `);
  }
  return false;
};
