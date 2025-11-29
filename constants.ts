
import { Lesson, LessonCategory } from './types';

export const LESSONS: Lesson[] = [
  // --- Getting Started ---
  {
    id: 'getting_started',
    title: 'Getting Started',
    category: LessonCategory.GETTING_STARTED,
    theory: `### Digital Logic Deep Dive
Welcome to digital design! Before we build processors, we must understand the "Module".
Think of a module as a black box—a physical chip. It has pins sticking out: some are **Inputs** (signals coming in) and some are **Outputs** (signals going out).

In this first step, we just want to output a constant "High" signal (Logic 1). This is like connecting a pin directly to the positive terminal of a battery (VCC).

### Verilog Implementation
Verilog uses the concept of a module to describe hardware.
*   **\`module\`**: Starts the definition.
*   **\`endmodule\`**: Ends it.
*   **\`assign\`**: Connects a value to a wire.
*   **\`1'b1\`**: This is how we write "1 bit of value 1".

Example: \`assign my_output = 1'b1;\``,
    visualDescription: 'chip_intro',
    initialCode: `module top_module( output one );
    // Insert your code here
    
endmodule`,
    solutionPattern: 'assign\\s+one\\s*=\\s*1',
    solutionCode: `module top_module( output one );
    assign one = 1'b1;
endmodule`
  },
  {
    id: 'output_zero',
    title: 'Output Zero',
    category: LessonCategory.GETTING_STARTED,
    theory: `### Digital Logic Deep Dive
In the binary world, we have 1 (High/True) and 0 (Low/False). 
Logic 0 is electrically equivalent to "Ground" (0 Volts). 

Connecting an output to 0 is just as important as connecting it to 1. It acts as a reference point or a "Reset" state.

### Verilog Implementation
To output a zero, we assign the constant \`0\`.
*   **\`1'b0\`**: 1 bit of binary value 0.
*   Note: You can often just write \`0\` or \`1\`, but being explicit with \`1'b0\` is good practice.`,
    visualDescription: 'output_zero',
    initialCode: `module top_module( output zero );
    // Assign logic 0 to output 'zero'
    
endmodule`,
    solutionPattern: 'assign\\s+zero\\s*=\\s*0',
    solutionCode: `module top_module( output zero );
    assign zero = 1'b0;
endmodule`
  },

  // --- Verilog Language Basics ---
  {
    id: 'wire',
    title: 'Simple Wire',
    category: LessonCategory.VERILOG_LANG,
    theory: `### Digital Logic Deep Dive
A **wire** is the simplest possible component. It connects point A to point B.
If the input voltage is High, the output is High.
If the input voltage is Low, the output is Low.
It performs the identity function: $Out = In$.

### Verilog Implementation
*   **\`assign\`**: Creates a continuous electrical connection.
*   Whenever the right side changes, the left side updates immediately.`,
    visualDescription: 'wire',
    initialCode: `module top_module( input in, output out );
    // Create a wire connection
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*in',
    solutionCode: `module top_module( input in, output out );
    assign out = in;
endmodule`
  },
  {
    id: 'four_wires',
    title: 'Four Wires',
    category: LessonCategory.VERILOG_LANG,
    theory: `### Digital Logic Deep Dive
Circuits rarely have just one wire. You might have dozens connecting different parts of a chip.
Crucially, these connections happen **in parallel**. In hardware, electricity flows through all wires simultaneously. There is no "for loop" iterating through them.

If input A changes, output W changes. At the exact same time, if input B changes, output X changes.

### Verilog Implementation
You can have multiple \`assign\` statements in a module.
Order does not matter!
\`\`\`verilog
assign w = a;
assign x = b;
\`\`\`
is exactly the same as:
\`\`\`verilog
assign x = b;
assign w = a;
\`\`\`
They are just permanent connections.`,
    visualDescription: 'four_wires',
    initialCode: `module top_module( 
    input a, input b, input c, 
    output w, output x, output y, output z 
);
    // Connect inputs to outputs:
    // a -> w
    // b -> x
    // b -> y (Multicast!)
    // c -> z
    
endmodule`,
    solutionPattern: 'assign',
    solutionCode: `module top_module( 
    input a, input b, input c, 
    output w, output x, output y, output z 
);
    assign w = a;
    assign x = b;
    assign y = b;
    assign z = c;
endmodule`
  },
  {
    id: 'not_gate',
    title: 'Inverter',
    category: LessonCategory.VERILOG_LANG,
    theory: `### Digital Logic Deep Dive
The **NOT gate** (Inverter) flips the signal.
*   1 becomes 0.
*   0 becomes 1.

It is physically built using transistors to pull the output to the opposite voltage rail of the input.

### Verilog Implementation
*   **\`~\`** (tilde) is the bitwise negation operator.
*   \`assign out = ~in;\``,
    visualDescription: 'not_gate',
    initialCode: `module top_module( input in, output out );
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*~\\s*in',
    solutionCode: `module top_module( input in, output out );
    assign out = ~in;
endmodule`
  },
  {
    id: 'declaring_wires',
    title: 'Declaring Wires',
    category: LessonCategory.VERILOG_LANG,
    theory: `### Digital Logic Deep Dive
Sometimes, the input doesn't go directly to the output. It goes through several stages of logic.
To connect these stages, we need internal wires—like trace lines on a PCB that don't go to the outside world, but connect two chips together.

Example: computing $(A \land B) \lor (C \land D)$.
You might calculate $(A \land B)$ first, put it on a temporary wire, and then OR it with the rest.

### Verilog Implementation
You must declare these signals before using them (unless they are module ports).
*   **\`wire my_signal;\`** creates a named connection.
*   You can then assign to it: \`assign my_signal = a & b;\`
*   And use it later: \`assign out = my_signal | c;\``,
    visualDescription: 'internal_wires',
    initialCode: `module top_module(
    input a, input b, input c, input d,
    output out, output out_n 
);
    // 1. Calculate (a AND b) and assign to an intermediate wire
    // 2. Calculate (c AND d) and assign to another intermediate wire
    // 3. Combine them with OR for 'out'
    // 4. Invert 'out' to get 'out_n'
    
endmodule`,
    solutionPattern: 'wire',
    solutionCode: `module top_module(
    input a, input b, input c, input d,
    output out, output out_n 
);
    wire ab_comb;
    wire cd_comb;
    
    assign ab_comb = a & b;
    assign cd_comb = c & d;
    
    assign out = ab_comb | cd_comb;
    assign out_n = ~out;
endmodule`
  },

  // --- Logic Gates ---
  {
    id: 'and_gate',
    title: 'AND Gate',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **AND gate** outputs 1 only if **all** inputs are 1.
It is the logical intersection.
0 & 0 = 0
0 & 1 = 0
1 & 0 = 0
1 & 1 = 1

### Verilog Implementation
*   **\`&\`** is the bitwise AND operator.
*   \`assign out = a & b;\``,
    visualDescription: 'and_gate',
    initialCode: `module top_module( input a, input b, output out );
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*a\\s*&\\s*b',
    solutionCode: `module top_module( input a, input b, output out );
    assign out = a & b;
endmodule`
  },
  {
    id: 'nand_gate',
    title: 'NAND Gate',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **NAND gate** (Not-AND) is the exact opposite of AND.
It outputs 0 only when **all** inputs are 1.
NAND gates are "universal gates"—you can build any computer using only NAND gates!

### Verilog Implementation
*   **\`&\`** is AND.
*   **\`~\`** is NOT.
*   Combine them: \`assign out = ~(a & b);\``,
    visualDescription: 'nand_gate',
    initialCode: `module top_module( input a, input b, output out );
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*~\\s*\\(?\\s*a\\s*&\\s*b\\s*\\)?',
    solutionCode: `module top_module( input a, input b, output out );
    assign out = ~(a & b);
endmodule`
  },
  {
    id: 'or_gate',
    title: 'OR Gate',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **OR gate** outputs 1 if **at least one** input is 1.
It is the logical union.
0 | 0 = 0
0 | 1 = 1
1 | 0 = 1
1 | 1 = 1

### Verilog Implementation
*   **\`|\`** is the bitwise OR operator.
*   \`assign out = a | b;\``,
    visualDescription: 'or_gate',
    initialCode: `module top_module( input a, input b, output out );
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*a\\s*\\|\\s*b',
    solutionCode: `module top_module( input a, input b, output out );
    assign out = a | b;
endmodule`
  },
  {
    id: 'nor_gate',
    title: 'NOR Gate',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **NOR gate** is "Not OR".
It outputs 1 only if **both** inputs are 0.
If any input is 1, the output is forced to 0.

### Verilog Implementation
*   **\`|\`** is OR.
*   **\`~\`** is NOT.
*   Combine them: \`assign out = ~(a | b);\``,
    visualDescription: 'nor_gate',
    initialCode: `module top_module( input a, input b, output out );
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*~\\s*\\(\\s*a\\s*\\|\\s*b\\s*\\)',
    solutionCode: `module top_module( input a, input b, output out );
    assign out = ~(a | b);
endmodule`
  },
  {
    id: 'xor_gate',
    title: 'XOR Gate',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **XOR gate** (Exclusive-OR) checks for **difference**.
*   If inputs are different (0,1 or 1,0) -> Output 1.
*   If inputs are same (0,0 or 1,1) -> Output 0.
It is widely used in adders (calculating the sum bit) and cryptography.

### Verilog Implementation
*   **\`^\`** is the bitwise XOR operator.
*   \`assign out = a ^ b;\``,
    visualDescription: 'xor_gate',
    initialCode: `module top_module( input a, input b, output out );
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*a\\s*\\^\\s*b',
    solutionCode: `module top_module( input a, input b, output out );
    assign out = a ^ b;
endmodule`
  },
  {
    id: 'xnor_gate',
    title: 'XNOR Gate',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **XNOR gate** (Exclusive-OR) is the "Equality Detector".
*   If inputs are **same** (00 or 11) -> Output is **1**.
*   If inputs are **different** (01 or 10) -> Output is **0**.

It is the inverse of XOR (which detects differences).

### Verilog Implementation
*   **\`^\`** is XOR.
*   **\`~\`** is NOT.
*   **\`~^\`** is XNOR (bitwise).
*   Syntax: \`assign out = ~(a ^ b);\` or \`assign out = a ~^ b;\``,
    visualDescription: 'xnor_gate',
    initialCode: `module top_module( input a, input b, output out );
    // Implement XNOR (Equality)
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*~\\s*\\(?\\s*a\\s*\\^\\s*b\\s*\\)?',
    solutionCode: `module top_module( input a, input b, output out );
    assign out = ~(a ^ b);
endmodule`
  },
  {
    id: 'chip_7458',
    title: '7458 Chip',
    category: LessonCategory.GATES,
    theory: `### Digital Logic Deep Dive
The **7458** is a classic TTL chip containing two complex gates.
We will implement one half of it. The output is constructed from 4 inputs.
Logic:
1.  AND together inputs p1a and p1c.
2.  AND together inputs p1b and p1d.
3.  OR the results together.

Formula: $Y = (p1a \cdot p1c) + (p1b \cdot p1d)$

### Verilog Implementation
You can express complex logic in a single line using parentheses for clarity.
\`assign y = (a & b) | (c & d);\``,
    visualDescription: 'chip_7458',
    initialCode: `module top_module( 
    input p1a, input p1b, input p1c, input p1d,
    output p1y
);
    // Implement the logic: (p1a AND p1c) OR (p1b AND p1d)
    
endmodule`,
    solutionPattern: 'assign\\s+p1y',
    solutionCode: `module top_module( 
    input p1a, input p1b, input p1c, input p1d,
    output p1y
);
    assign p1y = (p1a & p1c) | (p1b & p1d);
endmodule`
  },

  // --- Vectors ---
  {
    id: 'vectors',
    title: 'Vectors (Buses)',
    category: LessonCategory.VECTORS,
    theory: `### Digital Logic Deep Dive
So far, we've dealt with single wires (scalar). But real computers work with numbers like 8-bit bytes or 64-bit integers.
A **Vector** is a bundle of wires, like a ribbon cable.
The "width" is how many wires are in the bundle.
We label them from Most Significant Bit (MSB) to Least Significant Bit (LSB).

### Verilog Implementation
*   **\`wire [7:0] my_bus;\`** creates an 8-bit bus.
*   Indices are \`[MSB:LSB]\`.
*   \`assign vec = 8'b10101010;\` assigns a value to the whole bundle.`,
    visualDescription: 'vector_bus',
    initialCode: `module top_module( 
    input wire [2:0] vec, 
    output wire [2:0] outv,
    output wire o2,
    output wire o1,
    output wire o0
);
    // 1. Assign the entire 3-bit vector 'vec' to 'outv'
    // 2. Break it apart: assign separate bits to o2, o1, o0
    
endmodule`,
    solutionPattern: 'assign\\s+outv\\s*=\\s*vec',
    solutionCode: `module top_module( 
    input wire [2:0] vec, 
    output wire [2:0] outv,
    output wire o2,
    output wire o1,
    output wire o0
);
    assign outv = vec;
    assign o2 = vec[2];
    assign o1 = vec[1];
    assign o0 = vec[0];
endmodule`
  },
  {
    id: 'vector_part',
    title: 'Vector Part Select',
    category: LessonCategory.VECTORS,
    theory: `### Digital Logic Deep Dive
Sometimes you want just a piece of a bus. For example, taking the lower 4 bits of a 16-bit number.
This is called "slicing".
It's like peeling a few wires off a ribbon cable to plug them somewhere else.

### Verilog Implementation
*   **\`vec[3:0]\`** selects bits 0 through 3 (4 bits total).
*   **\`vec[7:4]\`** selects the upper nibble.
*   You can assign slices to other vectors: \`assign small_vec = big_vec[3:0];\``,
    visualDescription: 'vector_select',
    initialCode: `module top_module( 
    input [15:0] in,
    output [7:0] out_hi,
    output [7:0] out_lo
);
    // Split the 16-bit input into two 8-bit bytes
    
endmodule`,
    solutionPattern: 'assign\\s+out_hi\\s*=\\s*in\\[15:8\\]',
    solutionCode: `module top_module( 
    input [15:0] in,
    output [7:0] out_hi,
    output [7:0] out_lo
);
    assign out_hi = in[15:8];
    assign out_lo = in[7:0];
endmodule`
  },
  {
    id: 'vector_concat',
    title: 'Concatenation',
    category: LessonCategory.VECTORS,
    theory: `### Digital Logic Deep Dive
We can split vectors, but we can also glue them together.
This is **Concatenation**.
It creates a wider vector from smaller parts.
Order matters! The first item becomes the MSB (Most Significant Bits).

### Verilog Implementation
*   **\`{a, b, c}\`** creates a new vector containing a, then b, then c.
*   Example: \`assign w = {a[1:0], b[2:0]};\` (2 bits + 3 bits = 5 bits).
*   Useful for swapping bytes or creating headers.`,
    visualDescription: 'vector_concat',
    initialCode: `module top_module( 
    input [4:0] a, input [4:0] b,
    output [9:0] out
);
    // Concatenate a and b to form a 10-bit output
    // 'a' should be the upper bits, 'b' the lower bits
    
endmodule`,
    solutionPattern: 'assign\\s+out\\s*=\\s*\\{\\s*a\\s*,\\s*b\\s*\\}',
    solutionCode: `module top_module( 
    input [4:0] a, input [4:0] b,
    output [9:0] out
);
    assign out = {a, b};
endmodule`
  },

  // --- Modules ---
  {
    id: 'modules_intro',
    title: 'Connecting Modules',
    category: LessonCategory.MODULES,
    theory: `### Digital Logic Deep Dive
Complex chips are built by connecting smaller modules together. This is "Hierarchy".
Imagine you have a pre-built chip called \`mod_a\`. To use it in your design, you must **instantiate** it (like creating an Object in Java/Python).
You then connect wires to its ports.

### Verilog Implementation
You can connect ports by **Position** (like function arguments in C):
\`mod_a instance_name ( wire1, wire2, wire3 );\`
The order must match the definition of \`mod_a\` exactly.`,
    visualDescription: 'module_hierarchy',
    initialCode: `module top_module( input a, input b, output out );
    // We have a hidden module defined as:
    // module mod_a ( input in1, input in2, output out );
    
    // Instantiate mod_a and connect:
    // a -> in1
    // b -> in2
    // out -> out
    
endmodule`,
    solutionPattern: 'mod_a',
    solutionCode: `module top_module( input a, input b, output out );
    mod_a instance1 ( a, b, out );
endmodule`
  },
  {
    id: 'modules_name',
    title: 'Modules by Name',
    category: LessonCategory.MODULES,
    theory: `### Digital Logic Deep Dive
Connecting by position is risky. If someone changes the module definition, your connections break!
The professional way is **Connecting by Name**.
You explicitly say which port gets which wire.

### Verilog Implementation
Syntax: \`.port_name(signal_name)\`
\`\`\`verilog
mod_a instance1 ( 
    .in1(a), 
    .in2(b), 
    .out(out) 
);
\`\`\`
The order doesn't matter anymore!`,
    visualDescription: 'module_hierarchy',
    initialCode: `module top_module( input a, input b, output out );
    // module mod_a ( output out, input in1, input in2 );
    // Note: The definition order is weird (out first). 
    // Use named connection to be safe!
    
endmodule`,
    solutionPattern: '.out\\(',
    solutionCode: `module top_module( input a, input b, output out );
    mod_a instance1 ( 
        .out(out), 
        .in1(a), 
        .in2(b) 
    );
endmodule`
  },

  // --- Procedures ---
  {
    id: 'always_comb',
    title: 'Always Blocks (Comb)',
    category: LessonCategory.PROCEDURES,
    theory: `### Digital Logic Deep Dive
Thus far, we used \`assign\` for logic.
But Verilog also has **Procedural Blocks** which look like C code (if/else).
For combinational logic (gates), we use \`always @(*)\`.
The \`*\` means "trigger whenever ANY input changes".

### Verilog Implementation
*   Inside \`always\`, use \`=\` for assignment.
*   Variables on the left must be declared as \`reg\` (even though they aren't real hardware registers here).
\`\`\`verilog
reg y;
always @(*) begin
    y = a & b;
end
\`\`\``,
    visualDescription: 'always_block',
    initialCode: `module top_module( input a, input b, output reg out );
    // Use an always block to implement AND logic
    
endmodule`,
    solutionPattern: 'always\\s*@\\(\\*\\)',
    solutionCode: `module top_module( input a, input b, output reg out );
    always @(*) begin
        out = a & b;
    end
endmodule`
  },
  {
    id: 'if_statement',
    title: 'If Statement',
    category: LessonCategory.PROCEDURES,
    theory: `### Digital Logic Deep Dive
The \`if\` statement creates a Multiplexer (Mux).
If condition is true, pass Signal A. Else, pass Signal B.
**Critical Rule**: In combinational logic, you MUST have an \`else\`. If you miss it, you create a "Latch" (unwanted memory).

### Verilog Implementation
\`\`\`verilog
always @(*) begin
    if (condition) begin
        out = a;
    end else begin
        out = b;
    end
end
\`\`\``,
    visualDescription: 'mux_2to1',
    initialCode: `module top_module( 
    input a, input b, 
    input sel_b,
    output reg out 
);
    // If sel_b is 1, output b. Otherwise output a.
    
endmodule`,
    solutionPattern: 'if\\s*\\(',
    solutionCode: `module top_module( 
    input a, input b, 
    input sel_b,
    output reg out 
);
    always @(*) begin
        if (sel_b) begin
            out = b;
        end else begin
            out = a;
        end
    end
endmodule`
  },
  {
    id: 'case_statement',
    title: 'Case Statement',
    category: LessonCategory.PROCEDURES,
    theory: `### Digital Logic Deep Dive
The \`case\` statement is better for checking one variable against many values. It creates a large Mux.

### Verilog Implementation
\`\`\`verilog
always @(*) begin
    case(sel)
        2'b00: out = a;
        2'b01: out = b;
        default: out = 0;
    endcase
end
\`\`\`
Always include \`default\` to avoid latches!`,
    visualDescription: 'mux_2to1',
    initialCode: `module top_module( 
    input [1:0] sel, 
    input [3:0] data0, input [3:0] data1,
    output reg [3:0] out 
);
    // 0 -> data0
    // 1 -> data1
    // Others -> 0
    
endmodule`,
    solutionPattern: 'case\\s*\\(',
    solutionCode: `module top_module( 
    input [1:0] sel, 
    input [3:0] data0, input [3:0] data1,
    output reg [3:0] out 
);
    always @(*) begin
        case(sel)
            2'b00: out = data0;
            2'b01: out = data1;
            default: out = 0;
        endcase
    end
endmodule`
  },

  // --- More Features ---
  {
    id: 'conditional',
    title: 'Conditional (Ternary)',
    category: LessonCategory.MORE_FEATURES,
    theory: `### Digital Logic Deep Dive
The Conditional Operator \`? :\`, known as the **Ternary Operator**, is the most concise way to make a Mux in Verilog.
It works exactly like C/Java/JS.

### Verilog Implementation
\`assign out = (condition) ? value_if_true : value_if_false;\`

You can chain them:
\`assign out = (c1) ? a : (c2) ? b : c;\``,
    visualDescription: 'mux_2to1',
    initialCode: `module top_module( 
    input [7:0] a, input [7:0] b, input [7:0] c, input [7:0] d,
    output [7:0] min 
);
    // Find the minimum of 4 numbers using ternary operators.
    // Hint: compare a&b, c&d, then the winners.
    wire [7:0] min_ab;
    wire [7:0] min_cd;
    
endmodule`,
    solutionPattern: '\\?',
    solutionCode: `module top_module( 
    input [7:0] a, input [7:0] b, input [7:0] c, input [7:0] d,
    output [7:0] min 
);
    wire [7:0] min_ab;
    wire [7:0] min_cd;
    
    assign min_ab = (a < b) ? a : b;
    assign min_cd = (c < d) ? c : d;
    assign min = (min_ab < min_cd) ? min_ab : min_cd;
endmodule`
  },
  {
    id: 'reduction',
    title: 'Reduction Operators',
    category: LessonCategory.MORE_FEATURES,
    theory: `### Digital Logic Deep Dive
Sometimes you need to AND all bits in a wide vector together (e.g., checking if *all* bits are 1).
Instead of \`in[0] & in[1] & in[2]...\`, use **Reduction**.

### Verilog Implementation
*   **\`&in\`**: AND all bits (Returns 1 bit).
*   **\`|in\`**: OR all bits.
*   **\`^in\`**: XOR all bits (Parity Check).`,
    visualDescription: 'reduction_gate',
    initialCode: `module top_module( 
    input [7:0] in,
    output parity
);
    // Calculate parity (XOR of all bits)
    
endmodule`,
    solutionPattern: 'assign\\s+parity\\s*=\\s*\\^\\s*in',
    solutionCode: `module top_module( 
    input [7:0] in,
    output parity
);
    assign parity = ^in;
endmodule`
  },

  // --- Sequential ---
  {
    id: 'dff',
    title: 'D Flip-Flop',
    category: LessonCategory.SEQUENTIAL,
    theory: `### Digital Logic Deep Dive
The **D Flip-Flop** is the atom of memory.
It captures the input **D** exactly when the **Clock** rises (Positive Edge) and holds it at **Q**.
Changes to D are ignored when the clock is not rising.

### Verilog Implementation
*   **\`always @(posedge clk)\`**: Trigger on rising edge.
*   **\`<=\`**: Non-blocking assignment (standard for sequential logic).`,
    visualDescription: 'dff',
    initialCode: `module top_module( input clk, input d, output reg q );
    
endmodule`,
    solutionPattern: '<=',
    solutionCode: `module top_module( input clk, input d, output reg q );
    always @(posedge clk) begin
        q <= d;
    end
endmodule`
  }
];