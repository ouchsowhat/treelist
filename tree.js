$(document).ready(function() {
	var showlist = $("<ul></ul>");
	traversalTree(treeData, showlist, 0, "list-item"); //遍历树节点
	$("#tree").append(showlist);

	$('#tree li:has(ul)').addClass('parent_li');
	$('#tree li.parent_li > span').on('click', function(e) {
		var children = $(this).parent('li.parent_li').find(' > ul > li');
		if (children.is(":visible")) {
			children.hide('fast');
			$(this).find(' > i').addClass('glyphicon-plus').removeClass('glyphicon-minus');
		} else {
			children.show('fast');
			$(this).find(' > i').addClass('glyphicon-minus').removeClass('glyphicon-plus');
		}
		e.stopPropagation();
	});
})

//遍历树节点，参数1：树的data；参数2：子树菜单的父DOM；
//参数3：子树菜单的右偏移量，每下一级+20；参数4：子树的折叠状态，默认除一级节点之外的子节点全部折叠
function traversalTree(jsontree, parent, offset, display) {
	var paddingleft = offset + 20;
	for (var item in jsontree) {
		//如果有子节点，则遍历该子节点
		if (jsontree[item].nodes.length > 0) {
			//创建一个子节点li
			var li = $("<li style='display:" + display + "'></li>");
			var html = "<span class='list-group-item'><i class='glyphicon glyphicon-plus' style='padding-left:" + offset + "px;margin-right: 10px;color: #666;font-size: 12px'></i>" + jsontree[item].text + "</span>"
				//将li的文本设置好，并马上添加一个空白的ul子节点，并且将这个li添加到父亲节点中
			$(li).append(html).append("<ul></ul>").appendTo(parent);
			//将空白的ul作为下一个递归遍历的父亲节点传入
			traversalTree(jsontree[item].nodes, $(li).children().eq(1), paddingleft, "none");
		}
		//如果该节点没有子节点，则直接将该节点li以及文本创建好直接添加到父亲节点中
		else if (jsontree[item].nodes.length == 0) {
			var li = $("<li style='display:" + display + "'></li>");
			var html = "<span class='list-group-item'>" + "<input type='checkbox' onclick='ischecked(this)' style='margin-left:" + offset + "px' value= '" + jsontree[item].layer + "' > " + "<a onclick='itemclicked(this)' href='#' table='" + jsontree[item].table + "'>" + jsontree[item].text + "</a></span>"
			$(li).append(html).appendTo(parent);
		} else {}
	}
}

//checkbox被点击
function ischecked(checkbox) {
	if (checkbox.checked) {
		alert(checkbox.value);
	}
}
//<a>标签被点击
function itemclicked(item) {
	alert($(item).attr('table'));
}

var treeData = [{
	text: "城市道路交通",
	nodes: [{
		text: "城市道路网",
		nodes: [{
			text: "道路中心线",
			nodes: [{
				text: "现状",
				layer: "道路中心线",
				table: "城市道路",
				nodes: []
			}, {
				text: "总规",
				nodes: []
			}, {
				text: "控规",
				nodes: []
			}]
		}, {
			text: "道路红线",
			nodes: []
		}]
	}, {
		text: "one_2",
		nodes: []
	}]
}, {
	text: "two",
	nodes: []
}];