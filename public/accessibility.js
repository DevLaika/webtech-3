document.addEventListener("DOMContentLoaded", function (event) {
	document.getElementById("textbtn").addEventListener("click", changeText);

	let select = document.getElementById("elementchange");

	let list = ["body", "header", "main", "article", "section", "aside", "footer"];
	let elements = [];

	list.forEach(tagName => {
		collection = document.getElementsByTagName(tagName);
		for (element of collection) {

			let option = document.createElement("option");
			option.appendChild(document.createTextNode(element.tagName));
			option.value = elements.push(element) - 1;
			select.appendChild(option);
		}
	});

	function changeText() {
		var p = document.getElementById("elementchange").value;
		console.log(p);
		var x = elements[p];
		console.log(x);
		var y = document.getElementById("colorpicker").value;
		var size = document.getElementById("sizechange").value;

		x.style.color = y;
		x.style.fontSize = size;

	}

});
