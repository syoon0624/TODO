export default (element) => {
  const el = document.querySelector(element);
  return (el.innerHTML += `
    <ul class="nav-ul">
      <li class="nav-li"><a class="nav-a" href="/">전체</a></li>
      <li class="nav-li"><a class="nav-a" href="/done">완료된 TODO</a></li>
      <li class="nav-li"><a class="nav-a" href="/notdone">미완료된 TODO</a></li>
    </ul>
      `);
};
