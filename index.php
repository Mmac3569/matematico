<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Matematico online</title>
    <link rel="stylesheet" href="styles.css?v=<?php echo filemtime("styles.css") ?>">
    <script src="script.js?v=<?php echo filemtime("script.js") ?>"></script>
    <script src="counting-script.js?v=<?php echo filemtime("counting-script.js") ?>"></script>
</head>
<body onload="init()">
    <header>
        <h1>Matematico online</h1>
    </header>
    <nav>
        <a href="#rules-header"><h2 id="rules">pravidla</h2></a>
        <a href="#counting-header"><h2 id="counting">bodování</h2></a>
    </nav>

    <div id="flex-container">
        <div id="number-display-container">
            <label id="remaining-display">Zbývá čísel: 25</label>
            <label class="number-display" id="number-display">0</label>
            <div id="time-display">
                <div id="time-progress"></div>
            </div>
            <label id="high-score-label">Nejvyšší skóre:</label>
            <label class="number-display" id="high-score-display">0</label>
        </div>

        <table>
            <tr>
                <td></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td class="counting-square"></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td class="counting-square"></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td class="counting-square"></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td class="counting-square"></td>
            </tr>
            <tr>
                <td></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td><button class="button"></button></td>
                <td class="counting-square"></td>
            </tr>
            <tr>
                <td class="counting-square"></td>
                <td class="counting-square"></td>
                <td class="counting-square"></td>
                <td class="counting-square"></td>
                <td class="counting-square"></td>
                <td class="counting-square"></td>
                <td class="counting-square"></td>
            </tr>
        </table>
        <div id="game-control">
            <label>Rychlost hry</label><br>
            <input type="radio" name="speed" id="slow" onchange="speedChanged(7)">
            <label for="slow">Pomalá (7 vteřin)</label><br>
            <input type="radio" name="speed" id="normal" checked="true" onchange="speedChanged(5)">
            <label for="normal">Normální (5 vteřin)</label><br>
            <input type="radio" name="speed" id="fast" onchange="speedChanged(3)">
            <label for="fast">Rychlá (3 vteřiny)</label><br>
            <button class="control-button" id="start" onclick="startBtClick()">Start</button>
            <button class="control-button" id="end" onclick="endBtClick()">Ukončit</button>
        </div>
    </div>
    <article>
        <h3 id="rules-header">pravidla hry matematico</h3><br>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque cumque officia natus ad quasi incidunt commodi numquam non delectus dolorum, quidem saepe deserunt suscipit pariatur autem aut tenetur minima? Velit?
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit veniam, dignissimos voluptas quo corrupti in ea minus doloribus qui! Quaerat labore optio enim harum a possimus exercitationem quisquam cumque quos.
        </p><br>
        <h3 id="counting-header">bodování</h3><br>
        <table id="counting-table">
            <tr>
                <td class="combination column-title">Kombinace</td>
                <td class="column-title">Body</td>
            </tr>
            <tr>
                <td class="combination">Dvojice</td>
                <td>1 bod</td>
            </tr>
            <tr>
                <td class="combination">2 Dvojice</td>
                <td>3 body</td>
            </tr>
            <tr>
                <td class="combination">Trojice</td>
                <td>2 body</td>
            </tr>
            <tr>
                <td class="combination">Dvojice + Trojice</td>
                <td>5 body</td>
            </tr>
            <tr>
                <td class="combination">Čtveřice</td>
                <td>4 body</td>
            </tr>
            <tr>
                <td class="combination">Postupka ze 3</td>
                <td>1 bod</td>
            </tr>
            <tr>
                <td class="combination">Postupka ze 4</td>
                <td>3 body</td>
            </tr>
            <tr>
                <td class="combination">Postupka z 5</td>
                <td>6 bodů</td>
            </tr>
        </table><br><br><br>
    </article>
</body>
</html>