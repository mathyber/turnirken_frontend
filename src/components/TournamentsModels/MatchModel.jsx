import * as SRD from "storm-react-diagrams"

export class MatchModel extends SRD.DefaultNodeModel {
    constructor(name) {
        super(name, "rgb(38,0,255)");

        let type = "Match";

        this.addInPort("-> Участник №1").setMaximumLinks(1);
        this.addInPort("-> Участник №2").setMaximumLinks(1);

        this.addOutPort("ᅠᅠᅠᅠ" +"Победитель").setMaximumLinks(1);
        this.addOutPort("ᅠᅠᅠᅠ" +"Проигравший").setMaximumLinks(1);
    }

}