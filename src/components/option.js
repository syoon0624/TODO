export default (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += /* html */ `
      <ul class="option-ul hidden">
        <li id='default' class="option-li">기본</li>
        <li id='newest' class="option-li">최신 순으로 보기</li>
        <li id='oldest' class="option-li">오래된 순으로 보기</li>
        <li id='filter' class="option-li">완료/미완료 구분해서 보기</li>
      </ul>
        `);
};
