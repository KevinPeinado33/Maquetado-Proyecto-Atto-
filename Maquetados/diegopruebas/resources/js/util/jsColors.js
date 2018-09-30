var principal = [
    "red",
    "indigo",
    "lime",
    "green",
    "amber",
    "brown",
    "blue",
    "deep-orange",
    "blue-grey",
    "light-green",
    "deep-purple"
];

var lighten = [
    "lighten-1",
    "lighten-2",
    "lighten-3"
];

var darken = [
    "darken-1",
    "darken-2",
    "darken-3",
    "darken-4"
];

var accent = [
    "accent-1",
    "accent-2",
    "accent-3",
    "accent-4"
];

function getRandom(max) {
    return Math.round(Math.random() * max);
}

function getLetter(nombre) {
    var letter = nombre.split("");
    var Let = letter[0];
    return Let.toUpperCase();
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getColor() {
    return getPrincipal() + " " + getComplement();
}

function getPrincipal() {
    return principal[getRandom(principal.length)];
}

function getComplement() {
    return lighten[getRandom(lighten.length)];
}

function getColorDarken() {
    return getPrincipal() + " " + getColorDarken();
}