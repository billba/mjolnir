# MJOLNIR - an experiment in state management between an app and a bot

 __WIP idea__: a react app that can be controlled via conventional means, mouse,keyboard.... but also have an integrated bot with the same levels of control.

 __execution__: create a dungeon crawler game using the idea above.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## TODO

(Currently using Jest and Chai, mocha can be implemented but mocha type definitions will conflict with jest type definitions)

- [ ] Testing
  - [ ] Write test for reducers
  - [ ] write tests for actions.

- [ ] LOGIC:
    - [ ] Review recursive call for creating doorways
    - [ ] state management
      - [ ] decide how to create rooms & find rooms.  
      Choices:
        - create room when player enters and push room into rooms array
        - have the Doorways class create rooms with items based on created doorways, method returns a rooms array. (Leaning heavily towards this choice.)
        - something i haven't thought of yet.
      - [ ] rooms array in state.
        - [ ] create rooms with:
          - [ ] inventory: an array of Item Objects.
          - [ ] Location/ID: x,y coordinates

- [ ] GUI:
    - [ ] Improve Visuals
      - [ ] exit buttons should appear oriented to the direction they are pointing to. North exit should appear at top, East to right.
      - [ ] Display Items in Rooms

- [ ] CUI:
    - [ ] Implement Webchat
    - [ ] chat panel should display information of player action.
      - [ ] pull data from state and display relevant context information for player action/room status.
        Example:
            - "player openned chest, the chest contains 2 items, a sword and shield"
            - "player arrived in room and is facing a dragon..."
            - "there are 3 exits in this room, N, S, W"