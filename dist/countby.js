export default function countBy(arr) {
    return arr.reduce(function (acc, item) {
        if (acc[item]) {
            acc[item] += 1;
        }
        else {
            acc[item] = 1;
        }
        return acc;
    }, {});
}
