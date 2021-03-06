// /********************************************************
// *                                                       *
// *   Copyright (C) Microsoft. All rights reserved.       *
// *                                                       *
// ********************************************************/
import { RunInfo } from "./common/Interfaces";
import { sarif } from "./common/SARIFInterfaces";

/**
 * Class that holds the run information processed from the Sarif run
 */
export class RunInfoFactory {

    /**
     * Processes the run passed in and creates a new RunInfo object with the information processed
     * @param run SARIF run object to process
     * @param sarifFileName path and file name of the sarif file this run is in
     */
    public static Create(run: sarif.Run, sarifFileName: string): RunInfo {
        const runInfo = {} as RunInfo;
        const tool = run.tool;
        runInfo.toolName = tool.name;
        if (runInfo.toolFullName !== undefined) {
            runInfo.toolFullName = tool.fullName;
        } else if (run.tool.semanticVersion !== undefined) {
            runInfo.toolFullName = `${tool.name} ${tool.semanticVersion}`;
        } else {
            runInfo.toolFullName = tool.name;
        }

        if (run.invocations !== undefined) {
            runInfo.cmdLine = run.invocations[0].commandLine;
            if (run.invocations[0].executableLocation !== undefined) {
                runInfo.toolFileName = run.invocations[0].executableLocation.uri;
            }
            runInfo.workingDir = run.invocations[0].workingDirectory;
        }

        runInfo.additionalProperties = run.properties;
        runInfo.uriBaseIds = run.originalUriBaseIds;

        runInfo.sarifFileName = sarifFileName;
        return runInfo;
    }
}
