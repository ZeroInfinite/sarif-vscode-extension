export namespace sarif {

    /**
    * Static Analysis Results Format (SARIF) Version 2.0.0 JSON Schema: a standard format for the output of static
    * analysis and other tools.
    */
    export interface Log {
        /**
        *  The URI of the JSON schema corresponding to the version.
        */
        $schema?: string;

        /**
        *  The SARIF format version of this log file.
        */
        version: Log.version;

        /**
         *  The set of runs contained in this log file.
         */
        runs: Run[];
    }

    export namespace Log {
        export const enum version {
            v2 = "2.0.0",
        }
    }

    /**
    * A file relevant to a tool invocation or to a result.
    */
    export interface Attachment {
        /**
        * A message describing the role played by the attachment.
        */
        description?: Message;

        /**
        * The location of the attachment.
        */
        fileLocation: FileLocation;

        /**
        * An array of regions of interest within the attachment.
        */
        regions?: Region[];

        /**
        * An array of rectangles specifying areas of interest within the image.
        */
        rectangles?: Rectangle[];
    }

    /**
    * A set of threadFlows which together describe a pattern of code execution relevant to detecting a result.
    */
    export interface CodeFlow {
        /**
        * A message relevant to the code flow.
        */
        message?: Message;

        /**
        * An array of one or more unique threadFlow objects, each of which describes the progress of a program through
        * a thread of execution.
        */
        threadFlows: ThreadFlow[];

        /**
        * Key/value pairs that provide additional information about the code flow.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * A location visited by an analysis tool in the course of simulating or monitoring the execution of a program.
    */
    export interface ThreadFlowLocation {
        /**
        * The 0-based sequence number of the location in the code flow within which it occurs.
        */
        step?: number;

        /**
        * The code location.
        */
        location?: Location;

        /**
        * The call stack leading to this location.
        */
        stack?: Stack;

        /**
        * A string describing the type of this location.
        */
        kind?: string;

        /**
        * The name of the module that contains the code that is executing.
        */
        module?: string;

        /**
        * A dictionary, each of whose keys specifies a variable or expression, the associated value of which represents
        * the variable or expression value. For an annotation of kind 'continuation', for example, this dictionary
        * might hold the current assumed values of a set of global variables.
        */
        state?: object;

        /**
        * An integer representing a containment hierarchy within the thread flow
        */
        nestingLevel?: number;

        /**
        * An integer representing the temporal order in which execution reached this location.
        */
        executionOrder?: number;

        /**
        * The time at which this location was executed.
        */
        timestamp?: string;

        /**
        * Specifies the importance of this location in understanding the code flow in which it occurs. The order from
        * most to least important is "essential", "important", "unimportant". Default: "important".
        */
        importance?: ThreadFlowLocation.importance;

        /**
        * Key/value pairs that provide additional information about the code location.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    export namespace ThreadFlowLocation {
        export const enum importance {
            important = "important",
            essential = "essential",
            unimportant = "unimportant",
        }
    }

    /**
    * Describes how a converter transformed the output of a static analysis tool from the analysis tool's native output
    * format into the SARIF format.
    */
    export interface Conversion {
        /**
        * A tool object that describes the converter.
        */
        tool: Tool;

        /**
        * An invocation object that describes the invocation of the converter.
        */
        invocation?: Invocation;

        /**
        * The locations of the analysis tool's per-run log files.
        */
        analysisToolLogFiles?: FileLocation[];
    }

    /**
    * Represents a directed edge in a graph.
    */
    export interface Edge {
        /**
        * A string that uniquely identifies the edge within its graph.
        */
        id: string;

        /**
        * A short description of the edge.
        */
        label?: Message;

        /**
        * Identifies the source node (the node at which the edge starts).
        */
        sourceNodeId: string;

        /**
        * Identifies the target node (the node at which the edge ends).
        */
        targetNodeId: string;

        /**
        * Key/value pairs that provide additional information about the edge.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * Represents the traversal of a single edge in the course of a graph traversal.
    */
    export interface EdgeTraversal {
        /**
        * Identifies the edge being traversed.
        */
        edgeId: string;

        /**
        * A message to display to the user as the edge is traversed.
        */
        message?: Message;

        /**
        * The values of relevant expressions after the edge has been traversed.
        */
        finalState?: { [key: string]: string };

        /**
        * The number of edge traversals necessary to return from a nested graph.
        */
        stepOverEdgeCount?: number;

        /**
        * Key/value pairs that provide additional information about the edge traversal.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * TBD
    */
    export interface Exception {
        /**
        * A string that identifies the kind of exception, for example, the fully qualified type name of an object that
        * was thrown, or the symbolic name of a signal.
        */
        kind?: string;

        /**
        * A plain text message that describes the exception.
        */
        message?: string;

        /**
        * The sequence of function calls leading to the exception.
        */
        stack?: Stack;

        /**
        * An array of exception objects each of which is considered a cause of this exception.
        */
        innerExceptions?: Exception[];
    }

    /**
    * A change to a single file.
    */
    export interface FileChange {
        /**
        * The location of the file to change.
        */
        fileLocation?: FileLocation;

        /**
        * An array of replacement objects, each of which represents the replacement of a single range of bytes in a
        * single file specified by 'fileLocation'.
        */
        replacements: Replacement[];
    }

    /**
    * A single file. In some cases, this file might be nested within another file.
    */
    export interface File {
        /**
        * The location of the file.
        */
        fileLocation?: FileLocation;

        /**
        * Identifies the key of the immediate parent of the file, if this file is nested.
        */
        parentKey?: string;

        /**
        * The offset in bytes of the file within its containing file.
        */
        offset?: number;

        /**
        * The length of the file in bytes.
        */
        length?: number;

        /**
        * The role or roles played by the file in the analysis.
        */
        roles?: File.roles[];

        /**
        * The MIME type (RFC 2045) of the file.
        */
        mimeType?: string;

        /**
        * The contents of the file, expressed as a MIME Base64-encoded byte sequence.
        */
        contents?: FileContent;

        /**
        * Specifies the encoding for a file object that refers to a text file.
        */
        encoding?: string;

        /**
        * An array of hash objects, each of which specifies a hashed value for the file, along with the name of the
        * hash function used to compute the hash.
        */
        hashes?: Hash[];

        /**
        * The date and time at which the file was most recently modified. See "Date/time properties" in the SARIF spec
        * for the required format.
        */
        lastModifiedTime?: string;

        /**
        * Key/value pairs that provide additional information about the file.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    export namespace File {
        export const enum roles {
            analysisTarget = "analysisTarget",
            attachment = "attachment",
            responseFile = "responseFile",
            resultFile = "resultFile",
            standardStream = "standardStream",
            traceFile = "traceFile",
            unmodifiedFile = "unmodifiedFile",
            modifiedFile = "modifiedFile",
            addedFile = "addedFile",
            deletedFile = "deletedFile",
            renamedFile = "renamedFile",
            uncontrolledFile = "uncontrolledFile",
        }
    }

    /**
    * Represents content from an external file.
    */
    export interface FileContent {
        /**
        * UTF-8-encoded content from a text file.
        */
        text?: string;

        /**
        * MIME Base64-encoded content from a binary file, or from a text file in its original encoding.
        */
        binary?: string;
    }

    /**
    * Specifies the location of a file.
    */
    export interface FileLocation {
        /**
        * A string containing a valid relative or absolute URI.
        */
        uri: string;

        /**
        * A string which indirectly specifies the absolute URI with respect to which a relative URI in the "uri"
        * property is interpreted.
        */
        uriBaseId?: string;
    }

    /**
    * A proposed fix for the problem represented by a result object. A fix specifies a set of file to modify. For each
    * file, it specifies a set of bytes to remove, and provides a set of new bytes to replace them.
    */
    export interface Fix {
        /**
        * A message that describes the proposed fix, enabling viewers to present the proposed change to an end user.
        */
        description?: Message;

        /**
        * One or more file changes that comprise a fix for a result.
        */
        fileChanges: FileChange[];
    }

    /**
    * A network of nodes and directed edges that describes some aspect of the structure of the code (for example, a
    * call graph).
    */
    export interface Graph {
        /**
        * A string that uniquely identifies the graph within a run.graphs or result.graphs array.
        */
        id: string;

        /**
        * A description of the graph.
        */
        description?: Message;

        /**
        * An array of node objects representing the nodes of the graph.
        */
        nodes: Node[];

        /**
        * An array of edge objects representing the edges of the graph.
        */
        edges: Edge[];

        /**
        * Key/value pairs that provide additional information about the graph.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * Represents a path through a graph.
    */
    export interface GraphTraversal {
        /**
        * A string that uniquely identifies that graph being traversed.
        */
        graphId: string;

        /**
        * A description of this graph traversal.
        */
        description?: Message;

        /**
        * Values of relevant expressions at the start of the graph traversal.
        */
        initialState?: { [key: string]: string };

        /**
        * The sequences of edges traversed by this graph traversal.
        */
        edgeTraversals: EdgeTraversal[];

        /**
        * Key/value pairs that provide additional information about the graph traversal.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * A hash value of some file or collection of files, together with the hash function used to compute the hash.
    */
    export interface Hash {
        /**
        * The hash value of some file or collection of files, computed by the hash function named in the 'algorithm'
        * property.
        */
        value: string;

        /**
        * The name of the hash function used to compute the hash value specified in the 'value' property.
        */
        algorithm: string;
    }

    /**
    * The runtime environment of the analysis tool run.
    */
    export interface Invocation {
        /**
        * A set of files relevant to the invocation of the tool.
        */
        attachments?: Attachment[];

        /**
        * The command line used to invoke the tool.
        */
        commandLine?: string;

        /**
        * An array of strings, containing in order the command line arguments passed to the tool from the operating
        * system.
        */
        arguments?: string[];

        /**
        * The locations of any response files specified on the tool's command line.
        */
        responseFiles?: FileLocation[];

        /**
        * The date and time at which the run started. See "Date/time properties" in the SARIF spec for the required
        * format.
        */
        startTime?: string;

        /**
        * The date and time at which the run ended. See "Date/time properties" in the  SARIF spec for the required
        * format.
        */
        endTime?: string;

        /**
        * The process exit code.
        */
        exitCode?: number;

        /**
        * A list of runtime conditions detected by the tool in the course of the analysis.
        */
        toolNotifications?: Notification[];

        /**
        * A list of conditions detected by the tool that are relevant to the tool's configuration.
        */
        configurationNotifications?: Notification[];

        /**
        * The reason for the process exit.
        */
        exitCodeDescription?: string;

        /**
        * The name of the signal that caused the process to exit.
        */
        exitSignalName?: string;

        /**
        * The numeric value of the signal that caused the process to exit.
        */
        exitSignalNumber?: number;

        /**
        * The reason given by the operating system that the process failed to start.
        */
        processStartFailureMessage?: string;

        /**
        * A value indicating whether the tool's execution completed successfully.
        */
        toolExecutionSuccessful?: boolean;

        /**
        * The machine that hosted the analysis tool run.
        */
        machine?: string;

        /**
        * The account that ran the analysis tool.
        */
        account?: string;

        /**
        * The process id for the analysis tool run.
        */
        processId?: number;

        /**
        * An absolute URI specifying the location of the analysis tool's executable.
        */
        executableLocation?: FileLocation;

        /**
        * The working directory for the analysis rool run.
        */
        workingDirectory?: string;

        /**
        * The environment variables associated with the analysis tool process, expressed as key/value pairs.
        */
        environmentVariables?: { [key: string]: any };

        /**
        * A file containing the standard input stream to the process that was invoked.
        */
        stdin?: FileLocation;

        /**
        * A file containing the standard output stream from the process that was invoked.
        */
        stdout?: FileLocation;

        /**
        * A file containing the standard error stream from the process that was invoked.
        */
        stderr?: FileLocation;

        /**
        * A file containing the interleaved standard output and standard error stream from the process that was
        * invoked.
        */
        stdoutStderr?: FileLocation;

        /**
        * Key/value pairs that provide additional information about the run.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * The location where an analysis tool produced a result.
    */
    export interface Location {
        /**
        * Identifies the file where the analysis tool produced the result.
        */
        physicalLocation?: PhysicalLocation;

        /**
        * The human-readable fully qualified name of the logical location where the analysis tool produced the result.
        */
        fullyQualifiedLogicalName?: string;

        /**
        * A message relevant to the location.
        */
        message?: Message;

        /**
        * A set of regions relevant to the location.
        */
        annotations?: Region[];

        /**
        * Key/value pairs that provide additional information about the location.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * A logical location of a construct that produced a result.
    */
    export interface LogicalLocation {
        /**
        * Identifies the construct in which the result occurred. For example, this property might contain the name of a
        * class or a method.
        */
        name?: string;

        /**
        * The human-readable fully qualified name of the logical location.
        */
        fullyQualifiedName?: string;

        /**
        * The machine-readable name for the logical location, such as a mangled function name provided by a C++
        * compiler that encodes calling convention, return type and other details along with the function name.
        */
        decoratedName?: string;

        /**
        * Identifies the key of the immediate parent of the construct in which the result was detected. For example,
        * this property might point to a logical location that represents the namespace that holds a type.
        */
        parentKey?: string;

        /**
        * The type of construct this logicalLocationComponent refers to. Should be one of 'function', 'member',
        * 'module', 'namespace', 'package', 'parameter', 'resource', 'returnType', 'type', or 'variable', if any of
        * those accurately describe the construct.
        */
        kind?: string;
    }

    /**
    * Encapsulates a message intended to be read by the end user.
    */
    export interface Message {
        /**
        * A plain text message string.
        */
        text?: string;

        /**
        * The resource id for a plain text message string.
        */
        messageId?: string;

        /**
        * A rich text message string.
        */
        richText?: string;

        /**
        * The resource id for a rich text message string.
        */
        richMessageId?: string;

        /**
        * An array of strings to substitute into the message string.
        */
        arguments?: string[];
    }

    /**
    * Represents a node in a graph.
    */
    export interface Node {
        /**
        * A string that uniquely identifies the node within its graph.
        */
        id: string;

        /**
        * A short description of the node.
        */
        label?: Message;

        /**
        * A code location associated with the node.
        */
        location?: Location;

        /**
        * Array of child nodes.
        */
        children?: Node[];

        /**
        * Key/value pairs that provide additional information about the node.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * Describes a condition relevant to the tool itself, as opposed to being relevant to a target being analyzed by the
    * tool.
    */
    export interface Notification {
        /**
        * An identifier for the condition that was encountered.
        */
        id?: string;

        /**
        * The stable, unique identifier of the rule (if any) to which this notification is relevant. If 'ruleKey' is
        * not specified, this member can be used to retrieve rule metadata from the rules dictionary, if it exists.
        */
        ruleId?: string;

        /**
        * The file and region relevant to this notification.
        */
        physicalLocation?: PhysicalLocation;

        /**
        * A message that describes the condition that was encountered.
        */
        message: Message;

        /**
        * A value specifying the severity level of the notification.
        */
        level?: Notification.level;

        /**
        * The thread identifier of the code that generated the notification.
        */
        threadId?: number;

        /**
        * The date and time at which the analysis tool generated the notification.
        */
        time?: string;

        /**
        * The runtime exception, if any, relevant to this notification.
        */
        exception?: Exception;

        /**
        * Key/value pairs that provide additional information about the notification.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    export namespace Notification {
        export const enum level {
            note = "note",
            warning = "warning",
            error = "error",
        }
    }

    /**
    * A physical location relevant to a result. Specifies a reference to a programming artifact together with a range
    * of bytes or characters within that artifact.
    */
    export interface PhysicalLocation {
        /**
        * Value that distinguishes this physical location from all other physical locations in this run object.
        */
        id?: number;

        /**
        * The location of the file.
        */
        fileLocation: FileLocation;

        /**
        * The region within the file where the result was detected.
        */
        region?: Region;

        /**
        * Specifies a portion of the file that encloses the region. Allows a viewer to display additional context
        * around the region.
        */
        contextRegion?: Region;
    }

    /**
    * An area within an image.
    */
    export interface Rectangle {
        /**
        * The Y coordinate of the top edge of the rectangle, measured in the image's natural units.
        */
        top?: number;

        /**
        * The X coordinate of the left edge of the rectangle, measured in the image's natural units.
        */
        left?: number;

        /**
        * The Y coordinate of the bottom edge of the rectangle, measured in the image's natural units.
        */
        bottom?: number;

        /**
        * The X coordinate of the right edge of the rectangle, measured in the image's natural units.
        */
        right?: number;

        /**
        * A message relevant to the rectangle.
        */
        message?: Message;
    }

    /**
    * A region within a file where a result was detected.
    */
    export interface Region {
        /**
        * The line number of the first character in the region.
        */
        startLine?: number;

        /**
        * The column number of the first character in the region.
        */
        startColumn?: number;

        /**
        * The line number of the last character in the region.
        */
        endLine?: number;

        /**
        * The column number of the last character in the region.
        */
        endColumn?: number;

        /**
        * The zero-based offset from the beginning of the file of the first character in the region.
        */
        charOffset?: number;

        /**
        * The length of the region in characters.
        */
        charLength?: number;

        /**
        * The zero-based offset from the beginning of the file of the first byte in the region.
        */
        byteOffset?: number;

        /**
        * The length of the region in bytes.
        */
        byteLength?: number;

        /**
        * The portion of the file contents within the specified region.
        */
        snippet?: FileContent;

        /**
        * A message relevant to the region.
        */
        message?: Message;
    }

    /**
    * The replacement of a single range of bytes in a file. Specifies the location within the file where the
    * replacement is to be made, the number of bytes to remove at that location, and a sequence of bytes to insert at
    * that location.
    */
    export interface Replacement {
        /**
        * The region of the file to delete.
        */
        deletedRegion: Region;

        /**
        * The content to insert at the location specified by the 'deletedRegion' property.
        */
        insertedContent?: FileContent;
    }

    /**
    * Container for items that require localization.
    */
    export interface Resources {
        /**
        * A dictionary, each of whose keys is a resource identifier and each of whose values is a localized string.
        */
        messageStrings?: { [key: string]: string };

        /**
        * A dictionary, each of whose keys is a string and each of whose values is a 'rule' object, that describe all
        * rules associated with an analysis tool or a specific run of an analysis tool.
        */
        rules?: { [key: string]: Rule };
    }

    /**
    * A result produced by an analysis tool.
    */
    export interface Result {
        /**
        * The stable, unique identifier of the rule (if any) to which this notification is relevant. If 'ruleKey' is
        * not specified, this member can be used to retrieve rule metadata from the rules dictionary, if it exists.
        */
        ruleId?: string;

        /**
        * A value specifying the severity level of the result.
        */
        level?: Result.level;

        /**
        * A message that describes the result. The first sentence of the message only will be displayed when visible
        * space is limited.
        */
        message?: Message;

        /**
        * A string that identifies the message within the metadata for the rule used in this result.
        */
        ruleMessageId?: string;

        /**
        * Identifies the file that the analysis tool was instructed to scan. This need not be the same as the file
        * where the result actually occurred.
        */
        analysisTarget?: FileLocation;

        /**
        * One or more locations where the result occurred. Specify only one location unless the problem indicated by
        * the result can only be corrected by making a change at every specified location.
        */
        locations?: Location[];

        /**
        * A stable, unique identifer for the result in the form of a GUID.
        */
        instanceGuid?: string;

        /**
        * A stable, unique identifier for the equivalence class of logically identical results to which this result
        * belongs, in the form of a GUID.
        */
        correlationGuid?: string;

        /**
        * A set of strings that contribute to the stable, unique identity of the result.
        */
        partialFingerprints?: { [key: string]: string };

        /**
        * A set of strings each of which individually defines a stable, unique identity for the result.
        */
        fingerprints?: { [key: string]: string };

        /**
        * An array of 'stack' objects relevant to the result.
        */
        stacks?: Stack[];

        /**
        * An array of 'codeFlow' objects relevant to the result.
        */
        codeFlows?: CodeFlow[];

        /**
        * An array of one or more unique 'graph' objects.
        */
        graphs?: Graph[];

        /**
        * An array of one or more unique 'graphTraversal' objects.
        */
        graphTraversals?: GraphTraversal[];

        /**
        * A set of locations relevant to this result.
        */
        relatedLocations?: Location[];

        /**
        * TBD
        */
        suppressionStates?: Result.suppressionStates[];

        /**
        * The state of a result relative to a baseline of a previous run.
        */
        baselineState?: Result.baselineState;

        /**
        * A set of files relevant to the result.
        */
        attachments?: Attachment[];

        /**
        * The URI of the work item associated with this result
        */
        workItemUri?: string;

        /**
        * An array of analysisToolLogFileContents objects which specify the portions of an analysis tool's output that
        * a converter transformed into the result object.
        */
        conversionProvenance?: PhysicalLocation[];

        /**
        * An array of 'fix' objects, each of which represents a proposed fix to the problem indicated by the result.
        */
        fixes?: Fix[];

        /**
        * Key/value pairs that provide additional information about the result.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    export namespace Result {
        export const enum level {
            notApplicable = "notApplicable",
            pass = "pass",
            note = "note",
            warning = "warning",
            error = "error",
            open = "open",
        }
        export const enum suppressionStates {
            suppressedInSource = "suppressedInSource",
            suppressedExternally = "suppressedExternally",
        }
        export const enum baselineState {
            new = "new",
            existing = "existing",
            absent = "absent",
        }
    }

    /**
    * Describes an analysis rule.
    */
    export interface Rule {
        /**
        * A stable, opaque identifier for the rule.
        */
        id: string;

        /**
        * A rule identifier that is understandable to an end user.
        */
        name?: Message;

        /**
        * A concise description of the rule. Should be a single sentence that is understandable when visible space is
        * limited to a single line of text.
        */
        shortDescription?: Message;

        /**
        * A description of the rule. Should, as far as possible, provide details sufficient to enable resolution of any
        * problem indicated by the result.
        */
        fullDescription?: Message;

        /**
        * A set of name/value pairs with arbitrary names. The value within each name/value pair consists of plain text
        * interspersed with placeholders, which can be used to construct a message in combination with an arbitrary
        * number of additional string arguments.
        */
        messageStrings?: { [key: string]: string };

        /**
        * A set of name/value pairs with arbitrary names. The value within each name/value pair consists of rich text
        * interspersed with placeholders, which can be used to construct a message in combination with an arbitrary
        * number of additional string arguments.
        */
        richMessageStrings?: { [key: string]: string };

        /**
        * Information about the rule that can be configured at runtime.
        */
        configuration?: RuleConfiguration;

        /**
        * A URI where the primary documentation for the rule can be found.
        */
        helpUri?: string;

        /**
        * Provides the primary documentation for the rule, useful when there is no online documentation.
        */
        help?: Message;

        /**
        * Key/value pairs that provide additional information about the rule.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * Information about a rule that can be configured at runtime.
    */
    export interface RuleConfiguration {
        /**
        * Specifies whether the rule will be evaluated during the scan.
        */
        enabled?: boolean;

        /**
        * Specifies the default severity level of the result.
        */
        defaultLevel?: RuleConfiguration.defaultLevel;

        /**
        * Contains configuration information specific to this rule.
        */
        parameters?: {
            /**
            * A set of distinct strings that provide additional configuration information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    export namespace RuleConfiguration {
        export const enum defaultLevel {
            note = "note",
            warning = "warning",
            error = "error",
            open = "open",
        }
    }

    /**
    * Describes a single run of an analysis tool, and contains the output of that run.
    */
    export interface Run {
        /**
        * Information about the tool or tool pipeline that generated the results in this run. A run can only contain
        * results produced by a single tool or tool pipeline. A run can aggregate results from multiple log files, as
        * long as context around the tool run (tool command-line arguments and the like) is identical for all
        * aggregated files.
        */
        tool: Tool;

        /**
        * Describes the invocation of the analysis tool.
        */
        invocations?: Invocation[];

        /**
        * A conversion object that describes how a converter transformed an analysis tool's native output format into
        * the SARIF format.
        */
        conversion?: Conversion;

        /**
        * Specifies the revision in version control of the files that were scanned.
        */
        versionControlProvenance?: VersionControlDetails[];

        /**
        * The absolute URI specified by each uriBaseId symbol on the machine where the tool originally ran.
        */
        originalUriBaseIds?: { [key: string]: string };

        /**
        * A dictionary each of whose keys is a URI and each of whose values is a file object.
        */
        files?: { [key: string]: File };

        /**
        * A dictionary, each of whose keys specifies a logical location such as a namespace, type or function.
        */
        logicalLocations?: { [key: string]: LogicalLocation };

        /**
        * An array of one or more unique 'graph' objects.
        */
        graphs?: Graph[];

        /**
        * The set of results contained in an SARIF log. The results array can be omitted when a run is solely exporting
        * rules metadata. It must be present (but may be empty) in the event that a log file represents an actual scan.
        */
        results?: Result[];

        /**
        * Items that can be localized, such as message strings and rule metadata.
        */
        resources?: Resources;

        /**
        * A stable, unique identifier for the run, in the form of a GUID.
        */
        instanceGuid?: string;

        /**
        * A logical identifier for a run, for example, 'nightly Clang analyzer run'. Multiple runs of the same type can
        * have the same stableId.
        */
        logicalId?: string;

        /**
        * A description of the run.
        */
        description?: Message;

        /**
        * A global identifier that allows the run to be correlated with other artifacts produced by a larger automation
        * process.
        */
        automationLogicalId?: string;

        /**
        * The 'instanceGuid' property of a previous SARIF 'run' that comprises the baseline that was used to compute
        * result 'baselineState' properties for the run.
        */
        baselineInstanceGuid?: string;

        /**
        * The hardware architecture for which the run was targeted.
        */
        architecture?: string;

        /**
        * The MIME type of all rich text message properties in the run. Default: "text/markdown;variant=GFM"
        */
        richMessageMimeType?: string;

        /**
        * The string used to replace sensitive information in a redaction-aware property.
        */
        redactionToken?: string;

        /**
        * Specifies the default encoding for any file object that refers to a text file.
        */
        defaultFileEncoding?: string;

        /**
        * Specifies the unit in which the tool measures columns.
        */
        columnKind?: Run.columnKind;

        /**
        * Key/value pairs that provide additional information about the run.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information about the run.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    export namespace Run {
        export const enum columnKind {
            utf16CodeUnits = "utf16CodeUnits",
            unicodeCodePoints = "unicodeCodePoints",
        }
    }

    /**
    * A call stack that is relevant to a result.
    */
    export interface Stack {
        /**
        * A message relevant to this call stack.
        */
        message?: Message;

        /**
        * An array of stack frames that represent a sequence of calls, rendered in reverse chronological order, that
        * comprise the call stack.
        */
        frames: StackFrame[];

        /**
        * Key/value pairs that provide additional information about the stack.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * A function call within a stack trace.
    */
    export interface StackFrame {
        /**
        * The location to which this stack frame refers.
        */
        location?: Location;

        /**
        * The name of the module that contains the code of this stack frame.
        */
        module?: string;

        /**
        * The thread identifier of the stack frame.
        */
        threadId?: number;

        /**
        * The address of the method or function that is executing.
        */
        address?: number;

        /**
        * The offset from the method or function that is executing.
        */
        offset?: number;

        /**
        * The parameters of the call that is executing.
        */
        parameters?: string[];

        /**
        * Key/value pairs that provide additional information about the stack frame.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * TBD
    */
    export interface ThreadFlow {
        /**
        * An string that uniquely identifies the threadFlow within the codeFlow in which it occurs.
        */
        id?: string;

        /**
        * A message relevant to the code flow.
        */
        message?: Message;

        /**
        * An array of 'threadFlowLocation' objects, each of which describes a single location visited by the tool in
        * the course of producing the result.
        */
        locations: ThreadFlowLocation[];

        /**
        * Key/value pairs that provide additional information about the code flow.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * The analysis tool that was run.
    */
    export interface Tool {
        /**
        * The name of the tool.
        */
        name: string;

        /**
        * The name of the tool along with its version and any other useful identifying information, such as its locale.
        */
        fullName?: string;

        /**
        * The tool version, in whatever format the tool natively provides.
        */
        version?: string;

        /**
        * The tool version in the format specified by Semantic Versioning 2.0.
        */
        semanticVersion?: string;

        /**
        * The binary version of the tool's primary executable file (for operating systems such as Windows that provide
        * that information).
        */
        fileVersion?: string;

        /**
        * The absolute URI from which the tool can be downloaded.
        */
        downloadUri?: string;

        /**
        * A version that uniquely identifies the SARIF logging component that generated this file, if it is versioned
        * separately from the tool.
        */
        sarifLoggerVersion?: string;

        /**
        * The tool language (expressed as an ISO 649 two-letter lowercase culture code) and region (expressed as an ISO
        * 3166 two-letter uppercase subculture code associated with a country or region).
        */
        language?: string;

        /**
        * Key/value pairs that provide additional information about the tool.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }

    /**
    * TBD
    */
    export interface VersionControlDetails {
        /**
        * The absolute URI of the repository.
        */
        uri: string;

        /**
        * A string that uniquely and permanently identifies the revision within the repository.
        */
        revisionId?: string;

        /**
        * The name of a branch containing the revision.
        */
        branch?: string;

        /**
        * A tag that has been applied to the revision.
        */
        tag?: string;

        /**
        * The date and time at which the revision was created.
        */
        timestamp?: string;

        /**
        * Key/value pairs that provide additional information about the revision.
        */
        properties?: {
            /**
            * A set of distinct strings that provide additional information.
            */
            tags?: string[];

            /**
             * Additional Properties
             */
            [key: string]: any;
        };
    }
}
