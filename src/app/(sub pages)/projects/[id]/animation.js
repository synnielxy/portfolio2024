export const slideUp = {
  initial: {
      y: "200%"
  },
  open: (i) => ({
      y: "0%",
      transition: {duration: 0.5, delay: .3 * i}
  }),
  closed: {
      y: "200%",
      transition: {duration: 0.5}
  }
}
export const slideWithMask = {
  initial: {
    x: "100%", // 初始位置在屏幕右侧
  },
  open: (i) => ({
    x: "0%", // 动画结束时，完全可见
    transition: { duration: 0.5, delay: 0.1 * i },
  }),
  closed: {
    x: "100%", // 关闭时回到右侧
    transition: { duration: 0.5 },
  },
};
