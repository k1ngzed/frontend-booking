import Vue from "vue";

import "./element-ui"; // element-ui

/* 
# click outside function
#  v-on:click="value = !value" // Событие обработки
#  v-out="value" // Функция
*/
Vue.directive("out", {
  bind: function(el, binding, vNode) {
    const handler = e => {
      if (!el.contains(e.target) && el !== e.target) {
        vNode.context[binding.expression] = false;
      }
    };
    el.out = handler;
    document.addEventListener("click", handler);
  },
  // eslint-disable-next-line no-unused-vars
  unbind: function(el, binding) {
    document.removeEventListener("click", el.out);
    el.out = null;
  }
});

// Остальное
Vue.config.productionTip = false;
