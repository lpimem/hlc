#! /bin/bash
# --optimize-minimize
# --optimize-occurrence-order
# https://webpack.github.io/docs/optimization.html

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $SCRIPT_DIR

USER_SCRIPT=dist/hlc.inject.user.js
OUTPUT=dist/hlc.inject.js
CHROME_SRC=chrome-ext
CHROME_OUTPUT=chrome-dist/hlc.content.js

webpack --config webpack.config.js "$@"

cat greasemonkey/header.part > $USER_SCRIPT
cat $OUTPUT >> $USER_SCRIPT
cat greasemonkey/footer.part >> $USER_SCRIPT

cp $OUTPUT $CHROME_OUTPUT
rsync -a --progress icon chrome-dist/
rsync --progress $CHROME_SRC/*.json chrome-dist/
rsync --progress $CHROME_SRC/popup/*.html chrome-dist/
rsync --progress $CHROME_SRC/popup/*.css chrome-dist/
