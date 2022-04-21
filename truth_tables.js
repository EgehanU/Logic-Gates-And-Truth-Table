//@author Egehan Usluer

//to get max possible number in decimal for. For example, 3 inputs it will be 2^3-1 = 7 which is 111 in binary form.
function maxNumber(n){
    return Math.pow(2,n)-1;
}

//by taking the number of inputs creating an array consisting of all inputs in string form.
function inputs(n){
    let max = maxNumber(n);
    let holder = new Array();
    for (let i = 0; i <= max; i++) {
        //converting decimal to binary in string type
        holder.push(i.toString(2));
        while(holder[i].length < n){
            /*Adding zeros on the left for binary values consist lest than three digits. For example 2 in decimal is
            be 01 in binary. This will result in one less input, however 10 = 010, hence we can add as many zero as required*/
            holder[i] = "0" + holder[i];
        }

    }
    return holder;
}


//function for AND gate
function andGate(inputs){
    let result = true;
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i] == false)
        result = false;
    }
    return result;
}

//function for NOT gate
function inverter(input){
    return !input;
}

//function for OR gate
function orGate(inputs){
    let result = false;
    for (let i = 0; i < inputs.length; i++) {
        if(inputs[i] == true)
        result = true;
        
    }
    return result;
}

//function for NOR gate
function norGate(inputs){
    return inverter(orGate(inputs));
}

//function for NAND gate
function nandGate(inputs){
    return inverter(andGate(inputs));
}

//function for XOR gate
function xorGate(inputs){
    let newInputs = [nandGate(inputs), orGate(inputs)];
    let result = andGate(newInputs);
    return result;
}

//function for XNOR gate
function xnorGate(inputs){
    return inverter(xorGate(inputs));
}

//Depending on the entry of choice of the gate, the operation will change.
function choiceOfGate(inputs, gate){
    let result;
   
    gate = gate.toLowerCase();
        
    switch (gate) {
        case "andgate":
            result = andGate(inputs);
            break;
        case "orgate":
            result = orGate(inputs);
            break;
        case "nandgate":
            result = nandGate(inputs);
            break;
        case "norgate":
            result = norGate(inputs);
            break;
        case "xorgate":
            result = xorGate(inputs);
            break;
        case "xnorgate":
            result = xnorGate(inputs);
            break;

        default:
            break;
      }
    
    return result; 
}


//returns all the possible inputs and their output based on choice gate and number of inputs
function tableGenerator(n, gate){
    let results = [];
    let entries = inputs(n);//creating all possible inputs based on desired number of inputs
    let holder = [];
    let table = [];;
    let row = [];
    for (let i = 0; i < entries.length; i++) {
       for (let j = 0; j < entries[i].length; j++) {
            row.push(Number.parseInt(entries[i][j]));
        }
    }
    
    for (let k = 0; k < row.length; k=k+n) {
        holder.push(row.slice(k, k + n))  
    }

    for (let index = 0; index < holder.length; index++) {
        results.push(choiceOfGate(holder[index], gate)); 
    }
    table.push("Truth table of " + gate+ ": ");
    for (let m = 0; m < holder.length; m++) {
        table.push("If the inputs are " + holder[m] + " the output is " + results[m]);
    }
    return table;
}



//Functions listed above could be used in several different ways. First way is logic gates could directly be used.
let andGateVariables = [true, true, false];
console.log(andGate(andGateVariables));//result will be false. 

//Second way is using tableGenerator function which will take type of the gate requested and number of inputs and display the truth table.
let numberOfInputs = 4;
let typeOfGate = "orGate";
console.log(tableGenerator(numberOfInputs, typeOfGate));// This will show the truth table