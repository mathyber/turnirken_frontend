import * as SRD from "storm-react-diagrams";

//1) setup the diagram engine
var engine = new SRD.DiagramEngine();
engine.installDefaultFactories();

//2) setup the diagram model
var model = new SRD.DiagramModel();

//3-A) create a default node
var node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
let port1 = node1.addOutPort("Out");
node1.setPosition(100, 100);

//3-B) create another default node
var node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
let port2 = node2.addInPort("In");
node2.setPosition(400, 100);

// link the ports
let link1 = port1.link(port2);
link1.addLabel("Hello World!");

//4) add the models to the root graph
model.addAll(node1, node2, link1);

//5) load model into engine
engine.setDiagramModel(model);

const initialEngine = engine;

export default function (state = engine, action) {
    return state;
}