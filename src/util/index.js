// export function camel (str) {
//   const camel = (str || '').replace(/-([^-])/g, g => g[1].toUpperCase());

//   return capitalize(camel);
// }

// export function camelActual (str) {
//   return (str || '').replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
// }

// export function kebab (str) {
//   return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
// }

// export function capitalize (str) {
//   str = str || '';

//   return `${str.substr(0, 1).toUpperCase()}${str.slice(1)}`;
// }

// export function findProduct (store, id) {
//   return store.state.store.products.find(p => p.id === id);
// }

// export function isOnSale (variants) {
//   return variants.some(variant => {
//     return parseFloat(variant.price) < parseFloat(variant.compareAtPrice);
//   });
// }

// export function randomNumber (min, max) {
//   return Math.floor(Math.random() * max) + min;
// }

// export function randomString (length = 5) {
//   let text = '';
//   const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }

//   return text;
// }

const MEASUREMENT_UNIT_METRIC = "Metric";
const MEASUREMENT_UNIT_IMPERIAL = "Imperial";
const MEASUREMENT_UNIT_KILOGRAM = "kg";
const MEASUREMENT_UNIT_KILOGRAMS = "kgs";
const MEASUREMENT_UNIT_CENTIMETER = "cm";
const MEASUREMENT_UNIT_CENTIMETERS = "cms";
const MEASUREMENT_UNIT_INCH = "in";
const MEASUREMENT_UNIT_INCHES = "ins";
const MEASUREMENT_UNIT_POUND = "lb";
const MEASUREMENT_UNIT_POUNDS = "lbs";
const MEASUREMENT_TEMPERATURE_C = "C";
const MEASUREMENT_TEMPERATURE_F = "F";

const unitMetric = () =>  {
  return {
    weight: {
      singular: MEASUREMENT_UNIT_KILOGRAM,
      plural: MEASUREMENT_UNIT_KILOGRAMS
    },
    height: {
      singular: MEASUREMENT_UNIT_CENTIMETER,
      plural: MEASUREMENT_UNIT_CENTIMETERS
    },
    temperature: MEASUREMENT_TEMPERATURE_C
  }
}

const unitImperial = () =>  {
  return {
    weight: {
      singular: MEASUREMENT_UNIT_POUND,
      plural: MEASUREMENT_UNIT_POUNDS
    },
    height: {
      singular: MEASUREMENT_UNIT_INCH,
      plural: MEASUREMENT_UNIT_INCHES
    },
    temperature: MEASUREMENT_TEMPERATURE_F
  }; 
}

const emptyUnitLabels = () => {
  return {
    weight: {
      singular: '',
      plural: ''
    },
    height: {
      singular: '',
      plural: ''
    },
    temperature: ''
  };
}

const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = str => {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

const toggleFullScreen = () => {
  let doc = window.document
  let docEl = doc.documentElement

  let requestFullScreen =
    docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
  let cancelFullScreen =
    doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl)
  } else {
    cancelFullScreen.call(doc)
  }
}

const getUnitLabels = (unitSystem) => {
  return unitSystem === MEASUREMENT_UNIT_IMPERIAL ? unitImperial() : unitMetric();
}

const getEmptyUnitLabels = () => {
  return  emptyUnitLabels();
}

export default {
  randomElement,
  toggleFullScreen,
  kebab,
  getUnitLabels,
  getEmptyUnitLabels
}