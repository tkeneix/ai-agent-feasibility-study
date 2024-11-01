// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               unknown
// source: movie_booking.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export const protobufPackage = "movie_booking";

/** メッセージの基本型 */
export interface BaseMessage {
  type: string;
  timestamp: string;
}

/** ユーザーリクエスト */
export interface UserRequest {
  type: string;
  message: string;
}

/** チャットメッセージ */
export interface ChatMessage {
  type: string;
  role: ChatMessage_Role;
  content: string;
  agentName: string;
}

export enum ChatMessage_Role {
  SYSTEM = 0,
  AGENT = 1,
  USER = 2,
  UNRECOGNIZED = -1,
}

export function chatMessage_RoleFromJSON(object: any): ChatMessage_Role {
  switch (object) {
    case 0:
    case "SYSTEM":
      return ChatMessage_Role.SYSTEM;
    case 1:
    case "AGENT":
      return ChatMessage_Role.AGENT;
    case 2:
    case "USER":
      return ChatMessage_Role.USER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ChatMessage_Role.UNRECOGNIZED;
  }
}

export function chatMessage_RoleToJSON(object: ChatMessage_Role): string {
  switch (object) {
    case ChatMessage_Role.SYSTEM:
      return "SYSTEM";
    case ChatMessage_Role.AGENT:
      return "AGENT";
    case ChatMessage_Role.USER:
      return "USER";
    case ChatMessage_Role.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** 進捗更新 */
export interface ProgressUpdate {
  type: string;
  status: string;
  progress: number;
  detail: string;
}

/** フレームアクション */
export interface FrameAction {
  type: string;
  enabled: boolean;
  label: string;
}

/** 進捗フレーム */
export interface ProgressFrame {
  type: string;
  frameType: ProgressFrame_FrameType;
  /** JSON encoded data */
  data: Uint8Array;
  action: FrameAction | undefined;
}

export enum ProgressFrame_FrameType {
  THEATERS = 0,
  RECOMMENDATIONS = 1,
  SEATS = 2,
  RESERVATION = 3,
  UNRECOGNIZED = -1,
}

export function progressFrame_FrameTypeFromJSON(object: any): ProgressFrame_FrameType {
  switch (object) {
    case 0:
    case "THEATERS":
      return ProgressFrame_FrameType.THEATERS;
    case 1:
    case "RECOMMENDATIONS":
      return ProgressFrame_FrameType.RECOMMENDATIONS;
    case 2:
    case "SEATS":
      return ProgressFrame_FrameType.SEATS;
    case 3:
    case "RESERVATION":
      return ProgressFrame_FrameType.RESERVATION;
    case -1:
    case "UNRECOGNIZED":
    default:
      return ProgressFrame_FrameType.UNRECOGNIZED;
  }
}

export function progressFrame_FrameTypeToJSON(object: ProgressFrame_FrameType): string {
  switch (object) {
    case ProgressFrame_FrameType.THEATERS:
      return "THEATERS";
    case ProgressFrame_FrameType.RECOMMENDATIONS:
      return "RECOMMENDATIONS";
    case ProgressFrame_FrameType.SEATS:
      return "SEATS";
    case ProgressFrame_FrameType.RESERVATION:
      return "RESERVATION";
    case ProgressFrame_FrameType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** システムステータス */
export interface SystemStatus {
  type: string;
  status: SystemStatus_Status;
  message: string;
}

export enum SystemStatus_Status {
  PROCESSING = 0,
  READY = 1,
  ERROR = 2,
  UNRECOGNIZED = -1,
}

export function systemStatus_StatusFromJSON(object: any): SystemStatus_Status {
  switch (object) {
    case 0:
    case "PROCESSING":
      return SystemStatus_Status.PROCESSING;
    case 1:
    case "READY":
      return SystemStatus_Status.READY;
    case 2:
    case "ERROR":
      return SystemStatus_Status.ERROR;
    case -1:
    case "UNRECOGNIZED":
    default:
      return SystemStatus_Status.UNRECOGNIZED;
  }
}

export function systemStatus_StatusToJSON(object: SystemStatus_Status): string {
  switch (object) {
    case SystemStatus_Status.PROCESSING:
      return "PROCESSING";
    case SystemStatus_Status.READY:
      return "READY";
    case SystemStatus_Status.ERROR:
      return "ERROR";
    case SystemStatus_Status.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** 具体的なデータ型 */
export interface Theater {
  id: number;
  name: string;
  distance: number;
  rating: number;
  address: string;
  screens: string[];
  imageUrl: string;
}

export interface MovieRecommendation {
  movieId: number;
  title: string;
  score: number;
  posterUrl: string;
  genres: string[];
  duration: number;
  rating: string;
  schedule: string[];
  matchReasons: string[];
}

/** Union型の代わりとなるメッセージ */
export interface ServerMessage {
  chat?: ChatMessage | undefined;
  progress?: ProgressUpdate | undefined;
  frame?: ProgressFrame | undefined;
  status?: SystemStatus | undefined;
}

function createBaseBaseMessage(): BaseMessage {
  return { type: "", timestamp: "" };
}

export const BaseMessage = {
  encode(message: BaseMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.timestamp !== "") {
      writer.uint32(18).string(message.timestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BaseMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaseMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.timestamp = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BaseMessage {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      timestamp: isSet(object.timestamp) ? globalThis.String(object.timestamp) : "",
    };
  },

  toJSON(message: BaseMessage): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.timestamp !== "") {
      obj.timestamp = message.timestamp;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BaseMessage>, I>>(base?: I): BaseMessage {
    return BaseMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BaseMessage>, I>>(object: I): BaseMessage {
    const message = createBaseBaseMessage();
    message.type = object.type ?? "";
    message.timestamp = object.timestamp ?? "";
    return message;
  },
};

function createBaseUserRequest(): UserRequest {
  return { type: "", message: "" };
}

export const UserRequest = {
  encode(message: UserRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UserRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUserRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): UserRequest {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: UserRequest): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UserRequest>, I>>(base?: I): UserRequest {
    return UserRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UserRequest>, I>>(object: I): UserRequest {
    const message = createBaseUserRequest();
    message.type = object.type ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseChatMessage(): ChatMessage {
  return { type: "", role: 0, content: "", agentName: "" };
}

export const ChatMessage = {
  encode(message: ChatMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.role !== 0) {
      writer.uint32(16).int32(message.role);
    }
    if (message.content !== "") {
      writer.uint32(26).string(message.content);
    }
    if (message.agentName !== "") {
      writer.uint32(34).string(message.agentName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ChatMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChatMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.content = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.agentName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ChatMessage {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      role: isSet(object.role) ? chatMessage_RoleFromJSON(object.role) : 0,
      content: isSet(object.content) ? globalThis.String(object.content) : "",
      agentName: isSet(object.agentName) ? globalThis.String(object.agentName) : "",
    };
  },

  toJSON(message: ChatMessage): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.role !== 0) {
      obj.role = chatMessage_RoleToJSON(message.role);
    }
    if (message.content !== "") {
      obj.content = message.content;
    }
    if (message.agentName !== "") {
      obj.agentName = message.agentName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ChatMessage>, I>>(base?: I): ChatMessage {
    return ChatMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ChatMessage>, I>>(object: I): ChatMessage {
    const message = createBaseChatMessage();
    message.type = object.type ?? "";
    message.role = object.role ?? 0;
    message.content = object.content ?? "";
    message.agentName = object.agentName ?? "";
    return message;
  },
};

function createBaseProgressUpdate(): ProgressUpdate {
  return { type: "", status: "", progress: 0, detail: "" };
}

export const ProgressUpdate = {
  encode(message: ProgressUpdate, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.status !== "") {
      writer.uint32(18).string(message.status);
    }
    if (message.progress !== 0) {
      writer.uint32(29).float(message.progress);
    }
    if (message.detail !== "") {
      writer.uint32(34).string(message.detail);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProgressUpdate {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProgressUpdate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.status = reader.string();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.progress = reader.float();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.detail = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProgressUpdate {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      status: isSet(object.status) ? globalThis.String(object.status) : "",
      progress: isSet(object.progress) ? globalThis.Number(object.progress) : 0,
      detail: isSet(object.detail) ? globalThis.String(object.detail) : "",
    };
  },

  toJSON(message: ProgressUpdate): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.status !== "") {
      obj.status = message.status;
    }
    if (message.progress !== 0) {
      obj.progress = message.progress;
    }
    if (message.detail !== "") {
      obj.detail = message.detail;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProgressUpdate>, I>>(base?: I): ProgressUpdate {
    return ProgressUpdate.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProgressUpdate>, I>>(object: I): ProgressUpdate {
    const message = createBaseProgressUpdate();
    message.type = object.type ?? "";
    message.status = object.status ?? "";
    message.progress = object.progress ?? 0;
    message.detail = object.detail ?? "";
    return message;
  },
};

function createBaseFrameAction(): FrameAction {
  return { type: "", enabled: false, label: "" };
}

export const FrameAction = {
  encode(message: FrameAction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.enabled !== false) {
      writer.uint32(16).bool(message.enabled);
    }
    if (message.label !== "") {
      writer.uint32(26).string(message.label);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FrameAction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFrameAction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.enabled = reader.bool();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.label = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FrameAction {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      enabled: isSet(object.enabled) ? globalThis.Boolean(object.enabled) : false,
      label: isSet(object.label) ? globalThis.String(object.label) : "",
    };
  },

  toJSON(message: FrameAction): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.enabled !== false) {
      obj.enabled = message.enabled;
    }
    if (message.label !== "") {
      obj.label = message.label;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FrameAction>, I>>(base?: I): FrameAction {
    return FrameAction.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<FrameAction>, I>>(object: I): FrameAction {
    const message = createBaseFrameAction();
    message.type = object.type ?? "";
    message.enabled = object.enabled ?? false;
    message.label = object.label ?? "";
    return message;
  },
};

function createBaseProgressFrame(): ProgressFrame {
  return { type: "", frameType: 0, data: new Uint8Array(0), action: undefined };
}

export const ProgressFrame = {
  encode(message: ProgressFrame, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.frameType !== 0) {
      writer.uint32(16).int32(message.frameType);
    }
    if (message.data.length !== 0) {
      writer.uint32(26).bytes(message.data);
    }
    if (message.action !== undefined) {
      FrameAction.encode(message.action, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProgressFrame {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProgressFrame();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.frameType = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.action = FrameAction.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ProgressFrame {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      frameType: isSet(object.frameType) ? progressFrame_FrameTypeFromJSON(object.frameType) : 0,
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      action: isSet(object.action) ? FrameAction.fromJSON(object.action) : undefined,
    };
  },

  toJSON(message: ProgressFrame): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.frameType !== 0) {
      obj.frameType = progressFrame_FrameTypeToJSON(message.frameType);
    }
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (message.action !== undefined) {
      obj.action = FrameAction.toJSON(message.action);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProgressFrame>, I>>(base?: I): ProgressFrame {
    return ProgressFrame.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProgressFrame>, I>>(object: I): ProgressFrame {
    const message = createBaseProgressFrame();
    message.type = object.type ?? "";
    message.frameType = object.frameType ?? 0;
    message.data = object.data ?? new Uint8Array(0);
    message.action = (object.action !== undefined && object.action !== null)
      ? FrameAction.fromPartial(object.action)
      : undefined;
    return message;
  },
};

function createBaseSystemStatus(): SystemStatus {
  return { type: "", status: 0, message: "" };
}

export const SystemStatus = {
  encode(message: SystemStatus, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.type !== "") {
      writer.uint32(10).string(message.type);
    }
    if (message.status !== 0) {
      writer.uint32(16).int32(message.status);
    }
    if (message.message !== "") {
      writer.uint32(26).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SystemStatus {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSystemStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.type = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SystemStatus {
    return {
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      status: isSet(object.status) ? systemStatus_StatusFromJSON(object.status) : 0,
      message: isSet(object.message) ? globalThis.String(object.message) : "",
    };
  },

  toJSON(message: SystemStatus): unknown {
    const obj: any = {};
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.status !== 0) {
      obj.status = systemStatus_StatusToJSON(message.status);
    }
    if (message.message !== "") {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SystemStatus>, I>>(base?: I): SystemStatus {
    return SystemStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<SystemStatus>, I>>(object: I): SystemStatus {
    const message = createBaseSystemStatus();
    message.type = object.type ?? "";
    message.status = object.status ?? 0;
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseTheater(): Theater {
  return { id: 0, name: "", distance: 0, rating: 0, address: "", screens: [], imageUrl: "" };
}

export const Theater = {
  encode(message: Theater, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.distance !== 0) {
      writer.uint32(29).float(message.distance);
    }
    if (message.rating !== 0) {
      writer.uint32(37).float(message.rating);
    }
    if (message.address !== "") {
      writer.uint32(42).string(message.address);
    }
    for (const v of message.screens) {
      writer.uint32(50).string(v!);
    }
    if (message.imageUrl !== "") {
      writer.uint32(58).string(message.imageUrl);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Theater {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTheater();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.distance = reader.float();
          continue;
        case 4:
          if (tag !== 37) {
            break;
          }

          message.rating = reader.float();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.address = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.screens.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.imageUrl = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Theater {
    return {
      id: isSet(object.id) ? globalThis.Number(object.id) : 0,
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      distance: isSet(object.distance) ? globalThis.Number(object.distance) : 0,
      rating: isSet(object.rating) ? globalThis.Number(object.rating) : 0,
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      screens: globalThis.Array.isArray(object?.screens) ? object.screens.map((e: any) => globalThis.String(e)) : [],
      imageUrl: isSet(object.imageUrl) ? globalThis.String(object.imageUrl) : "",
    };
  },

  toJSON(message: Theater): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.distance !== 0) {
      obj.distance = message.distance;
    }
    if (message.rating !== 0) {
      obj.rating = message.rating;
    }
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.screens?.length) {
      obj.screens = message.screens;
    }
    if (message.imageUrl !== "") {
      obj.imageUrl = message.imageUrl;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Theater>, I>>(base?: I): Theater {
    return Theater.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Theater>, I>>(object: I): Theater {
    const message = createBaseTheater();
    message.id = object.id ?? 0;
    message.name = object.name ?? "";
    message.distance = object.distance ?? 0;
    message.rating = object.rating ?? 0;
    message.address = object.address ?? "";
    message.screens = object.screens?.map((e) => e) || [];
    message.imageUrl = object.imageUrl ?? "";
    return message;
  },
};

function createBaseMovieRecommendation(): MovieRecommendation {
  return {
    movieId: 0,
    title: "",
    score: 0,
    posterUrl: "",
    genres: [],
    duration: 0,
    rating: "",
    schedule: [],
    matchReasons: [],
  };
}

export const MovieRecommendation = {
  encode(message: MovieRecommendation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.movieId !== 0) {
      writer.uint32(8).int32(message.movieId);
    }
    if (message.title !== "") {
      writer.uint32(18).string(message.title);
    }
    if (message.score !== 0) {
      writer.uint32(29).float(message.score);
    }
    if (message.posterUrl !== "") {
      writer.uint32(34).string(message.posterUrl);
    }
    for (const v of message.genres) {
      writer.uint32(42).string(v!);
    }
    if (message.duration !== 0) {
      writer.uint32(48).int32(message.duration);
    }
    if (message.rating !== "") {
      writer.uint32(58).string(message.rating);
    }
    for (const v of message.schedule) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.matchReasons) {
      writer.uint32(74).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MovieRecommendation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMovieRecommendation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.movieId = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.title = reader.string();
          continue;
        case 3:
          if (tag !== 29) {
            break;
          }

          message.score = reader.float();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.posterUrl = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.genres.push(reader.string());
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.duration = reader.int32();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.rating = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.schedule.push(reader.string());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.matchReasons.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MovieRecommendation {
    return {
      movieId: isSet(object.movieId) ? globalThis.Number(object.movieId) : 0,
      title: isSet(object.title) ? globalThis.String(object.title) : "",
      score: isSet(object.score) ? globalThis.Number(object.score) : 0,
      posterUrl: isSet(object.posterUrl) ? globalThis.String(object.posterUrl) : "",
      genres: globalThis.Array.isArray(object?.genres) ? object.genres.map((e: any) => globalThis.String(e)) : [],
      duration: isSet(object.duration) ? globalThis.Number(object.duration) : 0,
      rating: isSet(object.rating) ? globalThis.String(object.rating) : "",
      schedule: globalThis.Array.isArray(object?.schedule) ? object.schedule.map((e: any) => globalThis.String(e)) : [],
      matchReasons: globalThis.Array.isArray(object?.matchReasons)
        ? object.matchReasons.map((e: any) => globalThis.String(e))
        : [],
    };
  },

  toJSON(message: MovieRecommendation): unknown {
    const obj: any = {};
    if (message.movieId !== 0) {
      obj.movieId = Math.round(message.movieId);
    }
    if (message.title !== "") {
      obj.title = message.title;
    }
    if (message.score !== 0) {
      obj.score = message.score;
    }
    if (message.posterUrl !== "") {
      obj.posterUrl = message.posterUrl;
    }
    if (message.genres?.length) {
      obj.genres = message.genres;
    }
    if (message.duration !== 0) {
      obj.duration = Math.round(message.duration);
    }
    if (message.rating !== "") {
      obj.rating = message.rating;
    }
    if (message.schedule?.length) {
      obj.schedule = message.schedule;
    }
    if (message.matchReasons?.length) {
      obj.matchReasons = message.matchReasons;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MovieRecommendation>, I>>(base?: I): MovieRecommendation {
    return MovieRecommendation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MovieRecommendation>, I>>(object: I): MovieRecommendation {
    const message = createBaseMovieRecommendation();
    message.movieId = object.movieId ?? 0;
    message.title = object.title ?? "";
    message.score = object.score ?? 0;
    message.posterUrl = object.posterUrl ?? "";
    message.genres = object.genres?.map((e) => e) || [];
    message.duration = object.duration ?? 0;
    message.rating = object.rating ?? "";
    message.schedule = object.schedule?.map((e) => e) || [];
    message.matchReasons = object.matchReasons?.map((e) => e) || [];
    return message;
  },
};

function createBaseServerMessage(): ServerMessage {
  return { chat: undefined, progress: undefined, frame: undefined, status: undefined };
}

export const ServerMessage = {
  encode(message: ServerMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.chat !== undefined) {
      ChatMessage.encode(message.chat, writer.uint32(10).fork()).ldelim();
    }
    if (message.progress !== undefined) {
      ProgressUpdate.encode(message.progress, writer.uint32(18).fork()).ldelim();
    }
    if (message.frame !== undefined) {
      ProgressFrame.encode(message.frame, writer.uint32(26).fork()).ldelim();
    }
    if (message.status !== undefined) {
      SystemStatus.encode(message.status, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServerMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServerMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.chat = ChatMessage.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.progress = ProgressUpdate.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.frame = ProgressFrame.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.status = SystemStatus.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ServerMessage {
    return {
      chat: isSet(object.chat) ? ChatMessage.fromJSON(object.chat) : undefined,
      progress: isSet(object.progress) ? ProgressUpdate.fromJSON(object.progress) : undefined,
      frame: isSet(object.frame) ? ProgressFrame.fromJSON(object.frame) : undefined,
      status: isSet(object.status) ? SystemStatus.fromJSON(object.status) : undefined,
    };
  },

  toJSON(message: ServerMessage): unknown {
    const obj: any = {};
    if (message.chat !== undefined) {
      obj.chat = ChatMessage.toJSON(message.chat);
    }
    if (message.progress !== undefined) {
      obj.progress = ProgressUpdate.toJSON(message.progress);
    }
    if (message.frame !== undefined) {
      obj.frame = ProgressFrame.toJSON(message.frame);
    }
    if (message.status !== undefined) {
      obj.status = SystemStatus.toJSON(message.status);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ServerMessage>, I>>(base?: I): ServerMessage {
    return ServerMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ServerMessage>, I>>(object: I): ServerMessage {
    const message = createBaseServerMessage();
    message.chat = (object.chat !== undefined && object.chat !== null)
      ? ChatMessage.fromPartial(object.chat)
      : undefined;
    message.progress = (object.progress !== undefined && object.progress !== null)
      ? ProgressUpdate.fromPartial(object.progress)
      : undefined;
    message.frame = (object.frame !== undefined && object.frame !== null)
      ? ProgressFrame.fromPartial(object.frame)
      : undefined;
    message.status = (object.status !== undefined && object.status !== null)
      ? SystemStatus.fromPartial(object.status)
      : undefined;
    return message;
  },
};

/** サービス定義 */
export interface MovieBookingService {
  ProcessUserRequest(request: UserRequest): Observable<ServerMessage>;
}

export const MovieBookingServiceServiceName = "movie_booking.MovieBookingService";
export class MovieBookingServiceClientImpl implements MovieBookingService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MovieBookingServiceServiceName;
    this.rpc = rpc;
    this.ProcessUserRequest = this.ProcessUserRequest.bind(this);
  }
  ProcessUserRequest(request: UserRequest): Observable<ServerMessage> {
    const data = UserRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(this.service, "ProcessUserRequest", data);
    return result.pipe(map((data) => ServerMessage.decode(_m0.Reader.create(data))));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
