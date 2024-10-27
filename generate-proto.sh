#!/bin/bash

# スクリプトが置かれているディレクトリを取得
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# プロジェクトルートディレクトリ（スクリプトが置かれている場所）
PROJECT_ROOT="${SCRIPT_DIR}"

echo "Project root: ${PROJECT_ROOT}"

# Python (venv環境用)
echo "Generating Python code..."
cd "${PROJECT_ROOT}/backend"
source venv/bin/activate
pip install grpcio-tools protobuf

python -m grpc_tools.protoc \
  -I"${PROJECT_ROOT}/proto" \
  --python_out="${PROJECT_ROOT}/backend/movie_booking/generated" \
  --grpc_python_out="${PROJECT_ROOT}/backend/movie_booking/generated" \
  "${PROJECT_ROOT}/proto/movie_booking.proto"

# 生成されたディレクトリに__init__.pyを作成
mkdir -p "${PROJECT_ROOT}/backend/movie_booking/generated"
touch "${PROJECT_ROOT}/backend/movie_booking/generated/__init__.py"

# TypeScript
echo "Generating TypeScript code..."
cd "${PROJECT_ROOT}/frontend"

# TypeScript用のコード生成
mkdir -p src/generated
protoc \
  --plugin="${PROJECT_ROOT}/frontend/node_modules/.bin/protoc-gen-ts_proto" \
  --ts_proto_out=./src/generated \
  -I"${PROJECT_ROOT}/proto" \
  "${PROJECT_ROOT}/proto/movie_booking.proto"

echo "Code generation completed!"