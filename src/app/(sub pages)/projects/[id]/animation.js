export const slideUp = {
  initial: {
    y: 200,
    opacity: 0,
  },
  open: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.1 * i },
  }),
  closed: {
    y: 200,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
