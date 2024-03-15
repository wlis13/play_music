function paragraphIndex(total) {
  let init = 0;
  let end = 30;
  if (init < 30 - total.length) {
    setInterval(() => {
      init += 1;
    }, 1000);
  }
  if (end < total.length) {
    setInterval(() => {
      end += 1;
    }, 1000);
  }
  return { init, end };
}

export {
  paragraphIndex,
};
