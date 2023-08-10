/**
 * Logic to extract info blocks from deployment.yaml files.
 * 
 * This extractor is used during de deploy action execution.
 */
import { info } from "@actions/core";
import { DeploymentConfigInfo, Region } from "../types/configfiles";

export class RegionExtractor {

    static extractRegionInfo(envKey: string, regionKey: string, deployConfig: DeploymentConfigInfo) : Region {
        info("Searching region " + regionKey + " in environment " + envKey);
        for (let env of deployConfig.environments) {
            if (envKey === env.name) {
                info("Environment key matched");
                for (let reg of  env.regions) {
                    if (regionKey === reg.name) {
                        info("Region key matched inside environment");
                        return reg;
                    }
                }
            }
        }
        throw new Error("Error region not found by key " + regionKey);
    }
}
