#include "pch.h"
#include "dll_test.h"

int Add(int a, int b) {
	return a + b;
};

int Sub(int a, int b) {
	return a - b;
};

int DllClass::Times(int a, int b) {
	return a * b;
};
int DllClass::Divide(int a, int b) {
	return a / b;
};
// C 风格的包装函数
extern "C" {
    void* CreateDllClass() {
        return new DllClass();
    }
    
    void DestroyDllClass(void* instance) {
        delete static_cast<DllClass*>(instance);
    }
    
    int Times(void* instance, int a, int b) {
        DllClass* obj = static_cast<DllClass*>(instance);
        return obj->Times(a, b);
    }
    
    DivideResult Divide(void* instance, int a, int b) {
        DivideResult result = { 0, false, "" };
        try {
            DllClass* obj = static_cast<DllClass*>(instance);
            if (b == 0) {
                throw std::invalid_argument("Division by zero");
            }
            result.value = obj->Divide(a, b);
        }
        catch (const std::exception& e) {
            result.hasError = true;
            strncpy_s(result.errorMessage, sizeof(result.errorMessage), e.what(), _TRUNCATE);
        };
        return result;
    }
    void MessageBoxTest(HWND hwnd) {
        MessageBox(hwnd, TEXT("HELLO"), TEXT("In a DLL"), MB_OK);
    }
}
