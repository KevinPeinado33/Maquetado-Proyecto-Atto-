var math = (function () {
    var between = function (start, end, value) {
        return (value >= start && value <= end);
    };

    var intervalStringToArray = function (interval) {
        var arr = [];
        var intervals = interval.split(",");
        for (var i = 0; i < intervals.length; i++) {
            var item = intervals[i];
            var int2 = item.split("-");
            if (int2.length > 1) {
                var arr1 = intervalToArray(parseInt(int2[0]), parseInt(int2[1]));
                arr = arr.concat(arr1);
            } else {
                arr = arr.concat(parseInt(int2[0]));
            }
        }
        return arr;
    };

    var intervalToArray = function (min, max) {
        var arr = [];
        for (var i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    };

    var formatArrayInterval = function (arr) {
        arr = sortNumber(arr);
        var groups = [];
        var start = null;
        var end = null;
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (start === null) {
                start = arr[i];
            }
            if (i + 1 <= arr.length) {
                end = arr[i + 1];
                if (start + count + 1 !== end) {
                    if (count > 0) {
                        groups.push(start + "-" + arr[i]);
                    } else {
                        groups.push(start + "");
                    }
                    count = 0;
                    start = null;
                } else {
                    count = count + 1;
                }
            }
        }

        var format = '';
        for (var i = 0; i < groups.length; i++) {
            format += groups[i];
            if (i !== (groups.length - 1)) {
                format += ",";
            }
        }
        return format;
    };
    
    var sortNumber = function (arr) {
        arr = arr.sort(function (a, b) {
            return a - b;
        });
        return arr;
    };
    
    return {
        between: between,
        intervalStringToArray: intervalStringToArray,
        intervalToArray: intervalToArray,
        formatArrayInterval:formatArrayInterval
    };
}());

