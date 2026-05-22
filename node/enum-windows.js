const koffi = require("koffi");

const user32 = koffi.load("user32.dll");

const HANDLE = koffi.pointer("HANDLE", koffi.opaque());
const HWND = koffi.alias("HWND", HANDLE);

const EnumWindowsProc = koffi.proto(
  "bool __stdcall EnumWindowsProc(HWND hwnd, long lParam)"
);

const EnumWindows = user32.func("__stdcall", "EnumWindows", "bool", [
  koffi.pointer(EnumWindowsProc),
  "int",
]);

let cb = koffi.register((hwnd, lParam) => {
  console.log({hwnd, lParam})
  return true
}, koffi.pointer(EnumWindowsProc))

EnumWindows(cb, 0)

koffi.unregister(cb)

console.log(EnumWindowsProc, typeof EnumWindowsProc)
