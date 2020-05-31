import * as SRD from "storm-react-diagrams"

export class FinalModel extends SRD.DefaultNodeModel {
    constructor(mesto) {
        let rgb;

        switch (mesto) {
            case 1 : {
                rgb = "rgb(255,191,0)";
                break;
            }
            case 2 : {
                rgb = "rgb(106,106,106)";
                break;
            }
            case 3 : {
                rgb = "rgb(182,53,0)";
                break;
            }
            default : {
                rgb = "rgb(52,255,0)";
                break;
            }
        }

        let name = mesto + " место турнира"
        if (mesto === 0) name = "Результат"
        if (mesto === 1) name = "Победитель турнира"

        super(name, rgb);

        let type = "Final";

        this.addInPort("->").setMaximumLinks(1);
    }

}