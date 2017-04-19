/*eslint-disable block-scoped-var, no-redeclare, no-control-regex, no-prototype-builtins*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.hlcmsg = (function() {

    /**
     * Namespace hlcmsg.
     * @exports hlcmsg
     * @namespace
     */
    var hlcmsg = {};

    hlcmsg.HlcResp = (function() {

        /**
         * Properties of a HlcResp.
         * @typedef hlcmsg.HlcResp$Properties
         * @type {Object}
         * @property {hlcmsg.HlcResp.RespCode} [code] HlcResp code.
         * @property {string} [msg] HlcResp msg.
         * @property {Array.<hlcmsg.Pagenote$Properties>} [pagenoteList] HlcResp pagenoteList.
         * @property {hlcmsg.IdList$Properties} [idList] HlcResp idList.
         */

        /**
         * Constructs a new HlcResp.
         * @exports hlcmsg.HlcResp
         * @constructor
         * @param {hlcmsg.HlcResp$Properties=} [properties] Properties to set
         */
        function HlcResp(properties) {
            this.pagenoteList = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * HlcResp code.
         * @type {hlcmsg.HlcResp.RespCode}
         */
        HlcResp.prototype.code = 0;

        /**
         * HlcResp msg.
         * @type {string}
         */
        HlcResp.prototype.msg = "";

        /**
         * HlcResp pagenoteList.
         * @type {Array.<hlcmsg.Pagenote$Properties>}
         */
        HlcResp.prototype.pagenoteList = $util.emptyArray;

        /**
         * HlcResp idList.
         * @type {(hlcmsg.IdList$Properties|null)}
         */
        HlcResp.prototype.idList = null;

        /**
         * Creates a new HlcResp instance using the specified properties.
         * @param {hlcmsg.HlcResp$Properties=} [properties] Properties to set
         * @returns {hlcmsg.HlcResp} HlcResp instance
         */
        HlcResp.create = function create(properties) {
            return new HlcResp(properties);
        };

        /**
         * Encodes the specified HlcResp message. Does not implicitly {@link hlcmsg.HlcResp.verify|verify} messages.
         * @param {hlcmsg.HlcResp$Properties} message HlcResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HlcResp.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && message.hasOwnProperty("code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.code);
            if (message.msg != null && message.hasOwnProperty("msg"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.msg);
            if (message.pagenoteList != null && message.pagenoteList.length)
                for (var i = 0; i < message.pagenoteList.length; ++i)
                    $root.hlcmsg.Pagenote.encode(message.pagenoteList[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.idList != null && message.hasOwnProperty("idList"))
                $root.hlcmsg.IdList.encode(message.idList, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified HlcResp message, length delimited. Does not implicitly {@link hlcmsg.HlcResp.verify|verify} messages.
         * @param {hlcmsg.HlcResp$Properties} message HlcResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        HlcResp.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a HlcResp message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.HlcResp} HlcResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HlcResp.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hlcmsg.HlcResp();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.code = reader.uint32();
                    break;
                case 2:
                    message.msg = reader.string();
                    break;
                case 3:
                    if (!(message.pagenoteList && message.pagenoteList.length))
                        message.pagenoteList = [];
                    message.pagenoteList.push($root.hlcmsg.Pagenote.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.idList = $root.hlcmsg.IdList.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a HlcResp message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.HlcResp} HlcResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        HlcResp.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a HlcResp message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        HlcResp.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                switch (message.code) {
                default:
                    return "code: enum value expected";
                case 0:
                case 1:
                    break;
                }
            if (message.msg != null && message.hasOwnProperty("msg"))
                if (!$util.isString(message.msg))
                    return "msg: string expected";
            if (message.pagenoteList != null && message.hasOwnProperty("pagenoteList")) {
                if (!Array.isArray(message.pagenoteList))
                    return "pagenoteList: array expected";
                for (var i = 0; i < message.pagenoteList.length; ++i) {
                    var error = $root.hlcmsg.Pagenote.verify(message.pagenoteList[i]);
                    if (error)
                        return "pagenoteList." + error;
                }
            }
            if (message.idList != null && message.hasOwnProperty("idList")) {
                var error = $root.hlcmsg.IdList.verify(message.idList);
                if (error)
                    return "idList." + error;
            }
            return null;
        };

        /**
         * Creates a HlcResp message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.HlcResp} HlcResp
         */
        HlcResp.fromObject = function fromObject(object) {
            if (object instanceof $root.hlcmsg.HlcResp)
                return object;
            var message = new $root.hlcmsg.HlcResp();
            switch (object.code) {
            case "FAIL":
            case 0:
                message.code = 0;
                break;
            case "SUC":
            case 1:
                message.code = 1;
                break;
            }
            if (object.msg != null)
                message.msg = String(object.msg);
            if (object.pagenoteList) {
                if (!Array.isArray(object.pagenoteList))
                    throw TypeError(".hlcmsg.HlcResp.pagenoteList: array expected");
                message.pagenoteList = [];
                for (var i = 0; i < object.pagenoteList.length; ++i) {
                    if (typeof object.pagenoteList[i] !== "object")
                        throw TypeError(".hlcmsg.HlcResp.pagenoteList: object expected");
                    message.pagenoteList[i] = $root.hlcmsg.Pagenote.fromObject(object.pagenoteList[i]);
                }
            }
            if (object.idList != null) {
                if (typeof object.idList !== "object")
                    throw TypeError(".hlcmsg.HlcResp.idList: object expected");
                message.idList = $root.hlcmsg.IdList.fromObject(object.idList);
            }
            return message;
        };

        /**
         * Creates a HlcResp message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.HlcResp.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.HlcResp} HlcResp
         */
        HlcResp.from = HlcResp.fromObject;

        /**
         * Creates a plain object from a HlcResp message. Also converts values to other types if specified.
         * @param {hlcmsg.HlcResp} message HlcResp
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HlcResp.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.pagenoteList = [];
            if (options.defaults) {
                object.code = options.enums === String ? "FAIL" : 0;
                object.msg = "";
                object.idList = null;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = options.enums === String ? $root.hlcmsg.HlcResp.RespCode[message.code] : message.code;
            if (message.msg != null && message.hasOwnProperty("msg"))
                object.msg = message.msg;
            if (message.pagenoteList && message.pagenoteList.length) {
                object.pagenoteList = [];
                for (var j = 0; j < message.pagenoteList.length; ++j)
                    object.pagenoteList[j] = $root.hlcmsg.Pagenote.toObject(message.pagenoteList[j], options);
            }
            if (message.idList != null && message.hasOwnProperty("idList"))
                object.idList = $root.hlcmsg.IdList.toObject(message.idList, options);
            return object;
        };

        /**
         * Creates a plain object from this HlcResp message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        HlcResp.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this HlcResp to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        HlcResp.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * RespCode enum.
         * @name RespCode
         * @memberof hlcmsg.HlcResp
         * @enum {number}
         * @property {number} FAIL=0 FAIL value
         * @property {number} SUC=1 SUC value
         */
        HlcResp.RespCode = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "FAIL"] = 0;
            values[valuesById[1] = "SUC"] = 1;
            return values;
        })();

        return HlcResp;
    })();

    hlcmsg.Pagenote = (function() {

        /**
         * Properties of a Pagenote.
         * @typedef hlcmsg.Pagenote$Properties
         * @type {Object}
         * @property {number} [pageid] Pagenote pageid.
         * @property {number} [uid] Pagenote uid.
         * @property {Array.<hlcmsg.RangeMeta$Properties>} [highlights] Pagenote highlights.
         * @property {string} [url] Pagenote url.
         */

        /**
         * Constructs a new Pagenote.
         * @exports hlcmsg.Pagenote
         * @constructor
         * @param {hlcmsg.Pagenote$Properties=} [properties] Properties to set
         */
        function Pagenote(properties) {
            this.highlights = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Pagenote pageid.
         * @type {number}
         */
        Pagenote.prototype.pageid = 0;

        /**
         * Pagenote uid.
         * @type {number}
         */
        Pagenote.prototype.uid = 0;

        /**
         * Pagenote highlights.
         * @type {Array.<hlcmsg.RangeMeta$Properties>}
         */
        Pagenote.prototype.highlights = $util.emptyArray;

        /**
         * Pagenote url.
         * @type {string}
         */
        Pagenote.prototype.url = "";

        /**
         * Creates a new Pagenote instance using the specified properties.
         * @param {hlcmsg.Pagenote$Properties=} [properties] Properties to set
         * @returns {hlcmsg.Pagenote} Pagenote instance
         */
        Pagenote.create = function create(properties) {
            return new Pagenote(properties);
        };

        /**
         * Encodes the specified Pagenote message. Does not implicitly {@link hlcmsg.Pagenote.verify|verify} messages.
         * @param {hlcmsg.Pagenote$Properties} message Pagenote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pagenote.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.pageid != null && message.hasOwnProperty("pageid"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.pageid);
            if (message.uid != null && message.hasOwnProperty("uid"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.uid);
            if (message.highlights != null && message.highlights.length)
                for (var i = 0; i < message.highlights.length; ++i)
                    $root.hlcmsg.RangeMeta.encode(message.highlights[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.url != null && message.hasOwnProperty("url"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.url);
            return writer;
        };

        /**
         * Encodes the specified Pagenote message, length delimited. Does not implicitly {@link hlcmsg.Pagenote.verify|verify} messages.
         * @param {hlcmsg.Pagenote$Properties} message Pagenote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Pagenote.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Pagenote message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.Pagenote} Pagenote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pagenote.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hlcmsg.Pagenote();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.pageid = reader.uint32();
                    break;
                case 2:
                    message.uid = reader.uint32();
                    break;
                case 3:
                    if (!(message.highlights && message.highlights.length))
                        message.highlights = [];
                    message.highlights.push($root.hlcmsg.RangeMeta.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.url = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Pagenote message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.Pagenote} Pagenote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Pagenote.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Pagenote message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        Pagenote.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.pageid != null && message.hasOwnProperty("pageid"))
                if (!$util.isInteger(message.pageid))
                    return "pageid: integer expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.highlights != null && message.hasOwnProperty("highlights")) {
                if (!Array.isArray(message.highlights))
                    return "highlights: array expected";
                for (var i = 0; i < message.highlights.length; ++i) {
                    var error = $root.hlcmsg.RangeMeta.verify(message.highlights[i]);
                    if (error)
                        return "highlights." + error;
                }
            }
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            return null;
        };

        /**
         * Creates a Pagenote message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.Pagenote} Pagenote
         */
        Pagenote.fromObject = function fromObject(object) {
            if (object instanceof $root.hlcmsg.Pagenote)
                return object;
            var message = new $root.hlcmsg.Pagenote();
            if (object.pageid != null)
                message.pageid = object.pageid >>> 0;
            if (object.uid != null)
                message.uid = object.uid >>> 0;
            if (object.highlights) {
                if (!Array.isArray(object.highlights))
                    throw TypeError(".hlcmsg.Pagenote.highlights: array expected");
                message.highlights = [];
                for (var i = 0; i < object.highlights.length; ++i) {
                    if (typeof object.highlights[i] !== "object")
                        throw TypeError(".hlcmsg.Pagenote.highlights: object expected");
                    message.highlights[i] = $root.hlcmsg.RangeMeta.fromObject(object.highlights[i]);
                }
            }
            if (object.url != null)
                message.url = String(object.url);
            return message;
        };

        /**
         * Creates a Pagenote message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.Pagenote.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.Pagenote} Pagenote
         */
        Pagenote.from = Pagenote.fromObject;

        /**
         * Creates a plain object from a Pagenote message. Also converts values to other types if specified.
         * @param {hlcmsg.Pagenote} message Pagenote
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pagenote.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.highlights = [];
            if (options.defaults) {
                object.pageid = 0;
                object.uid = 0;
                object.url = "";
            }
            if (message.pageid != null && message.hasOwnProperty("pageid"))
                object.pageid = message.pageid;
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.highlights && message.highlights.length) {
                object.highlights = [];
                for (var j = 0; j < message.highlights.length; ++j)
                    object.highlights[j] = $root.hlcmsg.RangeMeta.toObject(message.highlights[j], options);
            }
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            return object;
        };

        /**
         * Creates a plain object from this Pagenote message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Pagenote.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this Pagenote to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        Pagenote.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Pagenote;
    })();

    hlcmsg.RangeMeta = (function() {

        /**
         * Properties of a RangeMeta.
         * @typedef hlcmsg.RangeMeta$Properties
         * @type {Object}
         * @property {number} [id] RangeMeta id.
         * @property {string} [anchor] RangeMeta anchor.
         * @property {string} [start] RangeMeta start.
         * @property {number} [startOffset] RangeMeta startOffset.
         * @property {string} [end] RangeMeta end.
         * @property {number} [endOffset] RangeMeta endOffset.
         * @property {string} [text] RangeMeta text.
         * @property {string} [option] RangeMeta option.
         */

        /**
         * Constructs a new RangeMeta.
         * @exports hlcmsg.RangeMeta
         * @constructor
         * @param {hlcmsg.RangeMeta$Properties=} [properties] Properties to set
         */
        function RangeMeta(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RangeMeta id.
         * @type {number}
         */
        RangeMeta.prototype.id = 0;

        /**
         * RangeMeta anchor.
         * @type {string}
         */
        RangeMeta.prototype.anchor = "";

        /**
         * RangeMeta start.
         * @type {string}
         */
        RangeMeta.prototype.start = "";

        /**
         * RangeMeta startOffset.
         * @type {number}
         */
        RangeMeta.prototype.startOffset = 0;

        /**
         * RangeMeta end.
         * @type {string}
         */
        RangeMeta.prototype.end = "";

        /**
         * RangeMeta endOffset.
         * @type {number}
         */
        RangeMeta.prototype.endOffset = 0;

        /**
         * RangeMeta text.
         * @type {string}
         */
        RangeMeta.prototype.text = "";

        /**
         * RangeMeta option.
         * @type {string}
         */
        RangeMeta.prototype.option = "";

        /**
         * Creates a new RangeMeta instance using the specified properties.
         * @param {hlcmsg.RangeMeta$Properties=} [properties] Properties to set
         * @returns {hlcmsg.RangeMeta} RangeMeta instance
         */
        RangeMeta.create = function create(properties) {
            return new RangeMeta(properties);
        };

        /**
         * Encodes the specified RangeMeta message. Does not implicitly {@link hlcmsg.RangeMeta.verify|verify} messages.
         * @param {hlcmsg.RangeMeta$Properties} message RangeMeta message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RangeMeta.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && message.hasOwnProperty("id"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.id);
            if (message.anchor != null && message.hasOwnProperty("anchor"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.anchor);
            if (message.start != null && message.hasOwnProperty("start"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.start);
            if (message.startOffset != null && message.hasOwnProperty("startOffset"))
                writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.startOffset);
            if (message.end != null && message.hasOwnProperty("end"))
                writer.uint32(/* id 5, wireType 2 =*/42).string(message.end);
            if (message.endOffset != null && message.hasOwnProperty("endOffset"))
                writer.uint32(/* id 6, wireType 0 =*/48).uint32(message.endOffset);
            if (message.text != null && message.hasOwnProperty("text"))
                writer.uint32(/* id 7, wireType 2 =*/58).string(message.text);
            if (message.option != null && message.hasOwnProperty("option"))
                writer.uint32(/* id 8, wireType 2 =*/66).string(message.option);
            return writer;
        };

        /**
         * Encodes the specified RangeMeta message, length delimited. Does not implicitly {@link hlcmsg.RangeMeta.verify|verify} messages.
         * @param {hlcmsg.RangeMeta$Properties} message RangeMeta message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RangeMeta.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RangeMeta message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.RangeMeta} RangeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RangeMeta.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hlcmsg.RangeMeta();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint32();
                    break;
                case 2:
                    message.anchor = reader.string();
                    break;
                case 3:
                    message.start = reader.string();
                    break;
                case 4:
                    message.startOffset = reader.uint32();
                    break;
                case 5:
                    message.end = reader.string();
                    break;
                case 6:
                    message.endOffset = reader.uint32();
                    break;
                case 7:
                    message.text = reader.string();
                    break;
                case 8:
                    message.option = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RangeMeta message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.RangeMeta} RangeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RangeMeta.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RangeMeta message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        RangeMeta.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isInteger(message.id))
                    return "id: integer expected";
            if (message.anchor != null && message.hasOwnProperty("anchor"))
                if (!$util.isString(message.anchor))
                    return "anchor: string expected";
            if (message.start != null && message.hasOwnProperty("start"))
                if (!$util.isString(message.start))
                    return "start: string expected";
            if (message.startOffset != null && message.hasOwnProperty("startOffset"))
                if (!$util.isInteger(message.startOffset))
                    return "startOffset: integer expected";
            if (message.end != null && message.hasOwnProperty("end"))
                if (!$util.isString(message.end))
                    return "end: string expected";
            if (message.endOffset != null && message.hasOwnProperty("endOffset"))
                if (!$util.isInteger(message.endOffset))
                    return "endOffset: integer expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            if (message.option != null && message.hasOwnProperty("option"))
                if (!$util.isString(message.option))
                    return "option: string expected";
            return null;
        };

        /**
         * Creates a RangeMeta message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.RangeMeta} RangeMeta
         */
        RangeMeta.fromObject = function fromObject(object) {
            if (object instanceof $root.hlcmsg.RangeMeta)
                return object;
            var message = new $root.hlcmsg.RangeMeta();
            if (object.id != null)
                message.id = object.id >>> 0;
            if (object.anchor != null)
                message.anchor = String(object.anchor);
            if (object.start != null)
                message.start = String(object.start);
            if (object.startOffset != null)
                message.startOffset = object.startOffset >>> 0;
            if (object.end != null)
                message.end = String(object.end);
            if (object.endOffset != null)
                message.endOffset = object.endOffset >>> 0;
            if (object.text != null)
                message.text = String(object.text);
            if (object.option != null)
                message.option = String(object.option);
            return message;
        };

        /**
         * Creates a RangeMeta message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.RangeMeta.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.RangeMeta} RangeMeta
         */
        RangeMeta.from = RangeMeta.fromObject;

        /**
         * Creates a plain object from a RangeMeta message. Also converts values to other types if specified.
         * @param {hlcmsg.RangeMeta} message RangeMeta
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RangeMeta.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = 0;
                object.anchor = "";
                object.start = "";
                object.startOffset = 0;
                object.end = "";
                object.endOffset = 0;
                object.text = "";
                object.option = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.anchor != null && message.hasOwnProperty("anchor"))
                object.anchor = message.anchor;
            if (message.start != null && message.hasOwnProperty("start"))
                object.start = message.start;
            if (message.startOffset != null && message.hasOwnProperty("startOffset"))
                object.startOffset = message.startOffset;
            if (message.end != null && message.hasOwnProperty("end"))
                object.end = message.end;
            if (message.endOffset != null && message.hasOwnProperty("endOffset"))
                object.endOffset = message.endOffset;
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            if (message.option != null && message.hasOwnProperty("option"))
                object.option = message.option;
            return object;
        };

        /**
         * Creates a plain object from this RangeMeta message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RangeMeta.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this RangeMeta to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        RangeMeta.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return RangeMeta;
    })();

    hlcmsg.IdList = (function() {

        /**
         * Properties of an IdList.
         * @typedef hlcmsg.IdList$Properties
         * @type {Object}
         * @property {Array.<number>} [arr] IdList arr.
         */

        /**
         * Constructs a new IdList.
         * @exports hlcmsg.IdList
         * @constructor
         * @param {hlcmsg.IdList$Properties=} [properties] Properties to set
         */
        function IdList(properties) {
            this.arr = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * IdList arr.
         * @type {Array.<number>}
         */
        IdList.prototype.arr = $util.emptyArray;

        /**
         * Creates a new IdList instance using the specified properties.
         * @param {hlcmsg.IdList$Properties=} [properties] Properties to set
         * @returns {hlcmsg.IdList} IdList instance
         */
        IdList.create = function create(properties) {
            return new IdList(properties);
        };

        /**
         * Encodes the specified IdList message. Does not implicitly {@link hlcmsg.IdList.verify|verify} messages.
         * @param {hlcmsg.IdList$Properties} message IdList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.arr != null && message.arr.length) {
                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                for (var i = 0; i < message.arr.length; ++i)
                    writer.uint32(message.arr[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified IdList message, length delimited. Does not implicitly {@link hlcmsg.IdList.verify|verify} messages.
         * @param {hlcmsg.IdList$Properties} message IdList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        IdList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an IdList message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.IdList} IdList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.hlcmsg.IdList();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1:
                    if (!(message.arr && message.arr.length))
                        message.arr = [];
                    if ((tag & 7) === 2) {
                        var end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2)
                            message.arr.push(reader.uint32());
                    } else
                        message.arr.push(reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes an IdList message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.IdList} IdList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        IdList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an IdList message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        IdList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.arr != null && message.hasOwnProperty("arr")) {
                if (!Array.isArray(message.arr))
                    return "arr: array expected";
                for (var i = 0; i < message.arr.length; ++i)
                    if (!$util.isInteger(message.arr[i]))
                        return "arr: integer[] expected";
            }
            return null;
        };

        /**
         * Creates an IdList message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.IdList} IdList
         */
        IdList.fromObject = function fromObject(object) {
            if (object instanceof $root.hlcmsg.IdList)
                return object;
            var message = new $root.hlcmsg.IdList();
            if (object.arr) {
                if (!Array.isArray(object.arr))
                    throw TypeError(".hlcmsg.IdList.arr: array expected");
                message.arr = [];
                for (var i = 0; i < object.arr.length; ++i)
                    message.arr[i] = object.arr[i] >>> 0;
            }
            return message;
        };

        /**
         * Creates an IdList message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.IdList.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.IdList} IdList
         */
        IdList.from = IdList.fromObject;

        /**
         * Creates a plain object from an IdList message. Also converts values to other types if specified.
         * @param {hlcmsg.IdList} message IdList
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        IdList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.arr = [];
            if (message.arr && message.arr.length) {
                object.arr = [];
                for (var j = 0; j < message.arr.length; ++j)
                    object.arr[j] = message.arr[j];
            }
            return object;
        };

        /**
         * Creates a plain object from this IdList message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        IdList.prototype.toObject = function toObject(options) {
            return this.constructor.toObject(this, options);
        };

        /**
         * Converts this IdList to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        IdList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return IdList;
    })();

    return hlcmsg;
})();

module.exports = $root;
