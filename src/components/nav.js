export default (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += /* html */ `
    <ul class="nav-ul">
      <li id="home" class="nav-li"><a class="nav-a" href="/">전체</a></li>
      <li id="done" class="nav-li"><a class="nav-a" href="/done">TODO <strong>✔️</strong> </a></li>
      <li id="notdone" class="nav-li"><a class="nav-a" href="/notdone">TODO <strong>𝗫</strong></a></li>
      <li id="trash" class="nav-li"><a class="nav-a" href="/trash">휴지통</a></li>
    </ul>
      `);
};
