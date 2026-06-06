Unsere Webseite "Aura" filtert Artists nach Genre und hilft dabei, neue Künstlerinnen und Künstler zu entdecken, die zum eigenen Musikgeschmack passen könnten. Je nachdem, welches Genre man gerne hört, kann man auf eine der Genre Bubbles klicken und bekommt Artists angezeigt, die zu diesem Genre passen.

Zu jedem Artist werden ein Bild, der Name sowie der bekannteste Song und das dazugehörige Album angezeigt. So kann man schnell neue Musik entdecken und erhält direkt einen ersten Eindruck von den Künstlerinnen und Künstlern.

Die verschiedenen Genres werden durch farbige Aura Bubbles dargestellt, welche die Stimmung und den Charakter der jeweiligen Musikrichtung widerspiegeln sollen. Dadurch entsteht nicht nur eine einfache und spielerische Navigation, sondern auch ein Gefühl für die Identität eines Genres.

Inspiriert wurde die Idee unter anderem von Synästhesie. Dabei handelt es sich um ein Phänomen, bei dem Menschen verschiedene Sinneseindrücke miteinander verknüpfen und Musik zum Beispiel als Farben wahrnehmen. Diesen Gedanken wollten wir aufgreifen und Musik nicht nur hörbar, sondern auch visuell erlebbar machen.

Aura soll deshalb nicht nur eine Artist Suche sein, sondern eine kreative und ästhetische Möglichkeit bieten, die eigene Lieblingsmusikrichtung zu erkunden und dabei vielleicht sogar neue Lieblingsartists zu entdecken.

Unsere Erstidee war, dies mit Spotify umzusetzen. Da wir mit der API von Spotify jedoch auf einige Probleme gestossen sind und unsere Inhalte nicht mehr angezeigt werden konnten, mussten wir eine andere Lösung finden. Nun läuft unsere Webseite über die MusicBrainz API.

Mit dem Wechsel der API haben sich folgende Änderungen am Projekt ergeben: Ursprünglich wollten wir die Top 3 Tracks anzeigen, können mit der API von MusicBrainz jedoch nur auf einen Top Track zugreifen. Eigentlich wollten wir pro Genre 25 Artists angeben. Da MusicBrainz vermutlich jedoch nicht das neuste Programm ist, kennt es viele Artists nicht und nur bei wenigen Artists ist ein Top Track vermerkt. Eine Menge Artists sind auf MusicBrainz nicht verifiziert, was wahrscheinlich zusätzlich dazu geführt hat, dass gewisse Artist IDs nicht angenommen wurden. Daher mussten wir unsere Auswahl auf 20 Artists pro Genre reduzieren. Bei Latin auf 17 Artists.

Vorgehensweise:

- Für Farbschema und Konzept das Design entschieden
- Visuell in Figma dargestellt, für Prototyp auf vereinfachte Animation und nur 5 Artists pro Genre beschränkt
- Mit Spotify API experimentiert, jedoch keinen Erfolg gehabt (darauf werden wir nicht weiter eingehen, da diese Arbeitsschritte keinen Einfluss auf das finale Projekt haben)
- Webseite basierend auf dem Prototyp von Lea Moser aufgebaut: Styling ersetzt, weitere Elemente ergänzt (Back-Button, dynamischer Hintergrund, Musik)
- ID's aller Artists auf MusicBrainz herausgesucht und eingebunden
- Mobile mit leichten optischen Anpassungen erstellt

Herausforderungen:

- Mit nur der index.html Seite müssen zusätzliche Überlegungen getroffen werden, wenn praktisch der gesamte Inhalt im script.js entsteht
- Im script.js entstehen teilweise extrem viele Zeilen, zu verstehen, in welche Verschachtelung ein neues Element muss, war nicht immer einfach
- Verstehen, welches Element man im css ansprechen muss, das im js entstand, gelang nicht immer direkt

Learnings:

- Manchmal funktioniert eine Idee technisch nicht so, wie man es sich vorgestellt hat. Wegen der Spotify API mussten wir einen Teil unserer ursprünglichen Idee anpassen. Dabei haben wir gelernt, dass man sich manchmal von einer Idee verabschieden muss.
- Wenn etwas auch nach mehreren Versuchen nicht funktioniert, sollte man nicht zu lange daran festhalten, sondern Hilfe holen.
- Das gemeinsame Arbeiten am Code war einfacher als erwartet. Mit GitHub und guter Absprache im Team hat das gut funktioniert.
- Die Kommunikation im Team verlief sehr gut. Wir waren schnell von der Idee überzeugt und hatten beide Interesse am Thema. Dadurch machte die Zusammenarbeit Spass und wir konnten Entscheidungen schnell treffen.
- Wir haben gelernt, flexibel zu bleiben und unsere Idee anzupassen, wenn technische Einschränkungen auftauchen.
