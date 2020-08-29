import * as $protobuf from "protobufjs";
/** Namespace hlcmsg. */
export namespace hlcmsg {

    /** Properties of a HlcResp. */
    interface IHlcResp {

        /** HlcResp code */
        code?: (hlcmsg.HlcResp.RespCode|null);

        /** HlcResp msg */
        msg?: (string|null);

        /** HlcResp pagenoteList */
        pagenoteList?: (hlcmsg.IPagenote[]|null);

        /** HlcResp idList */
        idList?: (hlcmsg.IIdList|null);
    }

    /** Represents a HlcResp. */
    class HlcResp implements IHlcResp {

        /**
         * Constructs a new HlcResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: hlcmsg.IHlcResp);

        /** HlcResp code. */
        public code: hlcmsg.HlcResp.RespCode;

        /** HlcResp msg. */
        public msg: string;

        /** HlcResp pagenoteList. */
        public pagenoteList: hlcmsg.IPagenote[];

        /** HlcResp idList. */
        public idList?: (hlcmsg.IIdList|null);

        /**
         * Creates a new HlcResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HlcResp instance
         */
        public static create(properties?: hlcmsg.IHlcResp): hlcmsg.HlcResp;

        /**
         * Encodes the specified HlcResp message. Does not implicitly {@link hlcmsg.HlcResp.verify|verify} messages.
         * @param message HlcResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hlcmsg.IHlcResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HlcResp message, length delimited. Does not implicitly {@link hlcmsg.HlcResp.verify|verify} messages.
         * @param message HlcResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hlcmsg.IHlcResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HlcResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HlcResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.HlcResp;

        /**
         * Decodes a HlcResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HlcResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.HlcResp;

        /**
         * Verifies a HlcResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HlcResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HlcResp
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.HlcResp;

        /**
         * Creates a plain object from a HlcResp message. Also converts values to other types if specified.
         * @param message HlcResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hlcmsg.HlcResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HlcResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    namespace HlcResp {

        /** RespCode enum. */
        enum RespCode {
            FAIL = 0,
            SUC = 1
        }
    }

    /** Properties of a Pagenote. */
    interface IPagenote {

        /** Pagenote pageid */
        pageid?: (number|null);

        /** Pagenote uid */
        uid?: (number|null);

        /** Pagenote highlights */
        highlights?: (hlcmsg.IRangeMeta[]|null);

        /** Pagenote url */
        url?: (string|null);
    }

    /** Represents a Pagenote. */
    class Pagenote implements IPagenote {

        /**
         * Constructs a new Pagenote.
         * @param [properties] Properties to set
         */
        constructor(properties?: hlcmsg.IPagenote);

        /** Pagenote pageid. */
        public pageid: number;

        /** Pagenote uid. */
        public uid: number;

        /** Pagenote highlights. */
        public highlights: hlcmsg.IRangeMeta[];

        /** Pagenote url. */
        public url: string;

        /**
         * Creates a new Pagenote instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Pagenote instance
         */
        public static create(properties?: hlcmsg.IPagenote): hlcmsg.Pagenote;

        /**
         * Encodes the specified Pagenote message. Does not implicitly {@link hlcmsg.Pagenote.verify|verify} messages.
         * @param message Pagenote message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hlcmsg.IPagenote, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Pagenote message, length delimited. Does not implicitly {@link hlcmsg.Pagenote.verify|verify} messages.
         * @param message Pagenote message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hlcmsg.IPagenote, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Pagenote message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Pagenote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.Pagenote;

        /**
         * Decodes a Pagenote message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Pagenote
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.Pagenote;

        /**
         * Verifies a Pagenote message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Pagenote message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Pagenote
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.Pagenote;

        /**
         * Creates a plain object from a Pagenote message. Also converts values to other types if specified.
         * @param message Pagenote
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hlcmsg.Pagenote, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Pagenote to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RangeMeta. */
    interface IRangeMeta {

        /** RangeMeta id */
        id?: (number|null);

        /** RangeMeta anchor */
        anchor?: (string|null);

        /** RangeMeta start */
        start?: (string|null);

        /** RangeMeta startOffset */
        startOffset?: (number|null);

        /** RangeMeta end */
        end?: (string|null);

        /** RangeMeta endOffset */
        endOffset?: (number|null);

        /** RangeMeta text */
        text?: (string|null);

        /** RangeMeta option */
        option?: (string|null);
    }

    /** Represents a RangeMeta. */
    class RangeMeta implements IRangeMeta {

        /**
         * Constructs a new RangeMeta.
         * @param [properties] Properties to set
         */
        constructor(properties?: hlcmsg.IRangeMeta);

        /** RangeMeta id. */
        public id: number;

        /** RangeMeta anchor. */
        public anchor: string;

        /** RangeMeta start. */
        public start: string;

        /** RangeMeta startOffset. */
        public startOffset: number;

        /** RangeMeta end. */
        public end: string;

        /** RangeMeta endOffset. */
        public endOffset: number;

        /** RangeMeta text. */
        public text: string;

        /** RangeMeta option. */
        public option: string;

        /**
         * Creates a new RangeMeta instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RangeMeta instance
         */
        public static create(properties?: hlcmsg.IRangeMeta): hlcmsg.RangeMeta;

        /**
         * Encodes the specified RangeMeta message. Does not implicitly {@link hlcmsg.RangeMeta.verify|verify} messages.
         * @param message RangeMeta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hlcmsg.IRangeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RangeMeta message, length delimited. Does not implicitly {@link hlcmsg.RangeMeta.verify|verify} messages.
         * @param message RangeMeta message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hlcmsg.IRangeMeta, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RangeMeta message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RangeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.RangeMeta;

        /**
         * Decodes a RangeMeta message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RangeMeta
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.RangeMeta;

        /**
         * Verifies a RangeMeta message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RangeMeta message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RangeMeta
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.RangeMeta;

        /**
         * Creates a plain object from a RangeMeta message. Also converts values to other types if specified.
         * @param message RangeMeta
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hlcmsg.RangeMeta, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RangeMeta to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an IdList. */
    interface IIdList {

        /** IdList arr */
        arr?: (number[]|null);
    }

    /** Represents an IdList. */
    class IdList implements IIdList {

        /**
         * Constructs a new IdList.
         * @param [properties] Properties to set
         */
        constructor(properties?: hlcmsg.IIdList);

        /** IdList arr. */
        public arr: number[];

        /**
         * Creates a new IdList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns IdList instance
         */
        public static create(properties?: hlcmsg.IIdList): hlcmsg.IdList;

        /**
         * Encodes the specified IdList message. Does not implicitly {@link hlcmsg.IdList.verify|verify} messages.
         * @param message IdList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: hlcmsg.IIdList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified IdList message, length delimited. Does not implicitly {@link hlcmsg.IdList.verify|verify} messages.
         * @param message IdList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: hlcmsg.IIdList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an IdList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns IdList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): hlcmsg.IdList;

        /**
         * Decodes an IdList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns IdList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): hlcmsg.IdList;

        /**
         * Verifies an IdList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an IdList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns IdList
         */
        public static fromObject(object: { [k: string]: any }): hlcmsg.IdList;

        /**
         * Creates a plain object from an IdList message. Also converts values to other types if specified.
         * @param message IdList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: hlcmsg.IdList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this IdList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
