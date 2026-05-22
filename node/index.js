const koffi = require("koffi");
const path = require("path");

const dllPath = path.join(__dirname, "../x64/Debug", "dll-test.dll");
const lib = koffi.load(dllPath);

const DivideResult = koffi.struct("DivideResult", {
  value: "int",
  hasError: "bool",
  errMessage: "char[256]",
});

// const add = lib.func('Add', 'int', ['int', 'int'])
// const add = lib.func('int Add(int a, int b)')
// const sub = lib.func('int Sub(int a, int b)')
const createDllInstance = lib.func("CreateDllClass", "void*", []);
const destoryIns = lib.func("DestroyDllClass", "void", ["void*"]);
const times = lib.func("Times", "int", ["void*", "int", "int"]);
const divide = lib.func("Divide", DivideResult, ["void*", "int", "int"]);

const dllInstance = createDllInstance();

const showMessageBox = lib.func("void MessageBoxTest(void*)");

const hwndBuffer = Buffer.from(new Uint8Array([174, 12, 8, 0, 0, 0, 0, 0]));
showMessageBox(hwndBuffer);

// const divide = lib.func('int DllClass::Divide(int a, int b)')

// console.log(add(1, 2))
// console.log(sub(1, 2))

console.log(times(dllInstance, 1, 2));
try {
  console.log(divide(dllInstance, 4, 2));
} catch (err) {
  console.error(err);
}
destoryIns(dllInstance);
// console.log(divide(1, 2))

// Load the shared library
// const lib = koffi.load('user32.dll');

// // Declare constants
// const MB_OK = 0x0;
// const MB_YESNO = 0x4;
// const MB_ICONQUESTION = 0x20;
// const MB_ICONINFORMATION = 0x40;
// const IDOK = 1;
// const IDYES = 6;
// const IDNO = 7;

// // Find functions
// const MessageBoxA = lib.func('__stdcall', 'MessageBoxA', 'int', ['void *', 'str', 'str', 'uint']);
// const MessageBoxW = lib.func('__stdcall', 'MessageBoxW', 'int', ['void *', 'str16', 'str16', 'uint']);

// let ret = MessageBoxA(null, 'Do you want another message box?', 'Koffi', MB_YESNO | MB_ICONQUESTION);

// if (ret == IDYES)
//     MessageBoxW(null, 'Hello World!', 'Koffi', MB_ICONINFORMATION);
