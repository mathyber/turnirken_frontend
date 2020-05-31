import * as SRD from "storm-react-diagrams"

export class UserModel extends SRD.DefaultNodeModel {
    constructor(username = "Участник") {

        super(username, "rgb(255,0,0)");

        let type = "User";

        this.addOutPort("ᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠᅠ").setMaximumLinks(1);
    }

}