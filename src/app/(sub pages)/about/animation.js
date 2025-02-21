export const slideUp = {
  initial: {
    y: "100%",
    opacity: 0, // 初始透明度为0
  },
  open: (i) => ({
    y: "0%",
    opacity: 1, // 动画结束时透明度为1
    transition: { duration: 0.5, delay: 0.3 * i },
  }),
  closed: {
    y: "100%",
    opacity: 0, // 关闭时透明度为0
    transition: { duration: 0.5 },
  },
};
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
