export const throttle = function (fn, delay, context) {
    let now = 0;
    let lastExec = 0;
    let timer = null;
    const execute = () => {
        fn(context);
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
            }
            else {
                timer = setTimeout(function () {
                    execute();
                }, diff);
            }
        }
        else {
            execute();
        }
    };
};
//# sourceMappingURL=uitls.js.map