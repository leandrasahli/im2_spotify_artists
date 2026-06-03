Unsere Webseite filtert Artists nach Genre. Sie dient dazu, Artist zu finden, die zu einem passend könnten, je nachdem, welches Genre man gerne hört. Mit dem Klick auf ein Genre werden Artists angezeigt, die wir mit diesem Genre assozieren. Von jedem Artist wird ein Bild, der Name und der Top Track sowie dessen Album angezeigt.

Unsere Erstidee war, dies mit Spotify umzusetzen. Da wir mit der API von Spotify jedoch auf einige Probleme gestossen sind und unsere Inhalte nicht mehr angezeigt werden konnten, mussten wir eine andere Lösung finden. Nun läuft unsere Webseite über die MusicBrainz API.

Mit dem Wechsel der API haben sich folgende Änderungen am Projekt ergeben: Ursprünglich wollten wir die Top 3 Tracks anzeigen, können mit der API von MusicBrainz jedoch nur auf einen Top Track zugreifen. Eigentlich wollten wir pro Genre 25 Artists angeben. Da MusicBrainz vermutlich jedoch nicht das neuste Programm ist, kennt es viele Artists nicht und nur bei wenigen Artists ist ein Top Track vermerkt. Daher mussten wir unsere Auswahl auf 20 Artists pro Genre reduzieren.

Vorgehensweise:

- Für Farbschema und Konzept des Design entschieden
- Visuell in Figma dargestellt, für Prototyp auf vereinfachte Animation und nur 5 Artists pro Genre beschränkt
- mit Spotify API experimentiert, jedoch keinen Erfolg gehabt (darauf werden wir nicht weiter eingehen, da diese Arbeitsschritte keinen Einfluss auf das finale Projekt haben)
- Webseite basierend auf dem Prototyp von Lea aufgebaut: Styling ersetzt, weitere Elemente ergänzt (Back-Button, dynamischer Hintergrund)
- ID's aller Artists auf MusicBrainz herausgesucht und eingebunden
- Mobile mit leichten optischen Anpassungen erstellt

Herausforderungen:

- Mit nur der index.html Seite müssen zusätzliche Überlegungen getroffen werden, wenn praktisch der gesamte im script.js entsteht

Learnings:

- Manchmal gibt es einfach keine Lösung (Spotify API) und wir mussten uns von unserer Idee zumindest zu einem Teil verabschieden
