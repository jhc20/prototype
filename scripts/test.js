$(function() {
	var filterBuilder = new FilterBuilder();
	filterBuilder.filterbuild();

	var mapBuilder = new MapBuilder();
	mapBuilder.build();

	$(".SelectableContainer .Item").on("click", function() {
		var scope = null, node = $(this);
		while (!scope && (node = node.parent()) && node.length > 0)
			scope = node.data("selection-scope");
		$(".SelectableContainer[data-selection-scope="+scope+"] li").removeClass("Selected");

		var selectable = $(this);
		while (selectable.length > 0 && (!selectable.is("li"))) //selectable.parent()
			selectable = selectable.parent();

		selectable.addClass("Selected");
		return false;
	})


	$(".VisibilityModifier").on("click", function() {
		var target = $(this).data("target");

		if (target) {
			target = $(target);
		}
		else {
			var target = $(this);
			while (target.length > 0 && (!target.is("li"))) //selectable.parent()
				target = target.parent();
		}

		if (target.hasClass("Opened"))
			target.removeClass("Opened")
		else
			target.addClass("Opened")

		return false;
	})

	function doSearch() {
		var searchWord = $("#Search input[type=search]").val();

		var qb = new QueryBuilder();

		//qb.range_builder("cost", "from", 1, "to", 3);
		//qb.range_builder("cost", "from", 1, "to", 2);  
		qb.prefix_builder("name", searchWord);

		var json_data = qb.build(0, 30);

		// make it preety
		var json_str = JSON.stringify(json_data, null, '  ')    
		console.log("Final search word = " + json_str);

		$.ajax({
			url: "http://localhost:9200/big-data/magic-cards/_search",
			/*contentType: 'application/json',*/
			type: "POST",
			dataType: "json",
			data: json_str,
			processData: false,
			success: function(data) {
				var cf = $(".Coverflow"), grid = $(".Grid tbody");
				cf.empty(); grid.empty();
				console.log(data)			
				data.hits.hits.forEach(function(result, i, list) {
					var obj = result._source;
					var item1 = $('<li><a href=""><img src="'+obj.icon+'" alt=""/></a></li>').appendTo(cf)
					var item2 = $('<tr><td>'+obj.name+'</td><td>'+obj.set+'</td><td>'+obj.type+'</td></tr>').appendTo(grid)
					if (Math.floor(list.length / 2) === i) {
						item1.addClass("Selected");
						item2.addClass("Selected");
					}
				})
			}
		})
	}

	$("#Search input[type=search]").on("input", function() {
		doSearch()
	})

	doSearch()
})
