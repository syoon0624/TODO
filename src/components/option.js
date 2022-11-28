export default (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += /* html */ `
      <ul class="option-ul hidden">
        <li class="option-li">기본</li>
        <li class="option-li">최신 순으로 보기</li>
        <li class="option-li">오래된 순으로 보기</li>
        <li class="option-li">완료 / 미완료 구분해서 보기</li>
      </ul>
        `);
};
