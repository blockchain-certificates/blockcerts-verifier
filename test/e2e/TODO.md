We removed the various polymer webcomponent tester dependencies as the tests were not working from a dependency perspective,
as well as not really being used in the flow. 

However it seems we could refactor those tests to run with karma, and follow the e2e.test.ts patterns
