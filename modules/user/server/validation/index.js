module.exports = {
    isDefined: function (val) {
        if (typeof val !== 'undefined' && typeof val !== "" &&  val !== null ) {
            return true;
        }

        return false;
    },
    hasLength: function (val, len) {
        if (val.length >= len) {
            return true;
        }

        return false;
    },
    isValidString: function (val, len) {
        let lenght = len || 1;

        if (typeof val === 'string' && this.hasLength(val, lenght)) {
            return true;
        }
        return false;
    },
    isValidEmail: function (val) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);

    }
};