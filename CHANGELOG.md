# Change Log

## 2.5.0
* Added feature to open and convert non-sarif static analysis file to sarif for analysis [issue #79](https://github.com/Microsoft/sarif-vscode-extension/issues/79)
    * New command to activate the converter is "Sarif: Convert and open a non-sarif file"
    * Supported analysis tool files are: 
        * AndroidStudio, ClangAnalyzer, CppCheck, Fortify, FortifyFpr, FxCop, PREfast, Pylint, SemmleQL, StaticDriverVerifier, TSLint
* Added support for showing QuickFix light bulb and context menu in the Problems panel when a Sarif result can be remapped
* Fixed bug where the UI dialog for remapping allowed a non valid path to be entered [issue #92](https://github.com/Microsoft/sarif-vscode-extension/issues/92)
* Fixed bug where the Sarif Explorer showed empty when a sarif result was missing data such as rule id, rule name or location

## 2.4.0
* Changed the remapping files input box UX: [issue #71](https://github.com/Microsoft/sarif-vscode-extension/issues/71)
    * Added a button that opens a file picker, and populates the input box with the path of the file selected
    * Added a button that skips to the next file that needs to be remapped
    * Removed the "file:///" from the remapping UX. Users now only need to use a "normal" path ex. d:\folder\file.ext [issue #83](https://github.com/Microsoft/sarif-vscode-extension/issues/83)
    * Fixed the validation not showing the red box around the input box on first load
* Added a progress message to show while a Sarif file is being processed [issue #52](https://github.com/Microsoft/sarif-vscode-extension/issues/52)
    * Fixed when a Sarif file is closed we now only remove the results originating from the file closed
* Added the first set of unit tests [issue #70](https://github.com/Microsoft/sarif-vscode-extension/issues/70)
* Fixed the UI for code flow locations, to improve readability [issue #81](https://github.com/Microsoft/sarif-vscode-extension/issues/81)

## 2.3.0
* Added support for UriBaseIds [issue #25](https://github.com/Microsoft/sarif-vscode-extension/issues/25)
* Updated next and previous code flow step hotkeys to F6 and Shift+F6 [issue #55](https://github.com/Microsoft/sarif-vscode-extension/issues/55)
* Fixed bug with embedded links not working when it's at the start of a message [issue #60](https://github.com/Microsoft/sarif-vscode-extension/issues/60)
* Fixed bug to change region's endColumn to be exclusive to match the Sarif spec [issue #62](https://github.com/Microsoft/sarif-vscode-extension/issues/62)
* Fixed bug with uri fragments getting dropped or ignored

## 2.2.0
* Reworked the UX of remapping a file when it can't be found
    * Opens an input box with instructions and populated with the file that can't be found
    * Shows the file in the instructions for reference as well
    * Allows a user to enter a folder path(ex. the root of your enlistment), that will be added to the settings as a root path and checked in the future before asking the user for a file path
* Changed the Sarif Explorer from a previewHTML panel to a webview panel
* Added when you click a code lens or key navigate to a different code flow step it will now highlight the step in the Sarif Explorer
* Improved maintaining state of the Sarif Explorer after navigating away to a different file in the same view column and then back
* Fixed the Sarif Explorer taking focus when you click a diagnostic in the problems panel

## 2.1.0
* Added codelenses to display the messages for the code flow steps inline
    * The messages show based on the verbosity switch in the Sarif Explorer code flow panel
* Added diagnostics severity gutter icons to help show the selected result's location
* Added call and return icons
    * These inline icons will help visually describe if a call returns or not, or if a return has a call or not
* Added keyboard navigation through the code flow steps
    * After selecting a code flow step, press ctrl+F10 for the next step or ctrl+F9 for previous step

## 2.0.1
* Security fix for a node module included in the dependencies [details](https://nvd.nist.gov/vuln/detail/CVE-2018-3728)

## 2.0.0
* Updated to support Sarif V2.0.0 (we no longer support Sarif V1, a future task would be to add backwards support)
* Added Related Locations to Result Info panel
* Added Properties to Result and Run Info panels
* Added Embedded Link support
* Added Attachments panel
* Changed Locations and Related Locations to be clickable links
* Added instructions to Readme how to downgrade to previous version to maintain Sarif V1 support

## 1.0.0
* Prep work to get it ready for releasing on the marketplace
* Contributes Sarif to the json language, which will allow VSCode to apply the Sarif schema to the Sarif file, which adds autocomplete and tooltips.
* Reworked how we create the Explorer window
* Added support for RuleKey
* Added support for Results that don't have a ResultLocation
* Various other Minor Fixes

## 0.1.0
* Initial preview release of the extension