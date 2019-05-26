const thousandsSeparator = (value) => {
    return value.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

export default { thousandsSeparator }