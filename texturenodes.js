function createNode(nodeType, x = 0, y = 0) {
    let nodeBase = document.createElement("div");
    nodeBase.classList.add("nodeBase");
	
	let inputElem = document.createElement("div");
    inputElem.classList.add("nodeIOContainer");
	
	let nodeElem = document.createElement("div");
    nodeElem.classList.add("node");
	
	let outputElem = document.createElement("div");
    outputElem.classList.add("nodeIOContainer");
	
	for(let i = 0; i < nodeType.inputs.length; i++) {
		let input = document.createElement("div");
		input.classList.add("input");
		
		input.style.backgroundColor = colors[nodeType.inputs[i][1]];
		
		let circle = document.createElement("span");
		circle.classList.add("circle");
		
		input.appendChild(circle);
		
		let inputName = document.createElement("div");
		inputName.classList.add("ioName");
		
		inputName.innerHTML = nodeType.inputs[i][0];
		
		input.appendChild(inputName);
		
		input.onclick = function() {
			if(linkingStart != null) {
				let outType = getOutType(linkingStart);
				if(outType == nodeType.inputs[i][1] || (outType == "float" && nodeType.inputs[i][1] == "int")) {
					createConnection(linkingStart, circle);
					linkingStart = null;
					updateLines([]);
				}
			}
			else {
				unlinkAll(circle);
			}
		};
		
		inputElem.appendChild(input);
	}
	
	for(let i = 0; i < nodeType.outputs.length; i++) {
		let output = document.createElement("div");
		output.classList.add("output");
		
		output.style.backgroundColor = colors[nodeType.outputs[i][1]];
		
		let outputName = document.createElement("div");
		outputName.classList.add("ioName");
		
		outputName.innerHTML = nodeType.outputs[i][0];
		
		output.appendChild(outputName);
		
		let circle = document.createElement("span");
		circle.classList.add("circle");
		
		output.appendChild(circle);
		
		output.onclick = function() {
			if(linkingStart == circle) {
				linkingStart = null;
				updateLines([]);
			}
			else
				linkingStart = circle;
		};
		
		outputElem.appendChild(output);
		
		
	}

    let titleElem = document.createElement("div");
    titleElem.classList.add("nodeTitle");

    let titleTextElem = document.createElement("div");
    titleTextElem.innerHTML = nodeType.name;
    titleTextElem.classList.add("nodeTitleText");
    titleElem.appendChild(titleTextElem);

    let titleTextEditElem = document.createElement("input");
    titleTextEditElem.value = nodeType.name;
    titleTextEditElem.classList.add("textedit");
    titleElem.appendChild(titleTextEditElem);
    titleTextEditElem.style.display = "none";

    nodeElem.appendChild(titleElem);

    let contents = document.createElement("div");
    contents.classList.add("nodeContents");

    titleElem.addEventListener("mousedown", function(e) {
        dragElement = {
            element: nodeBase,
            x: e.offsetX,
            y: e.offsetY
        };
    });
	

    titleElem.addEventListener("dblclick", function(e) {
        titleTextElem.style.display = "none";
        titleTextEditElem.style.display = "block";
        titleTextEditElem.addEventListener("focusout", function(e) {
            titleTextElem.style.display = "block";
            titleTextEditElem.style.display = "none";
            titleTextElem.innerHTML = titleTextEditElem.value;
        });
    });

    let textureElem = document.createElement("canvas");
    textureElem.classList.add("texturePreview");
    textureElem.width = 64;
    textureElem.height = 64;
    let context = textureElem.getContext('2d');
    contents.appendChild(textureElem);

    let node = {
        texture: textureElem,
        context: textureElem.getContext('2d'),
        calculate: nodeType.method,
		inputs: inputElem,
		outputs: outputElem,
        nodeElem: nodeBase,
		outputDatas: [],
		base: nodeType
    };

    let generateButtonElem = document.createElement("button");
    generateButtonElem.innerHTML = "GENERATE";
    generateButtonElem.onclick = function() {
        nodeType.method(node);
    };
    contents.appendChild(generateButtonElem);

    nodeElem.appendChild(contents);

    nodeBase.oncontextmenu = function(e) {
        if (nodeContextMenu.style.display == "block") {
            nodeContextMenu.style.display = "none";
        } else {
            selectedNode = node;
            nodeContextMenu.style.display = "block";
            nodeContextMenu.style.left = e.clientX;
            nodeContextMenu.style.top = e.clientY;
        }
    }
	
    nodeBase.style.left = x;
    nodeBase.style.top = y;
   
    nodeBase.appendChild(inputElem);
    nodeBase.appendChild(nodeElem);
    nodeBase.appendChild(outputElem);
	
    document.body.appendChild(nodeBase);

    nodeType.method(node);

    nodes.push(node);

    return node;
}

function createValueNode(x = 0, y = 0) {
	let nodeBase = document.createElement("div");
    nodeBase.classList.add("valueNodeBase");
	
	let nodeElem = document.createElement("div");
    nodeElem.classList.add("valueNode");
	
	let outputElem = document.createElement("div");
    outputElem.classList.add("nodeIOContainer");
	
	let output = document.createElement("div");
	output.classList.add("output");
	
	output.style.backgroundColor = colors["float"];
	
	let outputName = document.createElement("div");
	outputName.classList.add("ioName");
	
	outputName.innerHTML = "out";
	
	output.appendChild(outputName);
	
	let circle = document.createElement("span");
	circle.classList.add("circle");
	
	output.appendChild(circle);
	
	output.onclick = function() {
		if(linkingStart == circle) {
			linkingStart = null;
			updateLines([]);
		}
		else
			linkingStart = circle;
	};
	
	outputElem.appendChild(output);

    let titleElem = document.createElement("div");
    titleElem.classList.add("nodeTitle");

    let titleTextElem = document.createElement("div");
    titleTextElem.innerHTML = "Number";
    titleTextElem.classList.add("nodeTitleText");
    titleElem.appendChild(titleTextElem);

    let titleTextEditElem = document.createElement("input");
    titleTextEditElem.value = "Number";
    titleTextEditElem.classList.add("textedit");
    titleElem.appendChild(titleTextEditElem);
    titleTextEditElem.style.display = "none";

    nodeElem.appendChild(titleElem);

    let contents = document.createElement("div");
    contents.classList.add("nodeContents");

    titleElem.addEventListener("mousedown", function(e) {
        dragElement = {
            element: nodeBase,
            x: e.offsetX,
            y: e.offsetY
        };
    });
	

    titleElem.addEventListener("dblclick", function(e) {
        titleTextElem.style.display = "none";
        titleTextEditElem.style.display = "block";
        titleTextEditElem.addEventListener("focusout", function(e) {
            titleTextElem.style.display = "block";
            titleTextEditElem.style.display = "none";
            titleTextElem.innerHTML = titleTextEditElem.value;
        });
    });
	
	let node = {
		outputs: outputElem,
        nodeElem: nodeBase,
		outputDatas: [0],
		base: {name: "Value", outputs: [[, "float"]]}
    };
	
	let editNum = document.createElement("input");
    editNum.value = "0";
    editNum.classList.add("textedit");
	editNum.addEventListener("focusout", function(e) {
            node.outputDatas[0] = parseFloat(editNum.value);
    });
	
	nodeElem.appendChild(editNum);

    nodeBase.oncontextmenu = function(e) {
        if (nodeContextMenu.style.display == "block") {
            nodeContextMenu.style.display = "none";
        } else {
            selectedNode = node;
            nodeContextMenu.style.display = "block";
            nodeContextMenu.style.left = e.clientX;
            nodeContextMenu.style.top = e.clientY;
        }
    }
	
    nodeBase.style.left = x;
    nodeBase.style.top = y;
	
    nodeBase.appendChild(nodeElem);
    nodeBase.appendChild(outputElem);
	
    document.body.appendChild(nodeBase);

    nodes.push(node);

    return node;
}

function getOutType(circle) {
	for(let i = 0; i < nodes.length; i++) {
		for(let j = 0; j < nodes[i].outputs.getElementsByClassName("output").length; j++) {
			if(circle.parentElement == nodes[i].outputs.getElementsByClassName("output")[j]) {
				return nodes[i].base.outputs[j][1];
			}
		}
	}
	return null;
}

function getOutFromInElem(elem) {
	let out = "";
	for(let i = 0; i < connections.length; i++) {
		if(connections[i].end.parentElement == elem) {
			out = connections[i].start.parentElement;
		}
	}
	for(let i = 0; i < nodes.length; i++) {
		for(let j = 0; j < nodes[i].outputs.getElementsByClassName("output").length; j++) {
			if(out == nodes[i].outputs.getElementsByClassName("output")[j]) {
				return nodes[i].outputDatas[j];
			}
		}
	}
	return null;
}

function createConnection(start, end)
{
	let toRem = [];
	for(let i = 0; i < connections.length; i++) {
		if(connections[i].end == end) 
			toRem.push(i);
	}
	for(let i = toRem.length - 1; i > -1; i--) {
		connections.splice(toRem[i], 1);
	}
    connections.push (
        {
            start: start,
            end: end
        }
    );
}

function unlinkAll(elem) {
	let toRem = [];
	for (let i = 0; i < connections.length; i++) {
		if(connections[i].end == elem) {
			toRem.push(i);
		}
	}
	for(let i = toRem.length - 1; i > -1; i--) {
		connections.splice(toRem[i], 1);
	}
	updateLines([]);
}

function updateLines(add)
{
    svg.innerHTML = '';
    for (let i = 0; i < connections.length; i++) 
    {
        let newLine = document.createElementNS(svgNS, "line");
        newLine.setAttribute("x1", cumulativeOffset(connections[i].start).left + 8);
        newLine.setAttribute("y1", cumulativeOffset(connections[i].start).top);
        newLine.setAttribute("x2", cumulativeOffset(connections[i].end).left - 8);
        newLine.setAttribute("y2", cumulativeOffset(connections[i].end).top);
        newLine.style="stroke:rgb(0,0,0);stroke-width:2";
        svg.appendChild(newLine);
    }

	if(add.length == 2) {
		let newLine = document.createElementNS(svgNS, "line");
        newLine.setAttribute("x1", cumulativeOffset(add[0]).left + 8);
        newLine.setAttribute("y1", cumulativeOffset(add[0]).top);
        newLine.setAttribute("x2", add[1].clientX);
        newLine.setAttribute("y2", add[1].clientY);
        newLine.style="stroke:rgb(0,0,0);stroke-width:2";
        svg.appendChild(newLine);
	}
}

function cumulativeOffset(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};

let dragElement = null;
let svg = null;
let svgNS = null;
let connections = [];
let nodes = [];
let contextMenu;
let nodeContextMenu;
let nodeCreateMenu;
let nodeListMenu;
let selectedNode = null;
let linkingStart = null;

window.onload = function() {

    contextMenu = document.getElementById("contextmenu");
    nodeContextMenu = document.getElementById("nodecontextmenu");
    document.body.oncontextmenu = function(e) {
        return false;
    }

    dragElement = null;
	
    nodeListMenu = document.createElement('div');
    nodeListMenu.classList.add('contextmenu');

    nodeCreateMenu = document.createElement('div');
    nodeCreateMenu.classList.add('contextmenu');
    let ul = document.createElement('ul');
    for (let i = 0; i < nodeDefinitions.length; i++) {
        let li = document.createElement('li');
        li.onclick = function() {
            createNode(nodeDefinitions[i], nodeCreateMenu.offsetLeft, nodeCreateMenu.offsetTop);

            nodeCreateMenu.style.display = "none";
        };
        li.innerHTML = nodeDefinitions[i].name;
        ul.appendChild(li);
    }
	let li = document.createElement('li');
	li.onclick = function() {
		createValueNode(nodeCreateMenu.offsetLeft, nodeCreateMenu.offsetTop);

		nodeCreateMenu.style.display = "none";
	};
	li.innerHTML = "Value node";
	ul.appendChild(li);
    nodeCreateMenu.appendChild(ul);
    nodeCreateMenu.style.display = "none";
    this.document.body.appendChild(nodeCreateMenu);


    svg = document.getElementById("nodesvg");
    svgNS = 'http://www.w3.org/2000/svg';

    svg.oncontextmenu = function(e) {
        if (contextMenu.style.display == "block") {
            contextMenu.style.display = "none";
        } else {
            contextMenu.style.display = "block";
            contextMenu.style.left = e.clientX;
            contextMenu.style.top = e.clientY;
        }
        return false;
    }

    window.addEventListener("mouseup", function(e) {
        dragElement = null;

        if (contextMenu.style.display == "block") {
            if (e.clientX > contextMenu.offsetLeft && e.clientX < contextMenu.offsetLeft + contextMenu.clientWidth && e.clientY > contextMenu.offsetTop && e.clientY < contextMenu.offsetTop + contextMenu.clientHeight) {

            } else {
                contextMenu.style.display = "none";
            }
        }

        if (nodeContextMenu.style.display == "block") {
            if (e.clientX > nodeContextMenu.offsetLeft && e.clientX < nodeContextMenu.offsetLeft + nodeContextMenu.clientWidth && e.clientY > nodeContextMenu.offsetTop && e.clientY < nodeContextMenu.offsetTop + nodeContextMenu.clientHeight) {

            } else {
                nodeContextMenu.style.display = "none";
            }
        }

        if (nodeCreateMenu.style.display == "block") {
            if (e.clientX > nodeCreateMenu.offsetLeft && e.clientX < nodeCreateMenu.offsetLeft + nodeCreateMenu.clientWidth && e.clientY > nodeCreateMenu.offsetTop && e.clientY < nodeCreateMenu.offsetTop + nodeCreateMenu.clientHeight) {

            } else {
                nodeCreateMenu.style.display = "none";
            }
        }
		
		if (nodeListMenu.style.display == "block") {
            if (e.clientX > nodeListMenu.offsetLeft && e.clientX < nodeListMenu.offsetLeft + nodeListMenu.clientWidth && e.clientY > nodeListMenu.offsetTop && e.clientY < nodeListMenu.offsetTop + nodeListMenu.clientHeight) {

            } else {
                nodeListMenu.style.display = "none";
            }
        }
    });

    document.getElementById("contextMenuCreateNode").addEventListener("click", function(e) {
        console.log("Create Node!");
        //createNode("New Node", greyscaleNoise, contextMenu.offsetLeft, contextMenu.offsetTop);
        nodeCreateMenu.style.left = e.clientX;
        nodeCreateMenu.style.top = e.clientY;
        nodeCreateMenu.style.display = "block";
        contextMenu.style.display = "none";
    });

    document.getElementById("contextMenuShowNodes").addEventListener("click", function(e) {
        console.log("Showing Nodes!");
		if(nodeListMenu.childElementCount > 0)
			nodeListMenu.removeChild(nodeListMenu.childNodes[0]);
		let ul = document.createElement('ul');
		for (let i = 0; i < nodes.length; i++) {
			let li = document.createElement('li');
			li.addEventListener("mouseover", function(e) {
				if(nodes[i].base.name == "Value") {
					nodes[i].nodeElem.getElementsByClassName("valueNode")[0].style.borderColor = "yellow";
				}
				else {
					nodes[i].nodeElem.getElementsByClassName("node")[0].style.borderColor = "yellow";
				}
			});
			li.addEventListener("mouseout", function(e) {
				if(nodes[i].base.name == "Value") {
					nodes[i].nodeElem.getElementsByClassName("valueNode")[0].style.borderColor = "black";
				}
				else {
					nodes[i].nodeElem.getElementsByClassName("node")[0].style.borderColor = "black";
				}
			});
			if(nodes[i].base.name == "Value") {
				li.innerHTML = nodes[i].nodeElem.getElementsByClassName("valueNode")[0].getElementsByClassName("nodeTitle")[0].getElementsByClassName("nodeTitleText")[0].innerHTML;
			}
			else {
				li.innerHTML = nodes[i].nodeElem.getElementsByClassName("node")[0].getElementsByClassName("nodeTitle")[0].getElementsByClassName("nodeTitleText")[0].innerHTML;
			}
			ul.appendChild(li);
		}
		nodeListMenu.appendChild(ul);
		nodeListMenu.style.left = e.clientX;
        nodeListMenu.style.top = e.clientY;
        nodeListMenu.style.display = "block";
		document.body.appendChild(nodeListMenu);
        contextMenu.style.display = "none";
    });

    document.getElementById("contextMenuCopyright").addEventListener("click", function(e) {
        console.log("Copyright!");
    });

    document.getElementById("contextMenuDeleteNode").addEventListener("click", function(e) {
        console.log("Delete!");
        const index = nodes.indexOf(selectedNode);
        if (index > -1) {
            nodes.splice(index, 1);
        }
        document.body.removeChild(selectedNode.nodeElem);
		unlinkAll(selectedNode);
        nodeContextMenu.style.display = "none";
    });

    window.addEventListener("mousemove", function(e) {
        
        if (dragElement != null && document.activeElement == document.body) {
            dragElement.element.style.left = e.clientX - dragElement.x;
            dragElement.element.style.top = e.clientY - dragElement.y;

            updateLines([]);
        }
		
		if(linkingStart != null) {
			updateLines([linkingStart, e]);
		}
    });

}