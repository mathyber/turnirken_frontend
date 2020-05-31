import * as SRD from "storm-react-diagrams"

export class GroupModel extends SRD.DefaultNodeModel {
    constructor(name, numpart, numgroupwin, startnum) {
        super(name, "rgb(249, 82, 0)");

        let type = "Group";

        for(let i = 0; i<startnum; i++ ){
            this.addInPort("-> Участник №"+(i+1)).setMaximumLinks(1);
        }

        for(let i = 0; i<numgroupwin; i++ ){
            this.addOutPort("ᅠᅠᅠᅠ" +
                "Участник, занявший "+(i+1)+" место в группе").setMaximumLinks(1);
        }

    }

}