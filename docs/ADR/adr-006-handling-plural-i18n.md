# ADR 5: Handling plural for i18n label

 ## Context
 Sometimes labels need to handle pluralization. While it could be just as easy as adding a `s` at the end of the word in English (it is not), French or Spanish, other languages have a variation of their plural form that require a better handling.
 
 ## Exploration
 We could use a pluralization library but that comes at the cost of added weight to the bundle as well as not guaranteeing success for more complex strings.
 Or we could also simply handle both strings in the translation files.
 
 ## Decision
 We chose to follow the second approach which adds less overhead to the bundle. 
 It comes at the cost of having the contributor to add the plural version of the string they want translated. But this explicit approach also reduces the risk of error and inconsistency.
 
 ## Status
 Accepted
 
 ## Consequences
 The contributor will make sure they add a `keyPlural` version mapping to the singular version `key` to the translation files.
 Using the `getText` method, they will have to set the third argument (`usePlural`) to true, and pass as the fourth argument the `count` property which will decide which string to use.
 