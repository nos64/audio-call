/** Перемешать массив с ответами */
export const shuffle = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/** Получить рандомную страницу при выборе сложности */
export const getRandomPage = () => Math.floor(Math.random() * 30);

/** Скрыть элемент */
export const hideElem = (elem: HTMLElement) => {
  let opacity = +getComputedStyle(elem).getPropertyValue('opacity');

  const animation = () => {
    opacity -= 0.05;
    elem.style.opacity = String(opacity);

    if (opacity > 0) {
      requestAnimationFrame(animation);
    } else {
      elem.style.display = 'none';
    }
  };

  requestAnimationFrame(animation);
};

/** Показать элемент */
// expport const showElem = (elem: HTMLElement) => {
//   let opacity = 0;
//   elem.style.opacity = String(opacity);
//   elem.style.display = '';

//   const animation = () => {
//     opacity += 0.05;
//     elem.style.opacity = String(opacity);

//     if (opacity < 1) {
//       requestAnimationFrame(animation);
//     }
//   };
//   requestAnimationFrame(animation);
// };
