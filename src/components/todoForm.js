const todoForm = (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += /* html */ `
      <form class="todo-form">
        <input placeholder="TODO를 입력하세요!" />
        <button class="submit-button" type="submit">등록</button>
      </form>
    `);
};

export { todoForm };
