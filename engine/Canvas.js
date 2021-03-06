define("engine/Canvas", function () {

    /**
     * Create a canvas instance to run the game in.
     * @constructor
     * @param   {HTML Element} containerElement - Element to load the canvas into.
     * @returns {Canvas Instance}
     */
    var Canvas = function (containerElement) {
        this._containerElement = containerElement;
        this._canvas = document.createElement("canvas");

        this.width = this._containerElement.clientWidth;
        this.height = this._containerElement.clientHeight;

        this._assets = [];

        this._init();
    };

    Canvas.prototype = {
        /**
         * Initialising canvas.
         * @method
         */
        _init: function () {
            this._canvas.setAttribute("width", this.width);
            this._canvas.setAttribute("height", this.height);

            this._styles = document.createElement("style");
            this._styles.innerText = "@font-face {" +
                "font-family: 'theFont';" +
                "src: url('./fonts/font.ttf');" +
            " }";

            this._containerElement.appendChild(this._styles);
            this._containerElement.appendChild(this._canvas);
        },

        /**
         * Return 2D or 3D canvas context.
         * @method
         * @param   {String} dimentions - Canvas context you want back (2D or 3D).
         * @returns {Canvas Context}
         */
        getContext: function (dimentions) {
            var context;

            switch (dimentions) {
            case "3D":
            case "3d":
            case 3:
                context = this._canvas.getContext("3d");
                break;
            default:
                context = this._canvas.getContext("2d");
            }
            return context;
        },

        /**
         * Get the Canvas.
         * @method
         * @returns {Canvas}
         */
        getCanvas: function () {
            return this._canvas;
        },

        /**
         * Register assets to be preloaded.
         * @method
         * @param   {String/Array} assets - Assets to be preloaded.
         */
        registerAssets: function (assets) {
            if (typeof assets === "string") {
                assets = [assets];
            }
            this._assets = [].concat(this._assets, assets);
        },

        /**
         * Begin preloading registered assets. Callback is run each time an asset is loaded.
         * @method
         * @param   {Function} callback - Callback is run on each completed asset.
         */
        preloadAssets: function (callback) {
            callback = callback || function () {};
            var loadedCount = 0,
                remainingCount = (this._assets.length - 1),
                i = remainingCount,
                img = [],
                onload, onerror;

            onload = function () {
                callback({
                    loaded: ++loadedCount,
                    remaining: --remainingCount
                });
                window.console.info("Loaded: " + loadedCount + ", Remaining: " + remainingCount);
            };
            onerror = function () {
                callback({
                    loaded: ++loadedCount,
                    remaining: --remainingCount
                });
                window.console.error("Loaded: " + loadedCount + ", Remaining: " + remainingCount);
            };

            for (; 0 < i; i--) {
                img[i] = new Image();
                img[i].src = this._assets[i];
                img[i].onload = onload;
                img[i].onerror = onerror;
                this._assets.splice(i, 1);
            }
        },

        /**
         * Render text.
         * @method
         * @param   {String} message            - Text to be rendered
         * @param   {Number} [startPosX]        - X coordinate to render
         * @param   {Number} [startPosY]        - Y coordinate to render
         * @param   {Object} [newOptions]
         * @enum    {String} [newOptions.align] - Text alignment
         * @enum    {Number} [newOptions.size]  - Text size
         * @enum    {String} [newOptions.color] - Text color
         * @enum    {String} [newOptions.font]  - Font type
         * @enum    {String} [newOptions.stroke]  - Stroke color. If not set, it won't show.
         */
        renderText: function (message, startPosX, startPosY, newOptions) {
            startPosX   = startPosX || 0;
            startPosY   = startPosY || 0;
            var options = {
                    size: newOptions.size || 12,
                    align: newOptions.align || "left",
                    valign: newOptions.valign || "top",
                    color: newOptions.color || "#fff",
                    font: newOptions.font || "theFont",
                    stoke: newOptions.stroke || false
                },
                context = this.getContext();

            context.fillStyle = options.color;
            context.font = options.size + "px " + options.font;
            context.textAlign = options.align;
            context.textBaseline = options.valign;
            context.fillText(message, startPosX, startPosY);

            if (options.stoke) {
                context.strokeStyle = options.stroke;
                context.strokeText(message, startPosX, startPosY);
            }
        },

        /**
         * Render sprite
         * @method
         * @param   {Image Sprite} sprite   - Image sprite to be rendered
         * @param   {Object} spriteData     - Object containing coordinates and sprite positions.
         */
        renderSprite: function (sprite, spriteData) {
            var context = this.getContext();

            context.drawImage(
                sprite,
                (spriteData.frameX * spriteData.frameWidth), (spriteData.frameY * spriteData.frameHeight),
                spriteData.frameWidth, spriteData.frameHeight,
                spriteData.posX, spriteData.posY,
                spriteData.frameWidth, spriteData.frameHeight
            );
        }
    };

    return Canvas;

});
