node_modules/protobufjs/cli/bin/pbjs -t static-module -w commonjs -o src/compiled/proto.js hlcproto/*.proto
node_modules/protobufjs/cli/bin/pbts -o src/compiled/proto.d.ts src/compiled/proto.js
