const colors = {
  yellow: {
    r: 255,
    g: 237,
    b: 0,
  },
  red   : {
    r: 255,
    g: 0,
    b: 0,
  },
  pink  : {
    r: 255,
    g: 0,
    b: 171,
  },
  blue  : {
    r: 0,
    g: 71,
    b: 171,
  },
  cyan  : {
    r: 0,
    g: 237,
    b: 255,
  },
  green : {
    r: 0,
    g: 181,
    b: 0,
  },
  white : {
    r: 255,
    g: 255,
    b: 255,
  },
  black : {
    r: 0,
    g: 0,
    b: 0,
  },
};
const MAX_COLOR_PORTION = 4;

const colorMix = [];
let $colors;
let $bucket;
let $clear;

const clearColors = () => {
  colorMix.length = 0;
  console.log(colorMix);
};

const addColor = (element) => {
  const data = element.dataset;
  const color = data?.color;
  const colorPortion = parseInt(data?.portion) ?? 0;

  //TODO reset color amount when = 4
  if (colorPortion < MAX_COLOR_PORTION) {
    colorMix.push(color);
    console.log(colorMix);
    return colorPortion + 1;
  }
  return colorPortion;
};

const setColorPortion = (element, colorPortion) => {
  element.dataset.portion = colorPortion;
};

const calculateColor = () => {
  const amountColors = colorMix.length;
  let redSum = 0;
  let greenSum = 0;
  let blueSum = 0;
  colorMix.map((colorName) => {
    redSum += colors[colorName].r;
    greenSum += colors[colorName].g;
    blueSum += colors[colorName].b;
  });
  redSum = Math.round(redSum / amountColors);
  greenSum = Math.round(greenSum / amountColors);
  blueSum = Math.round(blueSum / amountColors);
  return `#${redSum.toString(16).padStart(2, '0')}${greenSum.toString(16).padStart(2, '0')}${blueSum.toString(16).padStart(2, '0')}`;
};

const setBucketColor = (hexColor) => {
  console.log(hexColor);
  $bucket.style.backgroundColor = hexColor.toString();
};

const initPickers = () => {
  $colors = Array.from(document.querySelectorAll('.js-color'));
  $bucket = document.querySelector('.js-bucket');
  $clear = document.querySelector('.js-clear');

  $colors.map(($item) => {
    $item.addEventListener('click', (e) => {
      setColorPortion(e.target, addColor(e.target));
      setBucketColor(calculateColor());
    });
  });

  $clear.addEventListener('click', () => {
    $colors.map(($item) => {
      setColorPortion($item, 0);
    });
    clearColors();
    setBucketColor('white');
  });

};

const init = () => {
  console.log('INIT');
  initPickers();
};

window.addEventListener('load', init);