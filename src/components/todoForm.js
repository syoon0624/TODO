export default (element, className = '') => {
  const el = document.querySelector(element);
  return (el.innerHTML += `
    <div class=${className}> 
      <form class="todo-form">
        <input placeholder="TODO를 입력하세요!"/>
        <button class="submit-button" type="submit">입력</button>
      </form>
    </div>
    `);
};
