# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: movie_booking.proto
# Protobuf Python Version: 5.27.2
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    5,
    27,
    2,
    '',
    'movie_booking.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x13movie_booking.proto\x12\rmovie_booking\".\n\x0b\x42\x61seMessage\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x11\n\ttimestamp\x18\x02 \x01(\t\",\n\x0bUserRequest\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x0f\n\x07message\x18\x02 \x01(\t\"\x98\x01\n\x0b\x43hatMessage\x12\x0c\n\x04type\x18\x01 \x01(\t\x12-\n\x04role\x18\x02 \x01(\x0e\x32\x1f.movie_booking.ChatMessage.Role\x12\x0f\n\x07\x63ontent\x18\x03 \x01(\t\x12\x12\n\nagent_name\x18\x04 \x01(\t\"\'\n\x04Role\x12\n\n\x06SYSTEM\x10\x00\x12\t\n\x05\x41GENT\x10\x01\x12\x08\n\x04USER\x10\x02\"P\n\x0eProgressUpdate\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x0e\n\x06status\x18\x02 \x01(\t\x12\x10\n\x08progress\x18\x03 \x01(\x02\x12\x0e\n\x06\x64\x65tail\x18\x04 \x01(\t\";\n\x0b\x46rameAction\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x0f\n\x07\x65nabled\x18\x02 \x01(\x08\x12\r\n\x05label\x18\x03 \x01(\t\"\xdf\x01\n\rProgressFrame\x12\x0c\n\x04type\x18\x01 \x01(\t\x12:\n\nframe_type\x18\x02 \x01(\x0e\x32&.movie_booking.ProgressFrame.FrameType\x12\x0c\n\x04\x64\x61ta\x18\x03 \x01(\x0c\x12*\n\x06\x61\x63tion\x18\x04 \x01(\x0b\x32\x1a.movie_booking.FrameAction\"J\n\tFrameType\x12\x0c\n\x08THEATERS\x10\x00\x12\x13\n\x0fRECOMMENDATIONS\x10\x01\x12\t\n\x05SEATS\x10\x02\x12\x0f\n\x0bRESERVATION\x10\x03\"\x91\x01\n\x0cSystemStatus\x12\x0c\n\x04type\x18\x01 \x01(\t\x12\x32\n\x06status\x18\x02 \x01(\x0e\x32\".movie_booking.SystemStatus.Status\x12\x0f\n\x07message\x18\x03 \x01(\t\".\n\x06Status\x12\x0e\n\nPROCESSING\x10\x00\x12\t\n\x05READY\x10\x01\x12\t\n\x05\x45RROR\x10\x02\"z\n\x07Theater\x12\n\n\x02id\x18\x01 \x01(\x05\x12\x0c\n\x04name\x18\x02 \x01(\t\x12\x10\n\x08\x64istance\x18\x03 \x01(\x02\x12\x0e\n\x06rating\x18\x04 \x01(\x02\x12\x0f\n\x07\x61\x64\x64ress\x18\x05 \x01(\t\x12\x0f\n\x07screens\x18\x06 \x03(\t\x12\x11\n\timage_url\x18\x07 \x01(\t\"\xb4\x01\n\x13MovieRecommendation\x12\x10\n\x08movie_id\x18\x01 \x01(\x05\x12\r\n\x05title\x18\x02 \x01(\t\x12\r\n\x05score\x18\x03 \x01(\x02\x12\x12\n\nposter_url\x18\x04 \x01(\t\x12\x0e\n\x06genres\x18\x05 \x03(\t\x12\x10\n\x08\x64uration\x18\x06 \x01(\x05\x12\x0e\n\x06rating\x18\x07 \x01(\t\x12\x10\n\x08schedule\x18\x08 \x03(\t\x12\x15\n\rmatch_reasons\x18\t \x03(\t\"\xd7\x01\n\rServerMessage\x12*\n\x04\x63hat\x18\x01 \x01(\x0b\x32\x1a.movie_booking.ChatMessageH\x00\x12\x31\n\x08progress\x18\x02 \x01(\x0b\x32\x1d.movie_booking.ProgressUpdateH\x00\x12-\n\x05\x66rame\x18\x03 \x01(\x0b\x32\x1c.movie_booking.ProgressFrameH\x00\x12-\n\x06status\x18\x04 \x01(\x0b\x32\x1b.movie_booking.SystemStatusH\x00\x42\t\n\x07message2g\n\x13MovieBookingService\x12P\n\x12ProcessUserRequest\x12\x1a.movie_booking.UserRequest\x1a\x1c.movie_booking.ServerMessage0\x01\x62\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'movie_booking_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_BASEMESSAGE']._serialized_start=38
  _globals['_BASEMESSAGE']._serialized_end=84
  _globals['_USERREQUEST']._serialized_start=86
  _globals['_USERREQUEST']._serialized_end=130
  _globals['_CHATMESSAGE']._serialized_start=133
  _globals['_CHATMESSAGE']._serialized_end=285
  _globals['_CHATMESSAGE_ROLE']._serialized_start=246
  _globals['_CHATMESSAGE_ROLE']._serialized_end=285
  _globals['_PROGRESSUPDATE']._serialized_start=287
  _globals['_PROGRESSUPDATE']._serialized_end=367
  _globals['_FRAMEACTION']._serialized_start=369
  _globals['_FRAMEACTION']._serialized_end=428
  _globals['_PROGRESSFRAME']._serialized_start=431
  _globals['_PROGRESSFRAME']._serialized_end=654
  _globals['_PROGRESSFRAME_FRAMETYPE']._serialized_start=580
  _globals['_PROGRESSFRAME_FRAMETYPE']._serialized_end=654
  _globals['_SYSTEMSTATUS']._serialized_start=657
  _globals['_SYSTEMSTATUS']._serialized_end=802
  _globals['_SYSTEMSTATUS_STATUS']._serialized_start=756
  _globals['_SYSTEMSTATUS_STATUS']._serialized_end=802
  _globals['_THEATER']._serialized_start=804
  _globals['_THEATER']._serialized_end=926
  _globals['_MOVIERECOMMENDATION']._serialized_start=929
  _globals['_MOVIERECOMMENDATION']._serialized_end=1109
  _globals['_SERVERMESSAGE']._serialized_start=1112
  _globals['_SERVERMESSAGE']._serialized_end=1327
  _globals['_MOVIEBOOKINGSERVICE']._serialized_start=1329
  _globals['_MOVIEBOOKINGSERVICE']._serialized_end=1432
# @@protoc_insertion_point(module_scope)
