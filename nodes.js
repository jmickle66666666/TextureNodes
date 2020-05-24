function nodeToInputs(node) {
	inputs = [];
	for(let i = 0; i < node.inputs.getElementsByClassName("input").length; i++) {
		inputs[i] = getOutFromInElem(node.inputs.getElementsByClassName("input")[i]);
	}
	return inputs;
}

let greyScaleNoise = {
	name: "Grayscale noise",
	method: function(node)
	{
		let imageData = node.context.createImageData(64, 64);
		let data = imageData.data;
		for (let i = 0; i < data.length; i+=4) {
			let r = Math.floor(Math.random() * 256);
			data[i + 0] = r;
			data[i + 1] = r;
			data[i + 2] = r;
			data[i + 3] = 255;
		}
		node.context.putImageData(imageData, 0, 0);
		node.outputDatas[0] = data;
	},
	inputs: [],
	outputs: [["out", "image"]]
}

let colorNoise = {
	name: "Color noise",
	method: function(node)
	{
		let imageData = node.context.createImageData(64, 64);
		let data = imageData.data;
		for (let i = 0; i < data.length; i+=4) {
			data[i + 0] = Math.floor(Math.random() * 256);
			data[i + 1] = Math.floor(Math.random() * 256);
			data[i + 2] = Math.floor(Math.random() * 256);
			data[i + 3] = 255;
		}
		node.context.putImageData(imageData, 0, 0);
		node.outputDatas[0] = data;
	},
	inputs: [],
	outputs: [["out", "image"]]
}

let randomColor = {
	name: "Random color",
	method: function(node)
	{
		node.texture.width = 1;
		node.texture.height = 1;
		let imageData = node.context.createImageData(1, 1);
		let data = imageData.data;
		data[0] = Math.floor(Math.random() * 256);
		data[1] = Math.floor(Math.random() * 256);
		data[2] = Math.floor(Math.random() * 256);
		data[3] = 255;
		node.context.putImageData(imageData, 0, 0);
		node.outputDatas[0] = [data[0], data[1], data[2]];
		node.outputDatas[1] = [data[0]];
		node.outputDatas[2] = [data[1]];
		node.outputDatas[3] = [data[2]];
	},
	inputs: [],
	outputs: [["out", "float3"], ["r", "float"], ["g", "float"], ["b", "float"]]
}

let invertColor = {
	name: "Invert color",
	method: function(node)
	{
		let inputs = nodeToInputs(node);
		node.texture.width = 1;
		node.texture.height = 1;
		let imageData = node.context.createImageData(1, 1);
		let data = imageData.data;
		if(inputs.length == 1 && inputs[0] != null) {
			for(let i = 0; i < 3; i++) {
				data[i] = 255 - inputs[0][i];
			}
		}
		else {
			for(let i = 0; i < 3; i++) {
				data[i] = 0;
			}
		}
		data[3] = 255;
		node.context.putImageData(imageData, 0, 0);
		node.outputDatas[0] = [data[0], data[1], data[2]];
		node.outputDatas[1] = [data[0]];
		node.outputDatas[2] = [data[1]];
		node.outputDatas[3] = [data[2]];
	},
	inputs: [["in", "float3"]],
	outputs: [["out", "float3"], ["r", "float"], ["g", "float"], ["b", "float"]]
}

let colorByRGB = {
	name: "Color by RGB",
	method: function(node)
	{
		let inputs = nodeToInputs(node);
		node.texture.width = 1;
		node.texture.height = 1;
		let imageData = node.context.createImageData(1, 1);
		let data = imageData.data;
		if(inputs.length == 3) {
			for(let i = 0; i < 3; i++) {
				data[i] = inputs[i] == null ? 0 : Math.round(inputs[i]);
			}
		}
		data[3] = 255;
		node.context.putImageData(imageData, 0, 0);
		node.outputDatas[0] = [data[0], data[1], data[2]];
	},
	inputs: [["r", "int"], ["g", "int"], ["b", "int"]],
	outputs: [["out", "float3"]]
}

let monochrome = {
	name: "Shades of gray",
	method: function(node)
	{
		let inputs = nodeToInputs(node);
		node.texture.width = 1;
		node.texture.height = 1;
		let imageData = node.context.createImageData(1, 1);
		let data = imageData.data;
		if(inputs.length == 1) {
			for(let i = 0; i < 3; i++) {
				data[i] = inputs[0] == null ? 0 : Math.round(inputs[0]);
			}
		}
		data[3] = 255;
		node.context.putImageData(imageData, 0, 0);
		node.outputDatas[0] = [data[0], data[1], data[2]];
	},
	inputs: [["rgb", "int"]],
	outputs: [["out", "float3"]]
}

let colors = {
	"int": "light_blue",
	"float": "red",
	"float3": "pink",
	"image": "blue"
}

let nodeDefinitions = [
	invertColor,
	colorByRGB,
	monochrome,
    greyScaleNoise,
    colorNoise,
    randomColor
];