function createNode(name, x = 0, y = 0) {
    let elem = document.createElement("div");
    elem.classList.add("node");

    let titleElem = document.createElement("div");
    titleElem.classList.add("nodeTitle");

    let titleTextElem = document.createElement("div");
    titleTextElem.innerHTML = name;
    titleTextElem.classList.add("nodeTitleText");
    titleElem.appendChild(titleTextElem);

    let titleTextEditElem = document.createElement("input");
    titleTextEditElem.value = name;
    titleTextEditElem.classList.add("textedit");
    titleElem.appendChild(titleTextEditElem);
    titleTextEditElem.style.display = "none";

    elem.appendChild(titleElem);

    let contents = document.createElement("div");
    contents.classList.add("nodeContents");
    elem.appendChild(contents);

    titleElem.addEventListener("mousedown", function(e) {
        dragElement = {
            element: elem,
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

    elem.style.left = x;
    elem.style.top = y;
   
    document.body.appendChild(elem);

    let textureElem = document.createElement("canvas");
    textureElem.classList.add("texturePreview");
    textureElem.width = 64;
    textureElem.height = 64;
    noise(textureElem.getContext('2d'));
    contents.appendChild(textureElem);

    
    let node = {
        layers: [],
        elem: elem
    };

    elem.oncontextmenu = function(e) {
        if (nodeContextMenu.style.display == "block") {
            nodeContextMenu.style.display = "none";
        } else {
            selectedNode = node;
            nodeContextMenu.style.display = "block";
            nodeContextMenu.style.left = e.clientX;
            nodeContextMenu.style.top = e.clientY;
        }
    }

    nodes.push(node);

    return node;
}

function noise(context)
{
    let imageData = context.createImageData(64, 64);
    let data = imageData.data;
    for (let i = 0; i < data.length; i+=4) {
        let r = Math.floor(Math.random() * 256);
        data[i + 0] = r;
        data[i + 1] = r;
        data[i + 2] = r;
        data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
}

function createConnection(start, end)
{
    connections.push (
        {
            start: start,
            end: end
        }
    );
}

function updateLines()
{
    svg.innerHTML = '';
    for (let i = 0; i < connections.length; i++) 
    {
        let newLine = document.createElementNS(svgNS, "line");
        newLine.setAttribute("x1", connections[i].start.offsetLeft + connections[i].start.clientWidth);
        newLine.setAttribute("y1", connections[i].start.offsetTop + connections[i].start.clientHeight/2);
        newLine.setAttribute("x2", connections[i].end.offsetLeft);
        newLine.setAttribute("y2", connections[i].end.offsetTop + connections[i].end.clientHeight/2);
        newLine.style="stroke:rgb(0,0,0);stroke-width:2";
        svg.appendChild(newLine);
    }

}

let dragElement = null;
let svg = null;
let svgNS = null;
let connections = [];
let nodes = [];
let contextMenu;
let nodeContextMenu;
let selectedNode = null;

window.onload = function() {

    contextMenu = document.getElementById("contextmenu");
    nodeContextMenu = document.getElementById("nodecontextmenu");
    document.body.oncontextmenu = function(e) {
        return false;
    }

    dragElement = null;


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
    });

    document.getElementById("contextMenuCreateNode").addEventListener("click", function(e) {
        console.log("Create Node!");
        createNode("New Node", contextMenu.offsetLeft, contextMenu.offsetTop);
        contextMenu.style.display = "none";
    });

    document.getElementById("contextMenuDoSomethingElse").addEventListener("click", function(e) {
        console.log("DoSomething Else!");
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
        document.body.removeChild(selectedNode.elem);
        nodeContextMenu.style.display = "none";
    });

    window.addEventListener("mousemove", function(e) {
        
        if (dragElement != null && document.activeElement == document.body) {
            dragElement.element.style.left = e.clientX - dragElement.x;
            dragElement.element.style.top = e.clientY - dragElement.y;

            updateLines();
        }
    });

    this.createConnection(
        this.createNode("hello", 100, 100).elem,
        this.createNode("hello2", 300, 150).elem
    );

    this.updateLines();

}