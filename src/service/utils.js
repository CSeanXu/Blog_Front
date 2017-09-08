const date2Percent = (date) => {
    return parseInt(date * 100 / 30, 10)
};

export default {
    date2Percent: date2Percent
}