let nodeDefinitions = [
    greyscaleNoise,
    colorNoise,
    randomColor
];

function greyscaleNoise(node)
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
}

function colorNoise(node)
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
}

function randomColor(node)
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
}