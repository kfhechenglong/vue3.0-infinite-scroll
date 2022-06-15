import { throttle } from "./uitls";
import { Element } from "./interface";
const ctx = "vue3@InfiniteScroll";
const getScrollTop = function (element: Element): number {
  if (element === window) {
    return Math.max(
      window.pageYOffset || 0,
      document.documentElement.scrollTop
    );
  }

  return (element as HTMLElement).scrollTop;
};

const getComputedStyle = (document.defaultView as any).getComputedStyle;

const getScrollEventTarget = function (element: HTMLElement): Element {
  let currentNode = element;
  while (
    currentNode &&
    currentNode.tagName !== "HTML" &&
    currentNode.tagName !== "BODY" &&
    currentNode.nodeType === 1
  ) {
    const overflowY = getComputedStyle(currentNode).overflowY;
    if (overflowY === "scroll" || overflowY === "auto") {
      return currentNode;
    }
    currentNode = currentNode.parentNode as HTMLElement;
  }
  return window;
};

const getVisibleHeight = function (element: Element): number {
  if (element === window) {
    return document.documentElement.clientHeight;
  }

  return (element as HTMLElement).clientHeight;
};

const getElementTop = function (element: Element): number {
  if (element === window) {
    return getScrollTop(window);
  }
  return (
    (element as HTMLElement).getBoundingClientRect().top + getScrollTop(window)
  );
};

const isAttached = function (element: HTMLElement): boolean {
  let currentNode = element.parentNode as HTMLElement;
  while (currentNode) {
    if (currentNode.tagName === "HTML") {
      return true;
    }
    if (currentNode.nodeType === 11) {
      return false;
    }
    currentNode = currentNode.parentNode as HTMLElement;
  }
  return false;
};

const doBind = function doBind(context: any) {
  if (context.binded) return;
  context.binded = true;

  const self = context;
  const element = self.el;

  const throttleDelayExpr = element.getAttribute(
    "infinite-scroll-throttle-delay"
  );
  let throttleDelay = 200;
  if (throttleDelayExpr !== null && throttleDelayExpr !== undefined) {
    throttleDelay = Number(throttleDelayExpr);
    if (isNaN(throttleDelay) || throttleDelay < 0) {
      throttleDelay = 200;
    }
  }
  self.throttleDelay = throttleDelay;

  self.scrollEventTarget = getScrollEventTarget(element);
  self.scrollListener = throttle(
    doCheck,
    self.throttleDelay,
    self
  );
  self.scrollEventTarget.addEventListener(
    "scroll",
    self.scrollListener
  );
    // disabled的值
  const disabledExpr = element.getAttribute("infinite-scroll-disabled");
  let disabled = false;
  // 要监听的值
  const watchDisabledExpr = element.getAttribute("infinite-scroll-watch-disabled");
  if (disabledExpr !== null && disabledExpr !== undefined) {
    // 监听disabled值，如果为true则紧张滚动事件触发
    context.vm.$watch(watchDisabledExpr, function (value: any) {
      self.disabled = value;
      if (!value && self.immediateCheck) {
        doCheck(self);
      }
    });
    disabled = disabledExpr === 'true';
  }
  self.disabled = disabled;

  const distanceExpr = element.getAttribute("infinite-scroll-distance");
  let distance = 0;
  if (distanceExpr !== null && distanceExpr !== undefined) {
    distance = Number(distanceExpr);
    if (isNaN(distance)) {
      distance = 0;
    }
  }
  self.distance = distance;
// 检查是否立即执行
  const immediateCheckExpr = element.getAttribute(
    "infinite-scroll-immediate-check"
  );
  let immediateCheck = true;
  if (immediateCheckExpr !== null && immediateCheckExpr !== undefined) {
    immediateCheck = Boolean(immediateCheckExpr);
  }
  self.immediateCheck = immediateCheck;

  if (immediateCheck) {
    doCheck(self);
  }

};

const doCheck = function doCheck(context: any, force?: boolean) {
  const scrollEventTarget = context.scrollEventTarget;
  const element = context.el;
  const distance = context.distance;

  if (force !== true && context.disabled) return;
  const viewportScrollTop = getScrollTop(scrollEventTarget);
  const viewportBottom =
    viewportScrollTop + getVisibleHeight(scrollEventTarget);

  let shouldTrigger = false;

  if (scrollEventTarget === element) {
    shouldTrigger = scrollEventTarget.scrollHeight - viewportBottom <= distance;
  } else {
    const elementBottom =
      getElementTop(element) -
      getElementTop(scrollEventTarget) +
      element.offsetHeight +
      viewportScrollTop;

    shouldTrigger = viewportBottom + distance >= elementBottom;
  }
  // context.expression 为绑定的v-infinite-scroll
  if (shouldTrigger && context.expression) {
    context.expression();
  }
};

const InfiniteScroll: any = {
  created: function bind(
    el: any,
    binding: { instance: any; value: any },
    vnode: any
  ) {
    el[ctx] = {
      el: el,
      vm: binding.instance,
      expression: binding.value,
    };
    el[ctx].vm.$nextTick(function () {
      if (isAttached(el)) {
        doBind(el[ctx]);
      }

      el[ctx].bindTryCount = 0;

      const tryBind = function tryBind() {
        if (el[ctx].bindTryCount > 10) return;
        el[ctx].bindTryCount++;
        if (isAttached(el)) {
          doBind(el[ctx]);
        } else {
          setTimeout(tryBind, 50);
        }
      };

      tryBind();
    });
    // });
  },
  unmounted: function unbind(el: any) {
    if (el && el[ctx] && el[ctx].scrollEventTarget)
      el[ctx].scrollEventTarget.removeEventListener(
        "scroll",
        el[ctx].scrollListener
      );
  },
};

const install = function install(Vue: {
  directive: (
    arg0: string,
    arg1: {
      created: (el: any, binding: any, vnode: any) => void;
      unmounted: (el: any) => void;
    }
  ) => void;
}) {
  Vue.directive("InfiniteScroll", InfiniteScroll);
};

InfiniteScroll.install = install;

export default InfiniteScroll;
