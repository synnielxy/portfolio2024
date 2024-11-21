export const slideUp = {
  initial: {
      y: 200
  },
  open: (i) => ({
      y: 0,
      transition: {duration: 0.5, delay: .1 * i}
  }),
  closed: {
      y: 200,
      transition: {duration: 0.5}
  }
}