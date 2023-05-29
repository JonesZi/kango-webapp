Wir nutzen Handlebars mit verschiedenen Unterseiten (keine SPA)
Dies bedeutet, dass client-seitige variablen beim reload verschwinden (wie z.B. Username)

--> Username muss server-seitig gespeichert werden + als variable dynamisch ins Handlebars template eingefügt werden!
--> Dies ist auch eine gute Voraussetzung, um Usernamen auf Dopplungen zu überprüfen!

// Aufbau der App

- Homepage
Willkommensbotschaft
Input Feld mit Label "Name"
Button "los geht's!" > Überprüfung Name, Übertragung an name.json auf dem Server

- Kategorien Übersichts - Page
Anzeige Username auf Basis des letzten in array aus name.json
Kacheln mit Kategorien
Es werden nur Kacheln angezeigt, die noch nicht gespielt wurden - - WIE MACHE ICH DAS?
Klick > Link auf Kategorie

Variablen: Username, Kategorien (inklusive Status ob gespielt oder nicht)

- Kategorie Page
Aufnahme Startet
Frage wird abgespielt
Countdown beginnt (mit 30 Sekunden Timer)
Aufnahme wird an Server übertragen inklusive Kategorie, Frage und Name (Unique Filename) unter /upload
Zurück zu Kategorie Übersicht (bereits gespielte Kategorien grau)

Variablen: Username, Kategorie, Fragen-ID

Ende des Spiels:
Nach 3 Kategorien (?) --> Wie zähle ich das mit?


