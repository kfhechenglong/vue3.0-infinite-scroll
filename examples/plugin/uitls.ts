type Time = number;
export const throttle = function (fn: any, delay: Time) {
  let now: Time = 0;
  let lastExec: Time = 0;
  let timer: any = null;

  const execute = () => {
    fn();
    lastExec = now;
  };

  return () => {

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (lastExec) {
      const diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(function () {
          execute();
        }, diff);
      }
    } else {
      execute();
    }
  };
};
