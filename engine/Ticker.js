define("engine/Ticker", function () {
    /**
     * Creates an instance of a ticker object.
     * @method
     * @param {Number} [interval=17] - Interval between ticks. Defaults to 60fps (17ms interval).
     */
    var Ticker = function (interval) {
        this._interval = interval || 17;
        this._ticks = 0;
        this._isRunning = false;
        this._schedule = {};
        this._scheduleCount = 0;
    };

    Ticker.prototype = {
        /**
         * Start ticker.
         * @method
         * @returns {Boolean}
         */
        start: function () {
            var that = this;
            this._theTicker = window.setInterval(function () {
                that._ticks++;
                for (var eventId in that._schedule) {
                    if (that._schedule.hasOwnProperty(eventId) && that._ticks % that._schedule[eventId].nthTick === 0) {
                        that._schedule[eventId].callback(that._ticks);
                    }
                }
            }, this._interval);
            this._isRunning = true;
            return !!this._theTicker;
        },

        /**
         * Stop ticker.
         * @method
         * @returns {Boolean}
         */
        stop: function () {
            window.clearInterval(this._theTicker);
            this._isRunning = false;
            return !this._theTicker;
        },

        /**
         * Add event callback to schedule. This runs a callback on each Nth tick.
         * @method
         * @param   {Function} callback  - Method to run on Nth ticks.
         * @param   {Number}   [nthTick=interval] - Run this callback ever Nth tick.
         * @returns {Number}   ID number for callback. Used in "removeSchedule".
         */
        addSchedule: function (callback, nthTick) {
            nthTick = nthTick || this._interval;

            var eventId = ++this._scheduleCount;
            this._schedule[eventId] = {
                "callback": callback,
                "nthTick": nthTick
            };

            return eventId;
        },

        /**
         * Remove scheduled event, based on ID returned from "addSchedule" method.
         * @method
         * @param   {Number} eventId - ID to remove, passed back from "addSchedule".
         * @returns {Boolean} Boolean of if the removal sucessful. If the ID did not exist, this is still successful.
         */
        removeSchedule: function (eventId) {
            if (this._schedule[eventId]) {
                delete this._schedule[eventId];
            }
            return !this._schedule[eventId];
        },

        /**
         * Empty Schedule of all events.
         * @method
         */
        clearSchedule: function () {
            this._schedule = {};
        },

        /**
         * Reset ticks back to 0.
         * @method
         * @returns {Boolean}
         */
        clearTicks: function () {
            this._ticks = 0;

            return !this._ticks;
        },

        /**
         * Currently running state. 1 = running, 0 = stopped.
         * @method
         * @returns {Boolean}
         */
        getState: function () {
            return this._isRunning;
        },

        /**
         * Get the current number of ticks that have occured since start.
         * @method
         * @returns {Number}
         */
        getTicks: function () {
            return this._ticks;
        }
    };

    return Ticker;
});
