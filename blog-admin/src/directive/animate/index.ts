import { useIntersectionObserver } from "@vueuse/core";
import { Directive, DirectiveBinding } from "vue";

/**
 * v-animate 元素显示动画
 */
export const animate: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    
    const { value } = binding;
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      // 元素进入可视区
      if (isIntersecting) {
        stop();
        const { top } = el.getBoundingClientRect();
        const h = document.documentElement.clientHeight || document.body.clientHeight;
        if (top < h) {
          el.style.visibility = "visible";
          el.style.animationName = value;
          
        }
      }
    });
  },
};
