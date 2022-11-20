export default (element = undefined, data = []) => {
  if (element !== undefined) {
    const el = document.querySelector(element);
    return (el.innerHTML = `
    <ul class="todo-ul"> 
      ${data
        .map((item) => {
          return `
        <li id=${item.id} class="todo-li">
          <p class="title">${item.title}</p>
          <button class="edit-button">수정하기</button>
          <div class="edit-item hidden">
            <form class="edit-form">
              <input placeholder="수정할 TODO를 적어주세요." />
              <button type="submit">완료</button>
            </form>
          </div>
          <button class="delete-item">X</button>
        </li>`;
        })
        .join('')}
    </ul>
    `);
  }
  return false;
};
