#! /bin/bash
USER_SCRIPT=dist/hlc.inject.user.js
OUTPUT=hlc.inject.js

webpack --config webpack.inject.config.js --output-filename $OUTPUT
cat greasemonkey/header.part > $USER_SCRIPT
cat dist/$OUTPUT >> $USER_SCRIPT
cat greasemonkey/footer.part >> $USER_SCRIPT
