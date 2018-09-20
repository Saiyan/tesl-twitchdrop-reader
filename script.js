function processOnClick(e) {

    const txtData = document.getElementById('txtData');
    const fileData = document.getElementById('fileData');

    if(txtData.value){
        processInputData(txtData.value);
    }else if(fileData.value){
        const fr = new FileReader();
        fr.onload = file => { processInputData(file.target.result)};
        fr.readAsText(fileData.files[0]);
    }
}


function processInputData(input_data){
    const regex = /(\d+\.\d+\.\d+), (\d\d:\d\d:\d\d)\s+Bethesda:.*You have been selected[^\d]*(\d+)\s+(.*).* for The Elder Scrolls: Legends/g;
    let match = regex.exec(input_data);
    let drops = [];

    while (match != null) {

        drops.push({
            date: match[1],
            time: match[2],
            amount: match[3],
            item: match[4]
        });
        match = regex.exec(input_data);
    }

    processDrops(drops);
}

function getLineForDrop(drop) {
    let line = '';
    line += '<tr>';
    line += '<td>' + drop.date + '</td>';
    line += '<td>' + drop.time + '</td>';
    line += '<td>' + drop.amount + '</td>';
    line += '<td>' + drop.item + '</td>';
    line += '</tr>\n';
    return line;
}

function processDrops(drops) {
    drops.sort(x => {});

    let tableOutput = document.getElementById('tableOutput');
    let tableSummary = document.getElementById('tableSummary');
    let outputHtml = '';
    let summary = {
        gems: 0,
        gold: 0,
        legpack: 0,
        skyrimpack: 0,
        corepack: 0,
        ticket: 0,
    };

    for(let i=0; i < drops.length; i++){
        outputHtml += getLineForDrop(drops[i]);
        addDropToSummary(drops[i]);
    }

    tableSummary.innerHTML = generateSummaryHtml(summary);
    tableOutput.innerHTML = outputHtml;

    function addDropToSummary(drop) {
        let amount = parseInt(drop.amount);
        switch(drop.item){
            case 'Soul Gems':
                summary.gems += amount;
                break;
            case 'Gold':
                summary.gold += amount;
                break;
            case 'Legendary Card Pack':
                summary.legpack += amount;
                break;
            case 'Skyrim Card Pack':
                summary.skyrimpack += amount;
                break;
            case 'Core Card Pack':
                summary.corepack += amount;
                break;
            case 'Arena Tickets':
                summary.ticket += amount;
                break;
        }
    }
}


function generateSummaryHtml(summary) {
    let html = '';

    html += '<tr><td class="summary-gems">' + summary.gems + '</td><td> Soul Gems</td></tr>';
    html += '<tr><td class="summary-gold">' + summary.gold + '</td><td> Gold </td></tr>';
    html += '<tr><td class="summary-legpack">' + summary.legpack + '</td><td> Legendary Card Pack\'s</td></tr>';
    html += '<tr><td class="summary-skyrimpack">' + summary.skyrimpack + '</td><td> Skyrim Card Pack\'s</td></tr>';
    html += '<tr><td class="summary-corepack">' + summary.corepack + '</td><td> Core Card Pack\'s</td></tr>';
    html += '<tr><td class="summary-ticket">' + summary.ticket + '</td><td> Arena Ticket\'s</td></tr>';

    return html;
}