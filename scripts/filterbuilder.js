function addRow()
{    
    var newLi = '<li>' +
                        '<div class=\"AddRemove\">' +
                            '<a class=\"Add\" href=\"\">+</a>' +
                            '<a class=\"Remove\" href=\"\">-</a>' +
                        '</div>' +
                        '<div class=\"Query\">' +
                            '<select>' +
                                '<optgroup label=\"Logic Operator\">' +
                                    '<option>and</option>' +
                                    '<option>or</option>' +
                                '</optgroup>' +
                                '<optgroup id=\"PropertyGroup\" label=\"Property\">' +
                                    '<option>Artist</option>' +
                                '</optgroup>' +
                            '</select>' +
                            '<select><option>starts with</option></select>' +
                            '<input type=\"text\" placeholder=\"barrage\"/>' +
                        '</div>' +
                    '</li>';

    $("#Filters ul").prepend(newLi);        
}

var FilterBuilder = function() {    
    this.filterbuild = function()
    {            
        console.log("filter build is called");
        $('.Add').live("click", function() {
            console.log("add the freaking rows");
            addRow(); 
            var mapBuilder = new MapBuilder();
            mapBuilder.build();
            return false;
        });

        $('.Remove').live("click", function() {
            $(this).parent().parent().remove();            
            return false;
        });
    }
}



