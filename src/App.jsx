import { useState } from "react";

const InstructionTypes = {
  "Arithmetic and Logic Instructions": {
    ADD: "0010",
    SUB: "0110",
    AND: "0000",
    OR: "0001",
    NOT: "0011",
  },
  "Data Transfer Instructions": {
    LOAD: "1000",
    STORE: "1010",
    LDI: "0111",
  },
  "Control Transfer Instructions": {
    JMP: "1111",
    BNE: "1110",
  },
};

const Registers = {
  R0: "00000",
  R1: "00001",
  R2: "00010",
  R3: "00011",
  R4: "00100",
  R5: "00101",
  R6: "00110",
  R7: "00111",
  R8: "01000",
  R9: "01001",
  R10: "01010",
  R11: "01011",
  R12: "01100",
  R13: "01101",
  R14: "01110",
  R15: "01111",
  R16: "10000",
  R17: "10001",
  R18: "10010",
  R19: "10011",
  R20: "10100",
  R21: "10101",
  R22: "10110",
  R23: "10111",
  R24: "11000",
  R25: "11001",
  R26: "11010",
  R27: "11011",
  R28: "11100",
  R29: "11101",
  R30: "11110",
  R31: "11111",
};

const App = () => {
  const [selectedType, setSelectedType] = useState(
    Object.keys(InstructionTypes)[0]
  );
  const [selectedInstruction, setSelectedInstruction] = useState(
    Object.keys(InstructionTypes[selectedType])[0]
  );
  const [register1, setRegister1] = useState("R0");
  const [register2, setRegister2] = useState("R0");
  const [memoryAddress, setMemoryAddress] = useState("0000"); // Initial memory address

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
    setSelectedInstruction(
      Object.keys(InstructionTypes[event.target.value])[0]
    );
  };

  const handleInstructionChange = (event) => {
    setSelectedInstruction(event.target.value);
  };

  const handleRegister1Change = (event) => {
    setRegister1(event.target.value);
  };

  const handleRegister2Change = (event) => {
    setRegister2(event.target.value);
  };

  const handleMemoryAddressChange = (event) => {
    const newMemoryAddress = event.target.value;
    setMemoryAddress(newMemoryAddress);
  };

  const binaryToHex = (binaryString) => {
    const decimalValue = parseInt(binaryString, 2);
    const hexValue = decimalValue.toString(16).toUpperCase();
    return hexValue.padStart(Math.ceil(binaryString.length / 4), '0');
  }

  const generateBinaryString = () => {
    const opcode = InstructionTypes[selectedType][selectedInstruction];
    let binaryString = opcode;
    console.log(binaryString);
    console.log(Registers[register1]);

    if (selectedType === "Arithmetic and Logic Instructions") {
      binaryString += Registers[register1]; // R1 (5 bits)
      binaryString += Registers[register2]; // R2 (5 bits)
      binaryString += Registers[register1]; // R1 (5 bits)
      binaryString += "0000000000000"; // Zeroes 
      binaryString = binaryToHex(binaryString);
    } else if (selectedType === "Data Transfer Instructions") {
      binaryString += Registers[register1]; // R1 (5 bits)
      binaryString += "0000000"; // Zeroes for R2
      binaryString = binaryToHex(binaryString);
      binaryString += memoryAddress; // Hex memory address (leftmost bits)
    } else if (selectedType === "Control Transfer Instructions") {
      if (selectedInstruction === "JMP") {
        binaryString += "000000000000"; // Zeroes 
        binaryString = binaryToHex(binaryString);
        binaryString += memoryAddress; // Hex memory address (leftmost bits)
      } else if (selectedInstruction === "BNE") {
        binaryString += Registers[register1]; // R1 (5 bits)
        binaryString += Registers[register2]; // R2 (5 bits)
        binaryString += "00"; // Zeroes 
        binaryString = binaryToHex(binaryString);
        binaryString += memoryAddress; // Hex memory address (leftmost bits)
      }
    }

    return binaryString;
  };

  return (
    <div >
      <h1 className="text-center mt-5">Instruction Generator for 32-Bit RISC Processor</h1>
      <hr />
      <div className="mt-5 px-5">
        <label>Instruction Type:</label>
        <select className="mx-3" value={selectedType} onChange={handleTypeChange}>
          {Object.keys(InstructionTypes).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mt-3 px-5">
        <label>Instruction:</label>
        <select className="mx-5" value={selectedInstruction} onChange={handleInstructionChange}>
          {Object.keys(InstructionTypes[selectedType]).map((instruction) => (
            <option key={instruction} value={instruction}>
              {instruction}
            </option>
          ))}
        </select>
      </div>
      {selectedType === "Arithmetic and Logic Instructions" && (
        <div className="mt-3 px-5">
          <label>Register 1:</label>
          <select className="mx-2" value={register1} onChange={handleRegister1Change}>
            {Object.keys(Registers).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label className="mx-3">Register 2:</label>
          <select value={register2} onChange={handleRegister2Change}>
            {Object.keys(Registers).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedType === "Data Transfer Instructions" && (
        <div className="mt-3 px-5">
          <label>Register:</label>
          <select className="mx-3" value={register1} onChange={handleRegister1Change}>
            {Object.keys(Registers).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <label>Memory Address:</label>
          <input
            className="mx-3"
            type="text"
            value={memoryAddress}
            onChange={handleMemoryAddressChange}
          />
        </div>
      )}
      {selectedType === "Control Transfer Instructions" && (
        <div className="mt-3 px-5">
          {selectedInstruction === "JMP" && (
            <div>
              <label>Memory Address:</label>
              <input
                className="mx-2"
                type="text"
                value={memoryAddress}
                onChange={handleMemoryAddressChange}
              />
            </div>
          )}
          {selectedInstruction === "BNE" && (
            <div>
              <label>Register 1:</label>
              <select className="mx-3" value={register1} onChange={handleRegister1Change}>
                {Object.keys(Registers).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label>Register 2:</label>
              <select className="mx-3" value={register2} onChange={handleRegister2Change}>
                {Object.keys(Registers).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <label>Memory Address:</label>
              <input
                className="mx-3"
                type="text"
                value={memoryAddress}
                onChange={handleMemoryAddressChange}
              />
            </div>
          )}
        </div>
      )}
      <div className="text-center mt-5">
        <label>Generated Hex Instruction:</label>
        <div>{generateBinaryString()}</div>
      </div>
    </div>
  );
};

export default App;
