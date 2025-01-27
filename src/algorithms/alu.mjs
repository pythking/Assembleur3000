// contains the functions for the ISO
// these function manipulate the stack and calls the functions in the isoFunction.js file to do the actual work
import memory from './memory.mjs';
import { runInstruction } from './interpreter.mjs';
import { type, getIndexOfLineInCode } from './typeChecking.mjs';
import { setVariable } from './memManagement.mjs';


export function LDA(register, value) {
	// LDA <reg1> <reg2>/<var>/<const>
	// Load register reg1 with the contents of either the contents of reg2, or the memory var or a constant const. 
	// Memory regions loads (load into a variable, for instance) are NOT ALLOWED.

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	// Load value into register
	memory.registers[register] = parseInt(value);
}

export function STR(variable, value) {
	// STR <var> <reg>/<const>
	// Store in the memory position referred by var the value of register reg or a constant const. 
	// Register stores (store into register t0, for instance) are NOT ALLOWED.

	// Check if Parameters are valid
	type(variable, false, true, false, true);
	value = type(value, true, false, true, false);


	// Store value into variable
	setVariable(variable, value);
}

export function PUSH(expression) {
	// PUSH <reg>/<var>/<const>/<addr>
	// Push to the top of the stack the contents of reg or var or a constant const

	// Check if Parameters are valid
	expression = type(expression, true, true, true, true);
	memory.byteStack.push(expression);
}

export function POP(register) {
	// POP <reg>
	// Pop from the top of the stack and store the value on reg. Storing in a memory region is NOT ALLOWED.

	// Check if Parameters are valid
	type(register, true, false, false, false);

	memory.registers[register] = parseInt(memory.byteStack.pop());
}

export function AND(register, value) {
	// AND <reg1> <reg2>/<var>/<const>
	// Performs a logical AND operation between reg1 and a register reg2, a variable var or a constant const, 
	// and store the result on register reg1. Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	memory.registers[register] = parseInt(memory.registers[register] && value);
}

export function OR(register, value) {
	/* OR <reg1> <reg2>/<var>/<const>
	Performs a logical OR operation between reg1 and a register reg2, a variable var or a constant const, 
	and store the result on register reg1. 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED. */

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	memory.registers[register] = parseInt(memory.registers[register] || value);
}

export function NOT(register) {
	/*NOT <reg>
	Performs a logical NOT operation on register reg and store the result on register reg. 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false);

	if (memory.registers[register] === 0) {
		memory.registers[register] = 1;
	}
	else {
		memory.registers[register] = 0;
	}
}

export function ADD(register, value) {
	/* ADD <reg1> <reg2>/<var>/<const>
	Performs the addition operation of reg1 and a register reg2, a variable var or a constant const, and store the result on register reg1. 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	// perform ADD operation between value and register
	memory.registers[register] = memory.registers[register] + parseInt(value);
}

export function SUB(register, value) {
	/*SUB <reg1> <reg2>/<var>/<const>
	Performs the subtraction operation of reg1 and a register reg2, a variable var or a constant const, and store the result on register reg1. 
	The operation is given by second argument minus the first argument (i.e., reg2 – reg1). 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	// perform SUB operation between value and register
	memory.registers[register] = memory.registers[register] - value;
}

export function DIV(register, value) {
	/* DIV <reg1> <reg2>/<var>/<const>
	Performs the integer division operation of reg1 and a register reg2, a variable var or a constant const, 
	and store the result on register reg1. 
	The operation is given by second argument divided by the first argument (i.e., reg2 / reg1). 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	// Perform DIV operation between value and register
	if (value !== 0) {
		memory.registers[register] = Math.floor(memory.registers[register] / value);
	}
	else throw new Error("\nDivision by 0\n\nLine " + getIndexOfLineInCode());
}

export function MUL(register, value) {
	/* MUL <reg1> <reg2>/<var>/<const>
	Performs the integer multiplication operation of reg1 and a register reg2, a variable var or a constant const, 
	and store the result on register reg1. 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);

	// perform MUL operation between value and register
	memory.registers[register] = memory.registers[register] * value;
}

export function MOD(register, value) {
	/* MOD <reg1> <reg2>/<var>/<const>
	Performs the integer modulo operation of reg1 and a register reg2, a variable var or a constant const, 
	and store the result on register reg1. 
	The operation is given by second argument modulo the first argument (i.e., reg2 mod reg1). 
	Memory regions stores (store result into a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	value = type(value, true, true, true, true);
	console.log(register, value);

	memory.registers[register] = value % memory.registers[register];
}

export function INC(register) {
	/*INC <reg>
	Increments the value of a register reg. 
	Memory increments (incrementing a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);

	memory.registers[register]++;
}

export function DEC(register) {
	/*	DEC <reg>
	Decrements the value of a register reg. 
	Memory increments (decrementing a variable, for instance) are NOT ALLOWED.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);

	memory.registers[register]--;
}

export function BEQ(param1, param2, label, stopval) {
	/* BEQ <reg1>/<var1>/<const1> <reg2>/<var2>/<const2> <LABEL>
	Performs a comparison between two values, given by registers, variables or constants. 
	Any combination is permitted. If they are equal, jump to the address defined by the label LABEL*/
	console.log("BEQ", param1, param2, label, stopval)
	// Check if Parameters are valid
	param1 = type(param1, true, true, true, true);
	param2 = type(param2, true, true, true, true);

	if (param1 === param2) {
		if (JMP(label, stopval) === -1) {
			return -1;
		}
	}
}

export function BNE(param1, param2, label, stopval) {
	/* BNE <reg1>/<var1>/<const1> <reg2>/<var2>/<const2> <LABEL>
	Performs a comparison between two values, given by registers, variables or constants. 
	Any combination is permitted. If they are different, jump to the address defined by the label LABEL*/

	// Check if Parameters are valid
	param1 = type(param1, true, true, true, true);
	param2 = type(param2, true, true, true, true);

	if (param1 !== param2) {
		if (JMP(label, stopval) === -1) {
			return -1;
		}
	}
}

export function BBG(param1, param2, label, stopval) {
	/*BBG <reg1>/<var1>/<const1> <reg2>/<var2>/<const2> <LABEL>
	Performs a comparison between two values, given by registers, variables or constants. 
	Any combination is permitted. If the first parameter is bigger than the second parameter, 
	jump to the address defined by the label LABEL*/

	// Check if Parameters are valid
	param1 = type(param1, true, true, true, true);
	param2 = type(param2, true, true, true, true);

	if (param1 > param2) {
		if (JMP(label, stopval) === -1) {
			return -1;
		}
	}
}

export function BSM(param1, param2, label, stopval) {
	/* BSM <reg1>/<var1>/<const1> <reg2>/<var2>/<const2> <LABEL>
	Performs a comparison between two values, given by registers, variables or constants. 
	Any combination is permitted. If the first parameter is smaller than the second parameter, 
	jump to the address defined by the label LABEL */

	// Check if Parameters are valid
	param1 = type(param1, true, true, true, true);
	param2 = type(param2, true, true, true, true);
	if (param1 < param2) {
		if (JMP(label, stopval) === -1) {
			return -1;
		}
	}
}

export function JMP(label, stopval) {
	/*JMP <LABEL>
	Jump to the address defined by the label LABEL*/

	// Find index of label
	memory.pc = memory.code.findIndex((element) => element === label + ":") + 1;
	memory.numberOfInstructions++;

	// Loop to execute the code after the label
	while (memory.numberOfInstructions < stopval) {
		if (runInstruction(memory.code[memory.pc], stopval) === -1) {
			return -1;
		}
		memory.pc++;
		memory.numberOfInstructions++;
	}
	memory.numberOfInstructions--;
}

export function SRL(register, constant) {
	/*
	SRL <reg> <const>
	This operation takes the value in reg and performs a logical shift left 
	of the number of bits defined by the constant const. 
	For instance, the value 0001 left shifted 1 time becomes 0010.*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	constant = type(constant, false, false, true, false);

	// Convert register to string
	let registerString = memory.registers[register].toString();

	// Check if all caracters in registerString are 0 or 1
	for (let i = 0; i < registerString.length; i++) {
		if (registerString[i] !== "0" && registerString[i] !== "1") {
			let error = "\n" + registerString + " is not a valid binary number.\nLine " + getIndexOfLineInCode();
			throw error
		}
	}

	// Add correct amount of 0s to the right
	for (let i = 0; i < constant; i++) {
		memory.registers[register] += "0";
	}

	// Convert the value back to a number
	memory.registers[register] = parseInt(memory.registers[register]);

}

export function SRR(register, constant) {
	/*SRR <reg> <const>
	This operation takes the value in reg and performs a logical shift right 
	of the number of bits defined by the constant const. 
	For instance, the value 1000 right shifted 1 time becomes 0100.
	*/

	// Check if Parameters are valid
	type(register, true, false, false, false);
	constant = type(constant, false, false, true, false);

	// Convert register to string
	let registerString = memory.registers[register].toString();

	// Check if all caracters in registerString are 0 or 1
	for (let i = 0; i < registerString.length; i++) {
		if (registerString[i] !== "0" && registerString[i] !== "1") {
			let error = "\n" + registerString + " is not a valid binary number.\n\nLine " + getIndexOfLineInCode();
			throw new Error(error)
		}
	}

	// Perform SRR operation
	for (let i = 0; i < constant; i++) {
		registerString = registerString.slice(0, -1);
	}

	// Convert the value back to a number
	memory.registers[register] = parseInt(registerString);
}