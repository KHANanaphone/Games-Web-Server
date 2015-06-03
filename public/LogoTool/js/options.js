$(document).ready(function(){

    setupColorpicker();
    setupOptions();
    validateAndRedraw();
    
    function setupColorpicker(){
        
        var colors = LogoTool.COLORS;
        var $picker = $('#hidden .colorpicker');
        
        for(var i = 0; i < colors.length; i++){
            
            var $swatch = $('<div class="swatch"></div>');
            $swatch
                .css('background-color', colors[i])
                .attr('color', colors[i])
                .attr('onclick', 'LogoTool.colorPicked(event)');
            
            $picker.append($swatch);
        };
    };
    
    function setupOptions(){

        makeNumberPicker('Gap between legs and triangle', 'trianglegap', 20);
        makeNumberPicker('Length of legs', 'leglength', 300);
        makeNumberPicker('Angle between legs', 'legangle', 40);
        makeNumberPicker('Thickness of legs', 'legthickness', 60);
        makeNumberPicker('Gap between legs and shapes', 'shapegap', 75);
        makeNumberPicker('Size of shapes', 'shapesize', 50);
        
        makeOption('Draw arc?', 'drawarc');        
        makeOption('Draw stroke?', 'drawstroke');
        
        makeDropdown('Text', 'text', ['None', 'Arabic', 'English', 'Hebrew', 'Arabic + Hebrew', 'Hebrew + Arabic']);
        
        makeColorPicker('Stroke', 'leg1stroke', LogoTool.COLORS[0]);        
        makeColorPicker('Fill', 'leg1fill', LogoTool.COLORS[0]);            
        makeColorPicker('Gradient', 'leg1gradient', 'transparent');
        
        makeColorPicker('Stroke', 'leg2stroke', LogoTool.COLORS[0]);               
        makeColorPicker('Fill', 'leg2fill', LogoTool.COLORS[0]);           
        makeColorPicker('Gradient', 'leg2gradient', 'transparent');
        
        makeColorPicker('Fill', 'shapefill', LogoTool.COLORS[0]);

        function makeDropdown(text, id, options){
            
            var $new = $('#hidden .dropdown').clone();
            
            for(var i = 0; i < options.length; i++){
                
                var o = options[i];
                var $li = $('<li>', {role: 'presentation'});
                var $a = $('<a>', {
                    role: 'menuitem',
                    tabindex: '-1',
                    href: 'javascript:void(0);',
                }).text(o);
                
                $a.click(function(){
                    
                    var type = $(this).text();
                    $(this).parents('.dropdown').find('.selected').text(type);
                    LogoTool.validateAndRedraw();
                });
                
                $li.append($a);
                $new.find('.dropdown-menu').append($li);
                
                if(i == 0)
                    $new.find('.selected').text(o);
            }
            
            $('#' + id).append($new);            
        };
        
        function makeNumberPicker(text, id, val){
            
            var $new = $('#hidden .number-option').clone();
            
            $new.find('.option-name').text(text);
            $new.find('.spin-up').click(upClicked);
            $new.find('.spin-down').click(downClicked);
            $new.find('input').change(inputChanged).val(val);
            
            $('#' + id).append($new);  
            
            function upClicked(){

                var $target = $(this).parents('.spinner').find('input');
                addVal($target, 1);
            };    

            function downClicked(){

                var $target = $(this).parents('.spinner').find('input');
                addVal($target, -1);
            };

            function addVal($input, toAdd){

                var val =  parseInt($input.val());
                if(isNaN(val))
                    val = 0;

                $input.val(val + toAdd);
                validateAndRedraw();
            };

            function inputChanged(event){

                var val = parseInt($(this).val());

                if(isNaN(val))
                    val = 0;

                $(this).val(val);        

                validateAndRedraw();
            };
        };
        
        function makeOption(text, id){
            
            var $new = $("#hidden .checkbox").clone();
            
            $new.find('.option-name').append(text);
            $new.find('input').change(checked);        
            
            $('#' + id).append($new);  
            
            function checked(){
                
                validateAndRedraw();
            };
        };
        
        function makeColorPicker(text, id, initialColor){
            
            var $new = $('#hidden .color-option').clone();

            $new.find('.option-name').text(text);
            $new.find('.color-button').popover({
                html: true,
                trigger: 'focus',
                content: setContent,
                container: 'body'
            });
            
            $('#' + id)
                .append($new)
                .data('color', initialColor)
                .find('button').css('background-color', initialColor); 
            
            function setContent(a){
                
                var $picker = $('<div>').append($('#hidden .colorpicker').attr('target', id).clone())
                
                return $picker.html();
            }
        };    
    };
    
    function validateAndRedraw(){
        
        LogoTool.validateAndRedraw();
    };
});

LogoTool.validateAndRedraw = function(){
    
    var options = {
        trianglegap: parseInt($('#trianglegap input').val()),
        leglength: parseInt($('#leglength input').val()),
        angle: parseInt($('#legangle input').val()),
        legthickness: parseInt($('#legthickness input').val()),
        shapegap: parseInt($('#shapegap input').val()),
        shapesize: parseInt($('#shapesize input').val()),
        drawarc: $('#drawarc input').is(':checked'),
        drawstroke: $('#drawstroke input').is(':checked'),
        
        legcolor1: $('#leg1stroke').data('color'),
        legfill1: $('#leg1fill').data('color'),
        leggradient1: $('#leg1gradient').data('color'),
        
        legcolor2: $('#leg2stroke').data('color'),
        legfill2: $('#leg2fill').data('color'),
        leggradient2: $('#leg2gradient').data('color'),
        
        shapefill: $('#shapefill').data('color'),
        
        text: $('#text .selected').text()
    };

    // Minimum and maximum settings.
    if(options.angle <= 1){            
        $('#legangle input').val(1)
        options.angle = 1;
    }
    else if(options.angle >= 165){
        $('#legangle input').val(165)
        options.angle = 165
    }

    LogoTool.draw(options);
}

LogoTool.colorPicked = function(e){

    var $button= $(e.target);
    var $target = $('#' + $button.parents('.colorpicker').attr('target'));
    var color = $button.attr('color');
    
    $target.data('color', color).find('button').css('background-color', color);
    LogoTool.validateAndRedraw();
};