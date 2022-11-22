export default (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += `
      <form class="todo-form">
        <input placeholder="TODO를 입력하세요!"/>
        <button class="submit-button" type="submit">입력</button>
      </form>
    `);
};
