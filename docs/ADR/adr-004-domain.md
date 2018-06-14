# ADR 4: Explaining the Domain

## Context
Redux provides a good mechanism to handle the state and its mutations, but not so much to handle the business logic.

However, like always, to keep a good segregation of concerns, we want to handle all business related logic, as well as all external communication of the application isolated. 

## Decision
To do so, we introduce the concept of domain.

The domain is the part responsible for everything that's not the view concern, nor the state concern.

The view concern is to render data.
The state concern is to store and modify data.

The rest belongs to the domain.

A visual representation is as follows:

![Domain connection: outer world > domain > state > view](https://user-images.githubusercontent.com/12797962/41419432-4c70fd4e-6ff2-11e8-8acd-a18367087193.png)

Each method of the next inner layer only knows about the layer above it.

This domain is only inspired from Domain Driven Design and aims at being a simpler implementation of the approach.

## Status
 Accepted
 
## Consequences
Domain concerns must be implemented so that methods (use cases) can be called as follows:

```
domain.concern.usecase
```

Use cases must be tested.

Objects resulting from domain methods can be stored in either Entities or Value Objects (see definitions: https://en.wikipedia.org/wiki/Domain-driven_design#Building_blocks), depending on the shape and concept they represent.
