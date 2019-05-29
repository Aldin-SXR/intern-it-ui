const thousandsSeparator = (value) => {
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const shuffle = (a) => {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export default { thousandsSeparator, shuffle }