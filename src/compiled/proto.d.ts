import * as $protobuf from "protobufjs";

/**
 * Namespace hlcmsg.
 * @exports hlcmsg
 * @namespace
 */
export namespace hlcmsg {

    type HlcResp$Properties = {
        code?: hlcmsg.HlcResp.RespCode;
        msg?: string;
        pagenoteList?: hlcmsg.Pagenote$Properties[];
        idList?: hlcmsg.IdList$Properties;
    };

    /**
     * Constructs a new HlcResp.
     * @exports hlcmsg.HlcResp
     * @constructor
     * @param {hlcmsg.HlcResp$Properties=} [properties] Properties to set
     */
    class HlcResp {

        /**
         * Constructs a new HlcResp.
         * @exports hlcmsg.HlcResp
         * @constructor
         * @param {hlcmsg.HlcResp$Properties=} [properties] Properties to set
         */
        constructor(properties?: hlcmsg.HlcResp$Properties);

        /**
         * HlcResp code.
         * @type {hlcmsg.HlcResp.RespCode}
         */
        public code: hlcmsg.HlcResp.RespCode;

        /**
         * HlcResp msg.
         * @type {string}
         */
        public msg: string;

        /**
         * HlcResp pagenoteList.
         * @type {Array.<hlcmsg.Pagenote$Properties>}
         */
        public pagenoteList: hlcmsg.Pagenote$Properties[];

        /**
         * HlcResp idList.
         * @type {(hlcmsg.IdList$Properties|null)}
         */
        public idList: (hlcmsg.IdList$Properties|null);

        /**
         * Creates a new HlcResp instance using the specified properties.
         * @param {hlcmsg.HlcResp$Properties=} [properties] Properties to set
         * @returns {hlcmsg.HlcResp} HlcResp instance
         */
        public static create(properties?: hlcmsg.HlcResp$Properties): hlcmsg.HlcResp;

        /**
         * Encodes the specified HlcResp message. Does not implicitly {@link hlcmsg.HlcResp.verify|verify} messages.
         * @param {hlcmsg.HlcResp$Properties} message HlcResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: hlcmsg.HlcResp$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HlcResp message, length delimited. Does not implicitly {@link hlcmsg.HlcResp.verify|verify} messages.
         * @param {hlcmsg.HlcResp$Properties} message HlcResp message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: hlcmsg.HlcResp$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HlcResp message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.HlcResp} HlcResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.HlcResp;

        /**
         * Decodes a HlcResp message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.HlcResp} HlcResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.HlcResp;

        /**
         * Verifies a HlcResp message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a HlcResp message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.HlcResp} HlcResp
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.HlcResp;

        /**
         * Creates a HlcResp message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.HlcResp.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.HlcResp} HlcResp
         */
        public static from(object: { [k: string]: any }): hlcmsg.HlcResp;

        /**
         * Creates a plain object from a HlcResp message. Also converts values to other types if specified.
         * @param {hlcmsg.HlcResp} message HlcResp
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: hlcmsg.HlcResp, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this HlcResp message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this HlcResp to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace HlcResp {

        /**
         * RespCode enum.
         * @name RespCode
         * @memberof hlcmsg.HlcResp
         * @enum {number}
         * @property {number} FAIL=0 FAIL value
         * @property {number} SUC=1 SUC value
         */
        enum RespCode {
            FAIL = 0,
            SUC = 1
        }
    }

    type Pagenote$Properties = {
        pageid?: number;
        uid?: number;
        highlights?: hlcmsg.RangeMeta$Properties[];
        url?: string;
    };

    /**
     * Constructs a new Pagenote.
     * @exports hlcmsg.Pagenote
     * @constructor
     * @param {hlcmsg.Pagenote$Properties=} [properties] Properties to set
     */
    class Pagenote {

        /**
         * Constructs a new Pagenote.
         * @exports hlcmsg.Pagenote
         * @constructor
         * @param {hlcmsg.Pagenote$Properties=} [properties] Properties to set
         */
        constructor(properties?: hlcmsg.Pagenote$Properties);

        /**
         * Pagenote pageid.
         * @type {number}
         */
        public pageid: number;

        /**
         * Pagenote uid.
         * @type {number}
         */
        public uid: number;

        /**
         * Pagenote highlights.
         * @type {Array.<hlcmsg.RangeMeta$Properties>}
         */
        public highlights: hlcmsg.RangeMeta$Properties[];

        /**
         * Pagenote url.
         * @type {string}
         */
        public url: string;

        /**
         * Creates a new Pagenote instance using the specified properties.
         * @param {hlcmsg.Pagenote$Properties=} [properties] Properties to set
         * @returns {hlcmsg.Pagenote} Pagenote instance
         */
        public static create(properties?: hlcmsg.Pagenote$Properties): hlcmsg.Pagenote;

        /**
         * Encodes the specified Pagenote message. Does not implicitly {@link hlcmsg.Pagenote.verify|verify} messages.
         * @param {hlcmsg.Pagenote$Properties} message Pagenote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: hlcmsg.Pagenote$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pagenote message, length delimited. Does not implicitly {@link hlcmsg.Pagenote.verify|verify} messages.
         * @param {hlcmsg.Pagenote$Properties} message Pagenote message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: hlcmsg.Pagenote$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pagenote message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.Pagenote} Pagenote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.Pagenote;

        /**
         * Decodes a Pagenote message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.Pagenote} Pagenote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.Pagenote;

        /**
         * Verifies a Pagenote message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a Pagenote message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.Pagenote} Pagenote
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.Pagenote;

        /**
         * Creates a Pagenote message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.Pagenote.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.Pagenote} Pagenote
         */
        public static from(object: { [k: string]: any }): hlcmsg.Pagenote;

        /**
         * Creates a plain object from a Pagenote message. Also converts values to other types if specified.
         * @param {hlcmsg.Pagenote} message Pagenote
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: hlcmsg.Pagenote, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this Pagenote message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this Pagenote to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type RangeMeta$Properties = {
        id?: number;
        anchor?: string;
        start?: string;
        startOffset?: number;
        end?: string;
        endOffset?: number;
        text?: string;
        option?: string;
    };

    /**
     * Constructs a new RangeMeta.
     * @exports hlcmsg.RangeMeta
     * @constructor
     * @param {hlcmsg.RangeMeta$Properties=} [properties] Properties to set
     */
    class RangeMeta {

        /**
         * Constructs a new RangeMeta.
         * @exports hlcmsg.RangeMeta
         * @constructor
         * @param {hlcmsg.RangeMeta$Properties=} [properties] Properties to set
         */
        constructor(properties?: hlcmsg.RangeMeta$Properties);

        /**
         * RangeMeta id.
         * @type {number}
         */
        public id: number;

        /**
         * RangeMeta anchor.
         * @type {string}
         */
        public anchor: string;

        /**
         * RangeMeta start.
         * @type {string}
         */
        public start: string;

        /**
         * RangeMeta startOffset.
         * @type {number}
         */
        public startOffset: number;

        /**
         * RangeMeta end.
         * @type {string}
         */
        public end: string;

        /**
         * RangeMeta endOffset.
         * @type {number}
         */
        public endOffset: number;

        /**
         * RangeMeta text.
         * @type {string}
         */
        public text: string;

        /**
         * RangeMeta option.
         * @type {string}
         */
        public option: string;

        /**
         * Creates a new RangeMeta instance using the specified properties.
         * @param {hlcmsg.RangeMeta$Properties=} [properties] Properties to set
         * @returns {hlcmsg.RangeMeta} RangeMeta instance
         */
        public static create(properties?: hlcmsg.RangeMeta$Properties): hlcmsg.RangeMeta;

        /**
         * Encodes the specified RangeMeta message. Does not implicitly {@link hlcmsg.RangeMeta.verify|verify} messages.
         * @param {hlcmsg.RangeMeta$Properties} message RangeMeta message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: hlcmsg.RangeMeta$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RangeMeta message, length delimited. Does not implicitly {@link hlcmsg.RangeMeta.verify|verify} messages.
         * @param {hlcmsg.RangeMeta$Properties} message RangeMeta message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: hlcmsg.RangeMeta$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RangeMeta message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.RangeMeta} RangeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.RangeMeta;

        /**
         * Decodes a RangeMeta message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.RangeMeta} RangeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.RangeMeta;

        /**
         * Verifies a RangeMeta message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates a RangeMeta message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.RangeMeta} RangeMeta
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.RangeMeta;

        /**
         * Creates a RangeMeta message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.RangeMeta.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.RangeMeta} RangeMeta
         */
        public static from(object: { [k: string]: any }): hlcmsg.RangeMeta;

        /**
         * Creates a plain object from a RangeMeta message. Also converts values to other types if specified.
         * @param {hlcmsg.RangeMeta} message RangeMeta
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: hlcmsg.RangeMeta, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this RangeMeta message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this RangeMeta to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    type IdList$Properties = {
        arr?: number[];
    };

    /**
     * Constructs a new IdList.
     * @exports hlcmsg.IdList
     * @constructor
     * @param {hlcmsg.IdList$Properties=} [properties] Properties to set
     */
    class IdList {

        /**
         * Constructs a new IdList.
         * @exports hlcmsg.IdList
         * @constructor
         * @param {hlcmsg.IdList$Properties=} [properties] Properties to set
         */
        constructor(properties?: hlcmsg.IdList$Properties);

        /**
         * IdList arr.
         * @type {Array.<number>}
         */
        public arr: number[];

        /**
         * Creates a new IdList instance using the specified properties.
         * @param {hlcmsg.IdList$Properties=} [properties] Properties to set
         * @returns {hlcmsg.IdList} IdList instance
         */
        public static create(properties?: hlcmsg.IdList$Properties): hlcmsg.IdList;

        /**
         * Encodes the specified IdList message. Does not implicitly {@link hlcmsg.IdList.verify|verify} messages.
         * @param {hlcmsg.IdList$Properties} message IdList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encode(message: hlcmsg.IdList$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdList message, length delimited. Does not implicitly {@link hlcmsg.IdList.verify|verify} messages.
         * @param {hlcmsg.IdList$Properties} message IdList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        public static encodeDelimited(message: hlcmsg.IdList$Properties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdList message from the specified reader or buffer.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {hlcmsg.IdList} IdList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.IdList;

        /**
         * Decodes an IdList message from the specified reader or buffer, length delimited.
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {hlcmsg.IdList} IdList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.IdList;

        /**
         * Verifies an IdList message.
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {?string} `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): string;

        /**
         * Creates an IdList message from a plain object. Also converts values to their respective internal types.
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.IdList} IdList
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.IdList;

        /**
         * Creates an IdList message from a plain object. Also converts values to their respective internal types.
         * This is an alias of {@link hlcmsg.IdList.fromObject}.
         * @function
         * @param {Object.<string,*>} object Plain object
         * @returns {hlcmsg.IdList} IdList
         */
        public static from(object: { [k: string]: any }): hlcmsg.IdList;

        /**
         * Creates a plain object from an IdList message. Also converts values to other types if specified.
         * @param {hlcmsg.IdList} message IdList
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public static toObject(message: hlcmsg.IdList, options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Creates a plain object from this IdList message. Also converts values to other types if specified.
         * @param {$protobuf.ConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        public toObject(options?: $protobuf.ConversionOptions): { [k: string]: any };

        /**
         * Converts this IdList to JSON.
         * @returns {Object.<string,*>} JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
