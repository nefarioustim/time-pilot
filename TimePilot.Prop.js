define("TimePilot.Prop", [
    "TimePilot.CONSTANTS",
    "engine/helpers"
], function (
    CONSTS,
    helpers
) {

    var Prop = function (canvas, player, posX, posY) {
        this._canvas = canvas;
        this._player = player;

        this._data = {};
        this._data.posX = posX;
        this._data.posY = posY;
        this._data.level = 1;
        this._data.type = Math.floor(Math.random() * (CONSTS.levels[this._data.level].props.length));
        this._data.layer = CONSTS.levels[this._data.level].props[this._data.type].layer;
        this._data.removeMe = false;

        this._propSprite = new Image();
        this._propSprite.src = this.getLevelData().src;
    };

    Prop.prototype = {

        /**
         * Get data for the prop.
         * @method
         * @returns {Object}
         */
        getData: function () {
            return this._data;
        },

        /**
         * Get current data for this level
         * @method
         * @returns {object}
         */
        getLevelData: function () {
            return CONSTS.levels[this._data.level].props[this._data.type];
        },

        /**
         * Detect if the entity has left a given radius of the player.
         * @method
         * @protected
         * @param   {Number} radius - Maximum radial from player before they are concidered outside the battle.
         * @returns {Boolean} True = entity has left the area, False = entity is still in area.
         */
        _checkInArena: function () {
            var levelData = this.getLevelData(),
                player = this._player.getData(),
                removeProp = false;

            if (this._data.removeMe) {
                return;
            }

            removeProp = helpers.detectAreaExit({
                    posX: player.posX + ((this._canvas.width / 2) - (levelData.width / 2)),
                    posY: player.posY + ((this._canvas.height / 2) - (levelData.height / 2))
                }, {
                    posX: this._data.posX,
                    posY: this._data.posY
                },
                CONSTS.limits.despawnRadius
            );

            this._data.removeMe = removeProp;
        },

        /**
         * Recalculate prop's current position and heading.
         * @method
         */
        reposition: function () {
            var levelData = this.getLevelData(),
                player = this._player.getData(),
                playerVelocity = CONSTS.levels[this._data.level].player.velocity,
                heading = (levelData.reversed ? (player.heading + 180) % 360 : player.heading),
                velocity = (playerVelocity * levelData.relativeVelocity),
                canvas = this._canvas,
                turnTo;

            this._data.posX += helpers.float(Math.sin(heading * (Math.PI / 180)) * velocity);
            this._data.posY -= helpers.float(Math.cos(heading * (Math.PI / 180)) * velocity);

            this._checkInArena();
        },

        /**
         * Render the prop.
         * @method
         */
        render: function () {
            var levelData = this.getLevelData();
            this._canvas.renderSprite(this._propSprite, {
                frameWidth: levelData.width,
                frameHeight: levelData.height,
                frameX: 0,
                frameY: 0,
                posX: (this._data.posX - this._player.getData().posX - (levelData.width / 2)),
                posY: (this._data.posY - this._player.getData().posY - (levelData.height / 2))
            });
        }

    };

    return Prop;
});
