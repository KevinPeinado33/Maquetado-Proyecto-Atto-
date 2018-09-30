var dias_semana =["Sin Definir","Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
var dateConverter = (function () {
    var validate = function (date) {
        var m = moment(date);
        return m.isValid();
    };

    var init = function () {
        $(appDefaults.classes.formatDate).each(function () {
            $(this).html(dateConverter.format.stringToDate($(this).html()));
        });
        $(appDefaults.classes.formatDia).each(function () {
            var n = $(this).html();
            n = parseInt(n);
            $(this).html(dias_semana[n]);
        });
        $('.datepicker').each(function () {
            var d = $(this).val();
            var picker = $(this).pickadate('picker');
            picker.set('select', new Date(d));
        });
    };

    var addTime = function (long_today, f) {
        var signo = f[0];
        var dias = f.substring(1, f.length - 1);
        var tipo = f[f.length - 1];
        if (strings.validate(signo) && strings.validate(dias) && strings.validate(tipo)) {
            if (tipo === 'd') {
                dias = parseInt(dias);
            } else if (tipo === 'w') {
                dias = parseInt(dias) * 7;
            } else if (tipo === 'h') {
                var result = parse.longToDate(long_today);
                result.setHours(result.getHours() + parseInt(dias));
                return result;
            }
            var result = parse.longToDate(long_today);
            result.setDate(result.getDate() + dias);
            return result;
        }
    };

    var parse = (function () {
        var longToDate = function (long) {
            if (validate(long)) {
                return moment(long).toDate();
            }
            return null;
        };
        return {
            longToDate: longToDate
        };
    }());
    var format = (function () {
        var longToDate = function (long) {
            if (validate(long)) {
                return moment(long).format(appDefaults.date.defaultDateFormat);
            }
            return '';
        };
        var longToMonthName = function (long) {
            if (validate(long)) {
                return moment(long).format(appDefaults.date.defaultMonthNameFormat);
            }
            return '';
        };
        var longToDayNumber = function (long) {
            if (validate(long)) {
                return moment(long).format(appDefaults.date.defaultDayFormat);
            }
            return '';
        };
        var longToDateTime = function (long) {
            if (validate(long)) {
                return moment(long).format(appDefaults.date.defaultDateTimeFormat);
            }
            return '';
        };
        var longStringToDate = function (long) {
            long = parseInt(long);
            if (validate(long)) {
                return moment(long, 'x').format(appDefaults.date.defaultDateFormat);
            }
            return '';
        };
        var longStringToTime = function (long) {
            long = parseInt(long);
            if (validate(long)) {
                return moment(long, 'x').format(appDefaults.date.defaultTimeFormat);
            }
            return '';
        };
        var longStringToTime24 = function (long) {
            long = parseInt(long);
            if (validate(long)) {
                return moment(long, 'x').format(appDefaults.date.defaultTimeFormat24);
            }
            return '';
        };
        var longStringToDateTime = function (long) {
            long = parseInt(long);
            if (validate(long)) {
                return moment(long).format(appDefaults.date.defaultDateTimeFormat);
            }
            return '';
        };

        var stringToDate = function (str) {
            if (validate(str)) {
                return moment(str).format(appDefaults.date.defaultDateFormat);
            }
            return "";
        };
        var stringToDateTime = function (str) {
            if (validate(str)) {
                return moment(str).format(appDefaults.date.defaultDateTimeFormat);
            }
            return "";
        };

        var datePickerToString = function (date) {
            var data = date.split(" ");
            for (var i = 0; i < months.length; i++) {
                if (months[i] === data[2].toLowerCase()) {
                    month = (i + 1).toString();
                    (month.length < 2) ? month = '0' + month : month;
                }
            }
            var day = data[0];
            var year = data[4];
            return year + "-" + month + "-" + day;
        };

        var dateSlach = function (date) {
            var data = date.split("/");
            return data[2] + "-" + data[1] + "-" + data[0];
        };

        return {
            longToDate: longToDate,
            longToDateTime: longToDateTime,
            longStringToDate: longStringToDate,
            longStringToDateTime: longStringToDateTime,
            stringToDate: stringToDate,
            datePickerToString: datePickerToString,
            longStringToTime: longStringToTime,
            longStringToTime24:longStringToTime24,
            stringToDateTime: stringToDateTime,
            longToMonthName: longToMonthName,
            longToDayNumber: longToDayNumber,
            dateSlach: dateSlach
        };
    }());
    return {
        parse: parse,
        validate: validate,
        format: format,
        init: init,
        addTime: addTime
    };
}());

var date;
var year;
var month;
var day;

var months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre"
];

function getActualDateLong() {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    return day + " de " + months[month] + " del " + year;
}

function getDateLong(date) {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDate();
    return day + " de " + months[month] + " del " + year;
}

function getFormatMySQL(date) {
    year = date.getFullYear();
    month = parseInt(date.getMonth()) + 1;
    day = date.getDate();
    return year + "-" + month + "-" + day;
}
