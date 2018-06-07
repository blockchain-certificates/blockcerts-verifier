# ADR 0: What is an ADR? 

It stands for an Architectural Decision Report, and is described more thoroughly in this blog post: http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions 

# Context 
Projects tend to see a lot of different contributors intervene. Each of these contributors might influence the architecture in one way or another, and decisions remain, potentially hard to change, let alone understand. 

# Decision 
In order to maintain some sort of quick reference as to why some decisions have been made, we have decided to introduce this format. The purpose is to allow any new developer to the project to easily understand why some of the more important things have been done one way and not the other. 

### Naming Convention
The naming of files should be made as follows: 

`adr-XXX-title-summary.md` 

where XXX is a unique sequential number. 

# Status 
Accepted 

# Consequences 
Tricky/exposed/controversial architectural decisions now need to be documented in this file. 
As stated in the original blog post, decisions can be superseded or deprecated, but need to be explicted once again via a new ADR.