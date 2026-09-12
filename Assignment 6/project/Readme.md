## Parsing
### Parsing :-
The processing of converting raw string html into the structured Dom key value pairs


## Tokenization
### Tokenization :-
The borwser read html and then group it in tokens like opening tag <div> closing tag </div> and attributes name or text content

## DOM Tree
### Dom tree :-
we can say that the compiled form of html is called Dom Tree 

## CSSOM Tree
### Cssom Tree :-
we can say that the compiled form of css is called Cssom Tree 


## Render Tree
### Render Tree :-
Dom tree + Cssom tree = Render tree



## Event Bubbling
### EVENT BUBBLING :-
the event bubbling is the opposite of the event capturing 
we can imagen event bubbling like a real keyboard button when we hit the button then the free the key/ button of keyboard first the event trigger and 
the value show us on screan then the event hit the button rubber and the button rubber hit the button cver on backwork
its like a bubbles that have gase in that bubble and when we free it  goes upword
in js the event bubling is like this when we trigger an event the event goes in upword side from target to child and then go to parent



## Event Capturing

### EVENT CAPTURING :-
we can imagen event bubbling like a real keyboard button when we want to 
press a button we first press the button cover then the the button cover
press the button rubber and then the rubber press the actual event and a value apear on the screan
in js the event capturing is something like this we click the button an event start prom
th parent to the child and then the child and then hit the target


## Event Delegation
### Event Delegation :-
event delegation is like we attach event to the parrent then use if else condition and on the basses of that we take action forexample 
we have 100 buttons in our website and these buttons wraped inside the a button parent so instead of attaching event listener to every button we use event delegation feature and attach one event listener to the parent of the button and then do like:
if(e.target.getattribute("class") == "button1"){
    console.log("button1 clicked)
}else if(e.target.getattribute("class") == "button2"){
    console.log("button2 clicked)
} ... and so on