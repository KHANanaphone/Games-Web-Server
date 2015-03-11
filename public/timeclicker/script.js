var rows = [];
var TOTAL = 0;

$(document).ready(function(){
    addRow();
})

function addRow(){
    
    var row = {
        id: rows.length,
        count: 0 };
    
    row.$displayRow = $('#hidden .display-row').clone();
    row.$controlRow = $('#hidden .control-row').clone();
    
    setupEvents(row);
    
    $('#display').append(row.$displayRow);
    $('#control-rows').append(row.$controlRow);

    row.$controlRow.find('.name').attr('tabindex', row.id + 1).select();
    row.$displayRow.find('.bar').css('background-color', randomColor());
    
    rows.push(row);    
    updateAllRows();
}

function setupEvents(row){

    row.$controlRow.find('input').on('input', function(e){

        row.$displayRow.find('.name').text($(this).val());        
    }).on('keydown', function(e){
       
        if(e.keyCode == 13)
            addRow();
    });

    row.$controlRow.find('.minus').click(function(){

        if(row.count > 0){
            row.count--;
            TOTAL--;
            updateAllRows();
        }
        else{
            row.$displayRow.remove();
            row.$controlRow.remove();
        }
    });

    row.$controlRow.find('.plus').click(function(){

        row.count++;
        TOTAL++;

        updateAllRows();
    });
}

function updateAllRows(){
    
    for(var i = 0; i < rows.length; i++){
        
        var row = rows[i];
        var ratio = row.count * 1.0 / TOTAL;
        
        row.$displayRow.find('.stats .text').text(row.count);
        row.$displayRow.find('.bar')
            .css('right', (1 - ratio) * 100 + '%');
    }
}