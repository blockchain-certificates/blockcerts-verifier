# ADR 1: Explaining the Tools and Methodologies

## Context
 Learning Machine handles a Blockcerts verifier in multiple repository and with different ways of deploying. This is costly and hard to maintain.
 
 Decision has been made to unify the verifier into one sole component and repository, with scalibility and maintainability at heart. 
 
 ## Decision
 #### JS
We decided to use Polymer 3.0 as previous versions of the verifier were already written with Polymer. Also because Web Components seem like a promising technology that could open a interesting future for the usage of the component.

State of the application will be handled by Redux, as demonstrated in the [example project of Polymer](https://github.com/Polymer/pwa-starter-kit). 

#### CSS
We decided to use ITCSS for its interesting way to handle CSS scalability and maintainability.
More information about this methodology can be found here:

https://github.com/sky-uk/css

https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/

#### Testing
We are using the tools provided by the Polymer Project, hence [WCT](https://github.com/Polymer/tools/tree/master/packages/web-component-tester). We also test for accessibility.

#### Accessibility
The Web Component needs to be WCAG2.0 AA compliant.

 ## Status
 Accepted
 
 ## Consequences
 Follow above standards and methodologies for development. Maintain a good level of separation of concerns between state and views. Architecture for the communication with external APIs has not yet been decided, and will be subject of a future ADR. 
 
 #### Testing
 Since WCT exposes Mocha methods, prefer using the BDD methods `describe`, `it` and `expect`.