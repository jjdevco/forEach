const spacing = (first, second, third, fourth) => {
  const sides = [first, second, third, fourth].filter((s) => s !== undefined)
    .length;
  switch (sides) {
    case 4: {
      return `${first === "auto" ? "auto" : first + "px"} ${
        second === "auto" ? "auto" : second + "px"
      } ${third === "auto" ? "auto" : third + "px"} ${
        fourth === "auto" ? "auto" : fourth + "px"
      }`;
    }
    case 3: {
      return `${first === "auto" ? "auto" : first + "px"} ${
        second === "auto" ? "auto" : second + "px"
      } ${third === "auto" ? "auto" : third + "px"} ${
        second === "auto" ? "auto" : second + "px"
      }`;
    }
    case 2: {
      return `${first === "auto" ? "auto" : first + "px"} ${
        second === "auto" ? "auto" : second + "px"
      }`;
    }
    case 1: {
      return `${first === "auto" ? "auto" : first + "px"}`;
    }
    default: {
      break;
    }
  }
};

const shadow = (elevation = 1) => {
  const extraEl = elevation - 1;
  const getSize = (v1, v24) =>
    `${v1 + Math.round(((v24 - v1) / 23) * extraEl)}px`;
  const getShade = (y, blur, spread, alpha) =>
    `0 ${getSize(y[0], y[1])} ${getSize(blur[0], blur[1])} ${getSize(
      spread[0],
      spread[1]
    )} rgba(0,0,0,${alpha})`;

  return `${getShade([2, 11], [1, 15], [-1, -7], 0.2)}, ${getShade(
    [1, 24],
    [1, 38],
    [0, 3],
    0.14
  )}, ${getShade([1, 9], [3, 46], [0, 8], 0.12)};`;
};

export default {
  colors: {
    primary: {
      main: "#4379EE",
      lighten: "#A4C0FF",
      darken: "#3D6CD0",
    },
    secondary: {
      main: "#BA29FF",
      lighten: "#F1D4FF",
      darken: "#9520CC",
    },
    success: {
      main: "#03B69C",
      lighten: "#ccf0eb",
      darken: "#027f6d",
    },
    info: {
      main: "#6226EF",
      lighten: "#DFD3FC",
      darken: "#5321CB",
    },
    warning: {
      main: "#FFA756",
      lighten: "#FFEDDD",
      darken: "#E1954F",
    },
    danger: {
      main: "#f25f51",
      lighten: "#fbd7d3",
      darken: "#bf2c1e",
    },
    background: {
      main: "#F5F6FA",
      lighten: "#FFFFFF",
      darken: "#D5D5D5",
    },
    text: {
      main: "#606060",
      lighten: "#A6A6A6",
      darken: "#202224",
    },
  },
  spacing,
  shadow,
};
