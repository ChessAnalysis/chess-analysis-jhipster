echo "Generation du rapport en PDF via phantomjs..."
./node_modules/phantomjs/bin/phantomjs rapport.js "http://localhost:3000/#/rapport" "src/main/webapp/scripts/app/rapport/rapport.pdf" "A4"
echo "Generation du rapport en PDF via phantomjs... OK"
echo "Ouverture du rapport..."
open src/main/webapp/scripts/app/rapport/rapport.pdf