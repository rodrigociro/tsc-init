"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegionExtractor = void 0;
/**
 * Logic to extract info blocks from deployment.yaml files.
 *
 * This extractor is used during de deploy action execution.
 */
const core_1 = require("@actions/core");
class RegionExtractor {
    static extractRegionInfo(envKey, regionKey, deployConfig) {
        (0, core_1.info)("Searching region " + regionKey + " in environment " + envKey);
        for (let env of deployConfig.environments) {
            if (envKey === env.name) {
                (0, core_1.info)("Environment key matched");
                for (let reg of env.regions) {
                    if (regionKey === reg.name) {
                        (0, core_1.info)("Region key matched inside environment");
                        return reg;
                    }
                }
            }
        }
        throw new Error("Error region not found by key " + regionKey);
    }
}
exports.RegionExtractor = RegionExtractor;
