export default function toTournamentGrid(model){

    let users = [];
    let groups = [];
    let matches = [];
    let results = [];
    let links = model.links;

    model.nodes.map(node =>{

        let type = typeNode(node);

        switch (type) {
            case "user": {
                users.push({
                    id: node.id,
                    name: node.name,
                    linksout: portsInOut(model.nodes,node, false, links),
                })
                break;
            }
            case "group": {
                groups.push({
                    id: node.id,
                    name: node.name,
                    linksin: portsInOut(model.nodes,node, true, links),
                    linksout: portsInOut(model.nodes,node, false, links, 2),
                })
                break;
            }
            case "match": {
                matches.push({
                    id: node.id,
                    stage: node.name,
                    linksin: portsInOut(model.nodes, node, true, links),
                    linksout: portsInOut(model.nodes, node, false, links, 1),
                })
                break;
            }
            case "result": {
                results.push({
                    id: node.id,
                    place: node.name,
                })
                break;
            }
            default: {
                break;
            }
        }
    })

    return {
        users: users,
        groups: groups,
        matches: matches,
        results: results
    }

}

function portsInOut(nodes, node, typein, links){
   // console.log("AAAAAAAAAAAAAAA       "+arguments[4]);
    let arr = [];
    node.ports.map(port => {
        if(port.in===typein) port.links.map(link => {

                links.map(l=>{
                   // console.log( l.id +" --- "+ link);
                    if (l.id === link) {
                      //  console.log("gg: "+ l);
                        let type;
                      nodes.map(n => {
                            let id = typein ? l.source : l.target;
                           // console.log( n.id +" --------------- "+ id);
                           // console.log( n );
                            if(n.id === id) type = typeNode(n);
                        })
                        if(arguments[4]===1 && !typein){
                           // console.log( port.label +" ================ ");
                            arr.push({
                                win: port.label === "ᅠᅠᅠᅠПобедитель",
                                id: typein ? l.source : l.target,
                                type: type,
                            })
                        }  else if(arguments[4]===2 && !typein){
                           // console.log( port.label +" ================ "+port.label.replace(/[^\d]/g, ''));
                            arr.push({
                                place: parseInt(port.label.replace(/[^\d]/g, '')),
                                id: typein ? l.source : l.target,
                                type: type,
                            })
                        } else
                    arr.push({
                        id: typein ? l.source : l.target,
                        type: type,
                    })

                    }
                })

        })
    })
    return arr;

}

function typeNode(node) {
    let portsin = 0;

    node.ports.map(port => {
        if(port.in) portsin++;
    })

    switch (portsin) {
        case 0: {
            return "user";
        }
        case 1: {
            return "result";
        }
        case 2: {
            return "match"
        }
        default: {
            return "group"
        }
    }
}