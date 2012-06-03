var type = {}; //used to store mapping info

var mappingCallback = function(jsonData)
{
	console.log("Properties = " + jsonData);
	    
    var filterElement = document.getElementById("PropertyGroup");    

    console.log("filer element = " + filterElement);
	
    //index, e.g. big-data
    for(var i in jsonData)
    {
        //addOption(indexElement, i, i);

        //type, e.g. magic-cards
        for(var t in jsonData[i])
        {
            //assuming each property does not contain additional properties, else need recursion
            //addOption(filterElement, t, t);

            if(jsonData[i][t].properties)
            {
                var terms  = scanProperties(jsonData[i][t]);
                type[t] = terms;
            }
        }
    }

    var selectedType = "magic-cards";
    for(var term in type[selectedType])
    {
    	//console.log("term = " + type[selectedType][term]);
        addOption(filterElement, type[selectedType][term], type[selectedType][term]);
    }    
}

function addOption(selectBox, value, text)
{
    var opt = document.createElement("option");
    opt.value = value;
    opt.text = text;
    selectBox.appendChild(opt);
}

//retrieves all the 'terms' for each type, e.g. the terms for magic-cards could be "name, cost...etc"
function scanProperties(obj)
{
    var term = [];
    for(var prop in obj.properties)
    {
        term.push(prop);
    }

    return term;   //return all properties
}

var MapBuilder = function() {

	this.build = function()
	{
	    var url = "http://localhost:9200/_mapping";

	    $.ajax({
	        type: "GET",
	        url: url,
	        data: "",
	        dataType: "json",
	        success: function(data)
	        {	        		            
	            mappingCallback(data);
	        },
	        error: function(error)
	        {
	        	console.log("huge fail")
	            //callback(error);
	        }
	    });
		
	}

}

