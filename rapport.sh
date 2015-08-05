echo "Generation du rapport en PDF via phantomjs..."
./node_modules/phantomjs/bin/phantomjs rapport.js
echo "Generation du rapport en PDF via phantomjs... OK"
echo "Ouverture du rapport..."
open src/main/webapp/scripts/app/rapport/rapport.pdf