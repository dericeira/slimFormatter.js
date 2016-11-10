(function(root, undefined) {
    /* Library global object for reference */
    var lib = {};
    //Current version
    lib.version = "1.0.0";
    //Main settings
    lib.settings = {
        currency: {
            symbol: "$",
            symbol_before: true,
            thousand: ",",
            decimal: "."
        },
        date: {
            format: "MM/dd/yyyy"
        },
        timeAgo: {
            day: "days",
            hour: "hours",
            minute: "mins",
            second: "seconds",
            txt: "ago"
        }
    };
    //Currency formatter
    var currency = lib.currency = function(number, symbol, thousand, decimal, symbol_before) {
        if (typeof symbol === "undefined") {
            symbol = lib.settings.currency.symbol;
        }
        if (typeof thousand === "undefined") {
            thousand = lib.settings.currency.thousand;
        }
        if (typeof decimal === "undefined") {
            decimal = lib.settings.currency.decimal;
        }
        if (typeof symbol_before === "undefined") {
            symbol_before = lib.settings.currency.symbol_before;
        }
        number = number.toFixed(2).replace(".", decimal);
        number = number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + thousand + "");
        return symbol_before ? symbol + number : number + symbol;
    };
    //Date formatter
    /*
		format examples:
			"yyyy-MM-dd HH:mm"
		    "MM/dd/yyyy hh:mm t"
		    "MM-yyyy hh:mmt"
	*/
    //Utilitary functions
    String.repeat = function(chr, count) {
        var str = "";
        for (var x = 0; x < count; x++) {
            str += chr;
        }
        return str;
    };
    String.prototype.padL = function(width, pad) {
        if (!width || width < 1) return this;
        if (!pad) pad = " ";
        var length = width - this.length;
        if (length < 1) return this.substr(0, width);
        return (String.repeat(pad, length) + this).substr(0, width);
    };
    String.prototype.padR = function(width, pad) {
        if (!width || width < 1) return this;
        if (!pad) pad = " ";
        var length = width - this.length;
        if (length < 1) this.substr(0, width);
        return (this + String.repeat(pad, length)).substr(0, width);
    };
    //Main function
    var date = lib.date = function(date, format) {
        var d = new Date(date);
        if (!format) format = lib.settings.date.format;
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        format = format.replace("MM", month.toString().padL(2, "0"));
        if (format.indexOf("yyyy") > -1) format = format.replace("yyyy", year.toString()); else if (format.indexOf("yy") > -1) format = format.replace("yy", year.toString().substr(2, 2));
        format = format.replace("dd", d.getDate().toString().padL(2, "0"));
        var hours = d.getHours();
        if (format.indexOf("t") > -1) {
            if (hours > 11) format = format.replace("t", "pm"); else format = format.replace("t", "am");
        }
        if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().padL(2, "0"));
        if (format.indexOf("hh") > -1) {
            if (hours > 12) hours - 12;
            if (hours == 0) hours = 12;
            format = format.replace("hh", hours.toString().padL(2, "0"));
        }
        if (format.indexOf("mm") > -1) format = format.replace("mm", d.getMinutes().toString().padL(2, "0"));
        if (format.indexOf("ss") > -1) format = format.replace("ss", d.getSeconds().toString().padL(2, "0"));
        return format;
    };
    //timeAgo formatter
    var timeAgo = lib.timeAgo = function(date, txt, day, hour, minute, second) {
        if (typeof txt === "undefined") {
            txt = lib.settings.timeAgo.txt;
        }
        if (typeof day === "undefined") {
            day = lib.settings.timeAgo.day;
        }
        if (typeof hour === "undefined") {
            hour = lib.settings.timeAgo.hour;
        }
        if (typeof minute === "undefined") {
            minute = lib.settings.timeAgo.minute;
        }
        if (typeof second === "undefined") {
            second = lib.settings.timeAgo.second;
        }
        var d = new Date(date);
        var s = Math.floor((new Date().getTime() - d.getTime()) / 1e3);
        var b;
        if (Math.floor(s / 86400) > 1) {
            b = Math.floor(s / 86400) + " " + day;
            var h = Math.floor(s % 86400 / 3600);
            if (h > 1) {
                b += ", " + h + " " + hour;
            }
        } else if (Math.floor(s / 3600) > 1) {
            b = Math.floor(s / 3600) + " " + hour;
        } else if (Math.floor(s / 60) > 1) {
            b = Math.floor(s / 60) + " " + minutes;
        } else {
            b = Math.floor(s) + " " + seconds;
        }
        return b + " " + txt;
    };
    /* --- Module export --- */
    if (typeof exports !== "undefined") {
        if (typeof module !== "undefined" && module.exports) {
            exports = module.exports = lib;
        }
        exports.slimFormatter = lib;
    } else if (typeof define === "function" && define.amd) {
        define([], function() {
            return lib;
        });
    } else {
        lib.noConflict = function(oldAccounting) {
            return function() {
                root.slimFormatter = oldAccounting;
                lib.noConflict = undefined;
                return lib;
            };
        }(root.slimFormatter);
        root["slimFormatter"] = lib;
    }
})(this);