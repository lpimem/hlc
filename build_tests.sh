#! /bin/bash
USER_SCRIPT=dist/hlc.inject.test.user.js
OUTPUT=hlc.live_tests.js

webpack --config webpack.test.config.js --output-filename $OUTPUT
cat greasemonkey/header.part > $USER_SCRIPT
cat dist/$OUTPUT >> $USER_SCRIPT
cat greasemonkey/footer.part >> $USER_SCRIPT
