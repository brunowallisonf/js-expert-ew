#Call stack and memory heap
Call stack is a first in last out structure that stores the functions and the primitive variables
when we make the attribution of a variable using another, actually we are giving the addres to that another variable to the new variable
if the variable value changes, the javascript engine create another memory space to store this value.
primitive variables are passed as value, it means that if you copy variable a to variable b and after that change the variable b variable a will not know the changes on variable b.

in case of re assign a value to a no-primitive variable, other reference will be created with the new value.
Impure functions are functions that change the variables of the surroud scope.
