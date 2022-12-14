const option = (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += /* html */ `
      <ul role="tab" class="option-ul hidden">
        <li role="tablist" id='default' class="option-li">기본</li>
        <li role="tablist" id='newest' class="option-li">최신 순으로 보기</li>
        <li role="tablist" id='oldest' class="option-li">오래된 순으로 보기</li>
        ${
          location.pathname === '/'
            ? `<li role="tablist" id='filter' class="option-li">완료/미완료 구분해서 보기</li>`
            : ''
        }
        ${
          location.pathname === '/trash'
            ? `<li role="tablist" id='delete-all' class="option-li">휴지통 비우기</li>`
            : ''
        }
      </ul>
        `);
};

export { option };
