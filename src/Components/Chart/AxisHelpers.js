export const totalMargins = ({ left, right, top, bottom }) => ({
  top: left + right,
  bottom: left + right,
  left: top + bottom,
  right: top + bottom
});

export const bothMargins = ({ left, right, top, bottom }) => ({
  top: [left, 100 - right],
  bottom: [left, 100 - right],
  left: [top, 100 - bottom],
  right: [top, 100 - bottom]
});

export const rangeFromMargins = margins => ({
  top: [margins.left, 100 - margins.right],
  bottom: [margins.left, 100 - margins.right],
  left: [100 - margins.bottom, margins.top],
  right: [100 - margins.bottom, margins.top]
});

export const tickTrans = (margins, distance, tickSize) => ({
  bottom: {
    translation: {
      x: distance,
      y: 0
    },
    scale: {
      width: tickSize,
      height: 1
    }
  },
  left: {
    translation: {
      x: 0,
      y: distance
    },
    scale: {
      width: 1,
      height: tickSize
    }
  },
  right: {
    translation: {
      x: 42,
      y: 42
    },
    scale: {
      width: 42,
      height: 42
    }
  },
  top: {
    translation: {
      x: 42,
      y: 42
    },
    scale: {
      width: 42,
      height: 42
    }
  }
});

export const axisTrans = margins => ({
  top: {
    translation: { x: 0, y: 0 },
    scale: { width: 100, height: margins.top / 100 }
  },
  bottom: {
    translation: { x: 0, y: 100 - margins.bottom },
    scale: { width: 1, height: margins.bottom / 100 }
  },
  left: {
    translation: { x: 0, y: 0 },
    scale: { width: margins.left / 100, height: 1 }
  },
  right: {
    translation: { x: 100 - margins.right, y: 0 },
    scale: { width: margins.right / 100, height: 100 }
  }
});

export const axisTransInsetFromMargins = margins => ({
  top: {
    translation: { x: 0, y: 0 },
    scale: { width: 1, height: margins.top / 100 }
  },
  bottom: {
    x: margins.left,
    y: 0,
    width: 100 - margins.left - margins.right,
    height: 100
  },
  left: {
    x: 0,
    y: margins.top,
    width: 100,
    height: 100 - margins.top - margins.bottom
  },

  right: {
    translation: { x: 100 - margins.right, y: 0 },
    scale: { width: margins.right / 100, height: 100 }
  }
});
