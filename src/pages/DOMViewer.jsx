function renderDom(node, level = 0) {
    if (!node) return null;

    const indent = " ".repeat(level * 2); 
    let output = `${indent}<${node.tag}>`;

    if (node.text) {
        output += " " + node.text;
    }

    if (node.children && node.children.length > 0) {
        output += "\n";
        node.children.forEach((child) => {
            output += renderDom(child, level + 1) + "\n";
        });
        output += `${indent}</${node.tag}>`;
    } else {
        output += `</${node.tag}>`;
    }

    return output;
}

function DOMViewer({ dom }) {
    if (!dom) return <p className="text-gray-500">No DOM parsed yet.</p>;

    return (
        <div className="bg-black text-green-400 rounded p-4 font-mono text-sm overflow-x-auto max-h-[500px]">
      <pre>
        <code>{renderDom(dom)}</code>
      </pre>
        </div>
    );
}

export default DOMViewer;
